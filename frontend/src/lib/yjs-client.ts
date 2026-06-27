"use client";
import { useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";

/**
 * Local-first Yjs document hook.
 *
 * Architecture:
 *  - The Yjs doc is the *single source of truth* on the client.
 *  - IndexeddbPersistence syncs the doc to IndexedDB on every update so the
 *    user can refresh / go offline and resume seamlessly.
 *  - We DO NOT block typing on the network. A separate background sync loop
 *    (see useSyncEngine) pushes encoded updates to the server when online.
 *  - When the server returns a remote diff, we apply it locally; CRDT merge
 *    guarantees no offline edit is overwritten.
 */
export function useYDoc(documentId: string) {
  const docRef = useRef<Y.Doc | null>(null);
  const persistenceRef = useRef<IndexeddbPersistence | null>(null);
  const [ready, setReady] = useState(false);

  if (!docRef.current) {
    docRef.current = new Y.Doc();
  }

  useEffect(() => {
    if (!documentId || typeof window === "undefined") return;
    const doc = docRef.current!;
    const persistence = new IndexeddbPersistence(`docedit:${documentId}`, doc);
    persistenceRef.current = persistence;
    persistence.once("synced", () => setReady(true));
    // Fallback in case IDB never resolves (private browsing)
    const t = setTimeout(() => setReady(true), 400);
    return () => {
      clearTimeout(t);
      persistence.destroy();
      persistenceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId]);

  return { doc: docRef.current, ready };
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
