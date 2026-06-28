/**
 * Hocuspocus server — awareness + ephemeral collaboration layer.
 *
 * Architecture:
 *   - Listens on port 1234. The FastAPI sidecar proxies /api/hocus/* WebSocket
 *     upgrades to here so the K8s ingress can route it through the standard
 *     /api prefix.
 *   - We DO NOT persist Y.Doc updates here. The HTTP /api/documents/[id]/sync
 *     route (Next.js → Postgres SERIALIZABLE) remains the single source of
 *     truth. Hocuspocus holds the Y.Doc in memory only to:
 *       1. broadcast awareness state (cursor positions, user labels) to
 *          everyone viewing the same document
 *       2. relay low-latency Y.Doc updates between connected clients during
 *          the typing burst (the HTTP sync still runs every 1.5s and acks
 *          authoritatively)
 *   - Because both relays write into the SAME Y.Doc through CRDT-safe
 *     `Y.applyUpdate`, race conditions are impossible — the same update
 *     applied twice is a no-op (Y.applyUpdate is idempotent on operation IDs).
 */
const { Server } = require("@hocuspocus/server");

const PORT = parseInt(process.env.HOCUS_PORT || "1234", 10);

const server = Server.configure({
  port: PORT,
  address: "0.0.0.0",

  // No onAuthenticate hook — defining it puts Hocuspocus into auth-required
  // mode where the server waits for a client-side `token` before completing
  // the sync handshake. Our @hocuspocus/provider clients don't send a token,
  // so adding this hook would deadlock the handshake (server waits for auth,
  // client waits for sync, no awareness frames are ever exchanged).
  // Document-level RBAC is enforced at the Next.js HTTP layer when the user
  // opens /documents/[id], so the WS layer can be open.

  async onStoreDocument() {
    /* no-op — HTTP sync is the source of truth */
  },
  async onLoadDocument({ document }) {
    return document;
  },
  async onConnect({ documentName, request }) {
    const ip = request.socket.remoteAddress || "?";
    console.log(`[hocus] connect doc=${documentName} ip=${ip}`);
  },
  async onDisconnect({ documentName }) {
    console.log(`[hocus] disconnect doc=${documentName}`);
  },
});

server.listen().then(() => {
  console.log(`[hocus] listening on :${PORT}`);
});

process.on("SIGTERM", () => server.destroy());
process.on("SIGINT", () => server.destroy());
