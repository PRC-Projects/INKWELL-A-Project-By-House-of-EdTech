/**
 * Awareness probe — spawns two HocuspocusProvider clients against a real
 * Hocuspocus server (default ws://127.0.0.1:1234) and reports the live
 * awareness state observed by each peer.
 *
 * Used by /app/backend/tests/test_awareness_sync.py to lock in the Yjs
 * collaboration fixes. Speaks JSON over stdout so pytest can assert on
 * machine-readable results.
 *
 * Usage:
 *   node awareness_probe.cjs <mode> [args...]
 *
 * Modes:
 *   join       <docId> <peerCount>           — N peers join the same doc,
 *                                              wait 1.5s, each prints how
 *                                              many OTHER peers they see.
 *   prune      <docId> <closeAfterMs>        — 2 peers join, peer B leaves
 *                                              after closeAfterMs, peer A
 *                                              reports time-to-drop.
 *   handshake  <docId>                       — single peer; verifies the
 *                                              sync handshake completes
 *                                              (connect + synced events).
 */
"use strict";

const { HocuspocusProvider } = require("@hocuspocus/provider");
const Y = require("yjs");
const WebSocket = require("ws");
global.WebSocket = WebSocket;

const HOCUS_URL = process.env.HOCUS_URL || "ws://127.0.0.1:1234";

function makeProvider(docId, name, color) {
  const doc = new Y.Doc();
  const provider = new HocuspocusProvider({
    url: HOCUS_URL,
    name: docId,
    document: doc,
    WebSocketPolyfill: WebSocket,
  });
  provider.setAwarenessField("user", {
    id: name,
    name,
    color,
  });
  return { doc, provider };
}

function waitFor(predicate, timeoutMs = 5000, pollMs = 50) {
  return new Promise((resolve, reject) => {
    const t0 = Date.now();
    const iv = setInterval(() => {
      try {
        const v = predicate();
        if (v) { clearInterval(iv); resolve(Date.now() - t0); }
        else if (Date.now() - t0 > timeoutMs) {
          clearInterval(iv);
          reject(new Error(`timeout after ${timeoutMs}ms`));
        }
      } catch (e) { clearInterval(iv); reject(e); }
    }, pollMs);
  });
}

function peerCount(provider) {
  // Number of OTHER awareness clientIDs (matches the UI presence-count
  // formula: presence.length + self).
  const aw = provider.awareness;
  if (!aw) return 0;
  const self = aw.clientID;
  let n = 0;
  aw.getStates().forEach((state, cid) => {
    if (cid === self) return;
    if (state?.user) n++;
  });
  return n;
}

async function modeJoin(docId, peerCountStr) {
  const N = parseInt(peerCountStr, 10);
  const peers = [];
  for (let i = 0; i < N; i++) {
    peers.push(makeProvider(docId, `peer${i}`, `hsl(${i * 60} 70% 50%)`));
  }
  // Wait for every peer to see (N-1) other peers.
  const expected = N - 1;
  try {
    await waitFor(() => peers.every((p) => peerCount(p.provider) === expected), 5000);
  } catch (e) {
    // proceed — we'll report whatever each peer saw
  }
  const observed = peers.map((p) => peerCount(p.provider));
  console.log(JSON.stringify({
    mode: "join",
    docId,
    peerCount: N,
    expectedOthers: expected,
    observed,
    pass: observed.every((n) => n === expected),
  }));
  for (const p of peers) p.provider.destroy();
  process.exit(0);
}

async function modePrune(docId, closeAfterMs) {
  const delay = parseInt(closeAfterMs, 10);
  const a = makeProvider(docId, "peerA", "red");
  const b = makeProvider(docId, "peerB", "blue");
  // Wait until both see each other.
  await waitFor(() => peerCount(a.provider) === 1 && peerCount(b.provider) === 1, 5000);
  // Give it a brief settle window.
  await new Promise((r) => setTimeout(r, 200));
  if (delay > 0) await new Promise((r) => setTimeout(r, delay));
  // Tear down B as ungracefully as we can while still emulating a tab close —
  // destroy the provider which closes the WS.
  const closedAt = Date.now();
  b.provider.destroy();
  let pruneMs = null;
  try {
    pruneMs = await waitFor(() => peerCount(a.provider) === 0, 10000, 25);
  } catch (e) {
    pruneMs = null;
  }
  console.log(JSON.stringify({
    mode: "prune",
    docId,
    closedAt,
    pruneMs,
    pass: pruneMs !== null && pruneMs < 3000,
    threshold_ms: 3000,
  }));
  a.provider.destroy();
  process.exit(0);
}

async function modeHandshake(docId) {
  const { doc, provider } = makeProvider(docId, "handshake", "green");
  let connected = false;
  let synced = false;
  provider.on("connect", () => { connected = true; });
  provider.on("synced", () => { synced = true; });
  let elapsed = null;
  try {
    elapsed = await waitFor(() => connected && synced, 5000);
  } catch (e) {
    /* fall through */
  }
  console.log(JSON.stringify({
    mode: "handshake",
    docId,
    connected,
    synced,
    handshakeMs: elapsed,
    pass: connected && synced,
  }));
  provider.destroy();
  process.exit(0);
}

const [, , mode, ...args] = process.argv;

(async () => {
  try {
    if (mode === "join") await modeJoin(args[0], args[1]);
    else if (mode === "prune") await modePrune(args[0], args[1] || "0");
    else if (mode === "handshake") await modeHandshake(args[0]);
    else {
      console.error("unknown mode", mode);
      process.exit(2);
    }
  } catch (e) {
    console.log(JSON.stringify({ mode, error: String(e?.message || e), pass: false }));
    process.exit(1);
  }
})();
