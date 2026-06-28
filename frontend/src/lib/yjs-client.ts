"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { useSession } from "next-auth/react";

/**
 * Local-first Yjs document hook + Hocuspocus presence layer.
 *
 * Architecture:
 *  - The Y.Doc is the single source of truth on the client.
 *  - IndexedDB persists every edit immediately — typing never blocks on
 *    the network.
 *  - The HTTP sync engine (see useSyncEngine) is the AUTHORITATIVE persistence
 *    path. Race-condition handling lives there (SERIALIZABLE tx +
 *    (clientId, clock) idempotency).
 *  - Hocuspocus is layered ON TOP of the SAME Y.Doc for awareness (cursors,
 *    presence labels) and low-latency relay between connected clients.
 *    Because it writes into the same Y.Doc via Y.applyUpdate which is
 *    idempotent on op-IDs, it cannot race with the HTTP path — duplicate
 *    application of the same update is a no-op.
 */

export interface PresenceUser {
  id: string;
  name: string;
  color: string;
  caret?: number | null;
}

function colorFromId(id: string): string {
  // Deterministic HSL palette from user id.
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
  return `hsl(${h} 70% 45%)`;
}

// Module-level cache so every component sharing the same documentId gets the
// SAME Y.Doc instance. Without this, the page and the Editor each create
// their own doc, IndexedDB+HTTP+Hocuspocus would race and converge slowly.
const _docCache = new Map<string, Y.Doc>();

export function useYDoc(documentId: string) {
  const persistenceRef = useRef<IndexeddbPersistence | null>(null);
  const providerRef = useRef<HocuspocusProvider | null>(null);
  const [ready, setReady] = useState(false);
  const [presence, setPresence] = useState<PresenceUser[]>([]);
  const [wsConnected, setWsConnected] = useState(false);
  // Provider must be in React state so consumers (the Tiptap editor) re-render
  // and mount the CollaborationCursor extension once the WS provider exists.
  // Without this, the editor reads `doc._hp` at first render — which is null —
  // and CollaborationCursor never broadcasts/receives awareness frames.
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);
  const { data: session } = useSession();

  const doc = useMemo(() => {
    if (!documentId) return null;
    let d = _docCache.get(documentId);
    if (!d) {
      d = new Y.Doc();
      _docCache.set(documentId, d);
    }
    return d;
  }, [documentId]);

  // IndexedDB persistence — only the first call for a given doc actually
  // attaches; subsequent callers piggy-back on the same Y.Doc.
  const idbAttached = useRef(false);
  useEffect(() => {
    if (!documentId || typeof window === "undefined" || !doc) return;
    if (idbAttached.current) { setReady(true); return; }
    idbAttached.current = true;
    const persistence = new IndexeddbPersistence(`docedit:${documentId}`, doc);
    persistenceRef.current = persistence;
    persistence.once("synced", () => setReady(true));
    const t = setTimeout(() => setReady(true), 400);
    return () => {
      clearTimeout(t);
      persistence.destroy();
      persistenceRef.current = null;
      idbAttached.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId, doc]);

  // Hocuspocus provider — awareness + live relay on the SAME Y.Doc
  useEffect(() => {
    if (!documentId || typeof window === "undefined" || !doc) return;
    if (!session?.user) return;
    // One provider per doc — but the hook may be invoked from multiple
    // components for the same doc. Use the cache to enforce singleton.
    let provider = (doc as unknown as { _hp?: HocuspocusProvider })._hp;
    const wsProto = window.location.protocol === "https:" ? "wss:" : "ws:";
    const url = `${wsProto}//${window.location.host}/api/hocus`;
    const u = session.user as { id?: string; name?: string | null; email?: string | null };
    const uid = u.id || u.email || "anon";
    if (!provider) {
      provider = new HocuspocusProvider({
        url,
        name: documentId,
        document: doc,
      });
      (doc as unknown as { _hp?: HocuspocusProvider })._hp = provider;
    }
    // Expose the provider to React so Tiptap's CollaborationCursor extension
    // can mount with a real provider (it falls back to null on the initial
    // render before the effect attaches `_hp`).
    setProvider(provider);
    // Each useYDoc caller wires its own listeners so every consumer of
    // wsConnected/presence gets updates, not just the one that created
    // the provider.
    const handleConnect = () => setWsConnected(true);
    const handleDisconnect = () => setWsConnected(false);
    provider.on("connect", handleConnect);
    provider.on("disconnect", handleDisconnect);
    provider.on("close", handleDisconnect);
    // Some Hocuspocus versions also expose a `synced` event that fires after
    // initial sync — treat it as a positive connection signal as a fallback.
    provider.on("synced", handleConnect);
    // If we attached after the connect event already fired, fall back to a
    // short timer that polls the public status getter.
    const t = setInterval(() => {
      const s = (provider as unknown as { status?: string; isConnected?: boolean }).status;
      const isConnected = (provider as unknown as { isConnected?: boolean }).isConnected;
      if (s === "connected" || isConnected === true) {
        setWsConnected(true);
        clearInterval(t);
      }
    }, 500);
    setTimeout(() => clearInterval(t), 10_000);
    provider.setAwarenessField("user", {
      id: uid,
      name: u.name || u.email || "Anonymous",
      color: colorFromId(uid),
    });

    const onAware = () => {
      // Iterate awareness states keyed by clientID — each connected tab is one
      // clientID. We exclude OUR clientID and dedupe by remote clientID, so the
      // "live" count reflects actual connected peers.
      const aw = provider.awareness;
      if (!aw) { setPresence([]); return; }
      const selfClientId = aw.clientID;
      const out: PresenceUser[] = [];
      aw.getStates().forEach((state, clientId) => {
        if (clientId === selfClientId) return;
        const s = state as { user?: { id: string; name: string; color: string }; caret?: number | null };
        // CollaborationCursor uses `user`; we also fall back to `cursor` legacy.
        const userField = s.user;
        if (!userField) return;
        out.push({
          id: userField.id || String(clientId),
          name: userField.name,
          color: userField.color,
          caret: s.caret ?? null,
        });
      });
      setPresence(out);
    };
    provider.awareness?.on("change", onAware);
    provider.awareness?.on("update", onAware);
    // Also subscribe to provider-level events that fire on remote awareness frames.
    provider.on("awarenessChange", onAware);
    provider.on("awarenessUpdate", onAware);
    onAware();

    providerRef.current = provider;
    return () => {
      provider.awareness?.off("change", onAware);
      provider.awareness?.off("update", onAware);
      provider.off("awarenessChange", onAware);
      provider.off("awarenessUpdate", onAware);
      provider.off("connect", handleConnect);
      provider.off("disconnect", handleDisconnect);
      provider.off("close", handleDisconnect);
      provider.off("synced", handleConnect);
      clearInterval(t);
      providerRef.current = null;
    };
  }, [documentId, doc, session?.user]);

  const setCaret = useMemo(
    () => (caret: number | null) => {
      const p = providerRef.current || (doc as unknown as { _hp?: HocuspocusProvider } | null)?._hp;
      p?.setAwarenessField("caret", caret);
    },
    [doc],
  );

  return { doc, ready, presence, wsConnected, setCaret, provider };
}

export function bytesToBase64(buf: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < buf.length; i++) binary += String.fromCharCode(buf[i]);
  return btoa(binary);
}
export function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
