/**
 * Server-side Yjs helpers. We use plain Yjs (no provider) to merge incoming
 * client updates against the authoritative document state stored in Postgres.
 *
 * Race-condition strategy:
 *   1. Each client tags every update with (clientId, clock). The `Update`
 *      table has a UNIQUE constraint on (documentId, clientId, clock) so the
 *      same update can never be applied twice — Postgres rejects duplicates.
 *   2. The merge transaction reads the current Document.yjsState with FOR
 *      UPDATE-style isolation (`SERIALIZABLE`), applies all new updates, and
 *      writes back. CRDT properties guarantee commutativity, so the order in
 *      which concurrent transactions land does not change the final state.
 *   3. We never overwrite — we always merge: even if Client B's transaction
 *      committed first, Client A's updates are applied on top of B's result.
 */
import * as Y from "yjs";

export function base64ToBytes(b64: string): Uint8Array {
  return new Uint8Array(Buffer.from(b64, "base64"));
}
export function bytesToBase64(arr: Uint8Array | Buffer): string {
  return Buffer.from(arr).toString("base64");
}

/** Applies a batch of base64 updates to a Yjs doc and returns the new state. */
export function applyUpdates(
  currentState: Uint8Array,
  updatesB64: string[],
): { state: Uint8Array; doc: Y.Doc } {
  const doc = new Y.Doc();
  if (currentState && currentState.length > 0) {
    Y.applyUpdate(doc, currentState);
  }
  for (const upd of updatesB64) {
    Y.applyUpdate(doc, base64ToBytes(upd));
  }
  const state = Y.encodeStateAsUpdate(doc);
  return { state, doc };
}

/** Returns the diff the client needs to catch up to the server. */
export function diffForClient(
  serverState: Uint8Array,
  clientStateVectorB64?: string,
): Uint8Array {
  const doc = new Y.Doc();
  if (serverState && serverState.length > 0) {
    Y.applyUpdate(doc, serverState);
  }
  const sv = clientStateVectorB64 ? base64ToBytes(clientStateVectorB64) : undefined;
  return Y.encodeStateAsUpdate(doc, sv);
}

export function plainTextFromState(state: Uint8Array): string {
  const doc = new Y.Doc();
  if (state && state.length > 0) Y.applyUpdate(doc, state);
  return doc.getText("content").toString();
}
