"use client";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type * as Y from "yjs";
import {
  ackUpdates,
  bumpClock,
  enqueueUpdate,
  hydrateClock,
  setError,
  setOnline,
  setStatus,
  type PendingUpdate,
} from "@/store/slices/syncSlice";
import type { RootState } from "@/store/store";
import { base64ToBytes, bytesToBase64 } from "@/lib/yjs-client";
import * as YLib from "yjs";

/**
 * The sync engine — wires Yjs to Redux to the network.
 *
 * - Captures every local Yjs update and pushes it onto the Redux queue.
 *   The UI never blocks on the network; typing latency is independent of
 *   network state.
 * - When online, drains the queue: groups all pending updates into one
 *   request, sends to /api/.../sync. Server applies them and returns the
 *   merged remote diff which we apply to the Yjs doc.
 * - On ack failure, the updates stay in the queue and will retry next tick.
 *   Because the server's persisted dedup key is (clientId, clock), retries
 *   are safe — duplicates are skipped.
 */
const TICK_MS = 1500;

function getClientId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = localStorage.getItem("docedit:clientId");
  if (!id) {
    id = `c_${crypto.randomUUID()}`;
    localStorage.setItem("docedit:clientId", id);
  }
  return id;
}
function loadClock(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem("docedit:clock") || "0", 10) || 0;
}
function saveClock(c: number) {
  if (typeof window !== "undefined") localStorage.setItem("docedit:clock", String(c));
}

export function useSyncEngine(documentId: string, doc: Y.Doc | null, canWrite: boolean) {
  const dispatch = useDispatch();
  const queue = useSelector((s: RootState) => s.sync.queue);
  const isOnline = useSelector((s: RootState) => s.sync.isOnline);
  const clock = useSelector((s: RootState) => s.sync.clock);
  const clientId = useRef<string>(getClientId());
  const queueRef = useRef(queue);
  const clockRef = useRef(clock);
  queueRef.current = queue;
  clockRef.current = clock;

  // Online / offline events
  useEffect(() => {
    const on = () => dispatch(setOnline(true));
    const off = () => dispatch(setOnline(false));
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    dispatch(setOnline(navigator.onLine));
    dispatch(hydrateClock(loadClock()));
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, [dispatch]);

  // Capture local Yjs updates → queue
  useEffect(() => {
    if (!doc || !canWrite) return;
    const handler = (update: Uint8Array, origin: unknown) => {
      // Updates originating from remote sync must NOT be re-queued.
      if (origin === "remote") return;
      const id = crypto.randomUUID();
      const next = clockRef.current + 1;
      const pending: PendingUpdate = {
        id,
        clientId: clientId.current,
        clock: next,
        documentId,
        update: bytesToBase64(update),
        enqueuedAt: Date.now(),
      };
      saveClock(next);
      dispatch(bumpClock());
      dispatch(enqueueUpdate(pending));
    };
    doc.on("update", handler);
    return () => { doc.off("update", handler); };
  }, [doc, documentId, dispatch, canWrite]);

  // Pull initial server state on mount (catch up offline edits made by others)
  useEffect(() => {
    if (!doc || !documentId) return;
    let cancelled = false;
    (async () => {
      try {
        const sv = bytesToBase64(YLib.encodeStateVector(doc));
        const r = await fetch(`/api/documents/${documentId}/sync?sv=${encodeURIComponent(sv)}`, { cache: "no-store" });
        if (!r.ok) return;
        const data = await r.json();
        if (cancelled) return;
        if (data?.serverUpdate) {
          const bytes = base64ToBytes(data.serverUpdate);
          if (bytes.length > 0) YLib.applyUpdate(doc, bytes, "remote");
        }
      } catch { /* offline, ignore */ }
    })();
    return () => { cancelled = true; };
  }, [doc, documentId]);

  // Drain loop
  useEffect(() => {
    if (!doc) return;
    let stopped = false;
    const tick = async () => {
      if (stopped) return;
      const q = queueRef.current.filter((u) => u.documentId === documentId);
      if (!isOnline || q.length === 0) {
        dispatch(setStatus(isOnline ? "online" : "offline"));
        return;
      }
      dispatch(setStatus("syncing"));
      const sv = bytesToBase64(YLib.encodeStateVector(doc));
      try {
        const r = await fetch(`/api/documents/${documentId}/sync`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            updates: q.map((u) => ({ clientId: u.clientId, clock: u.clock, update: u.update })),
            stateVector: sv,
          }),
        });
        if (r.status === 403) {
          dispatch(setError("Viewers cannot push state updates"));
          return;
        }
        if (!r.ok) throw new Error(`status ${r.status}`);
        const data = await r.json();
        dispatch(ackUpdates(q.map((u) => u.id)));
        if (data?.serverUpdate) {
          const bytes = base64ToBytes(data.serverUpdate);
          if (bytes.length > 0) YLib.applyUpdate(doc, bytes, "remote");
        }
        dispatch(setStatus("online"));
      } catch (e) {
        dispatch(setError(String((e as Error).message || e)));
      }
    };
    const i = setInterval(tick, TICK_MS);
    // also tick immediately on online change
    tick();
    return () => { stopped = true; clearInterval(i); };
  }, [isOnline, doc, documentId, dispatch]);
}
