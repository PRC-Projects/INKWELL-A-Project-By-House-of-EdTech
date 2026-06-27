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
        onConnect: () => setWsConnected(true),
        onDisconnect: () => setWsConnected(false),
        onClose: () => setWsConnected(false),
      });
      (doc as unknown as { _hp?: HocuspocusProvider })._hp = provider;
    }
    provider.setAwarenessField("user", {
      id: uid,
      name: u.name || u.email || "Anonymous",
      color: colorFromId(uid),
    });

    const onAware = () => {
      const states = Array.from(provider.awareness?.getStates().values() ?? []) as Array<{
        user?: PresenceUser; caret?: number | null;
      }>;
      const out: PresenceUser[] = [];
      const seen = new Set<string>();
      for (const s of states) {
        if (!s.user || seen.has(s.user.id)) continue;
        seen.add(s.user.id);
        out.push({ ...s.user, caret: s.caret ?? null });
      }
      // Exclude self
      setPresence(out.filter((p) => p.id !== uid));
    };
    provider.awareness?.on("change", onAware);
    onAware();

    providerRef.current = provider;
    return () => {
      provider.awareness?.off("change", onAware);
      provider.destroy();
      providerRef.current = null;
      setWsConnected(false);
      setPresence([]);
    };
  }, [documentId, session?.user]);

  const setCaret = useMemo(
    () => (caret: number | null) => {
      providerRef.current?.setAwarenessField("caret", caret);
    },
    [],
  );

  return { doc: docRef.current, ready, presence, wsConnected, setCaret };
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
