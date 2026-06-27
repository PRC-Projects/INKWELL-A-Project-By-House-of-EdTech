# Inkwell — Local-First Collaborative Document Editor (PRD)

## Original problem statement

Build a Local-First, Collaborative Document Editor using **Next.js 16 (App
Router, TypeScript)**, **PostgreSQL + Prisma**, **Redux Toolkit**, **Yjs + IndexedDB**,
**Tailwind + shadcn/ui**, **NextAuth**, and **Google Gemini**. Features:

1. Local-first edit + save (zero UI blocking, edits work offline)
2. Background sync queue + connection status indicator
3. Snapshot-based version history (timeline + safe restore)
4. RBAC: Owner, Editor, Viewer — Viewers cannot push state updates
5. Smart AI Assistant powered by Gemini: summarize + grammar fix
6. Footer with name "Pritam Roy Choudhury" + GitHub + LinkedIn links
7. Strict Zod validation of sync payloads to prevent OOM
8. Tenant isolation via ORM scoping
9. No client-side typing lag; SSR + code splitting
10. Solve CRDT race-conditions, not a CRUD app

## Architecture

- **Next.js 16** on port 3000 — pages + every functional `/api/*` route.
- **FastAPI sidecar** on port 8001 — (a) hosts `/__internal/ai` that calls
  Gemini via emergentintegrations; (b) reverse-proxies all other `/api/*` to
  Next.js (K8s ingress only routes `/api/*` to 8001 in this environment).
- **PostgreSQL** on port 5432 (`docedit/docedit/docedit`).

### CRDT race-condition strategy

1. Every local edit is captured by Yjs and persisted to IndexedDB
   immediately — typing never blocks on the network.
2. The sync engine tags each update with `(clientId, clock)`. The Postgres
   `Update` table has `UNIQUE(documentId, clientId, clock)` so retries are
   idempotent.
3. The `POST /api/.../sync` endpoint runs in a SERIALIZABLE transaction:
   it reads the doc state, applies new updates, writes back. CRDT
   commutativity guarantees the merged result is identical regardless of
   transaction ordering. Concurrent writers never overwrite each other.
4. The same endpoint returns a diff for the client's current state vector
   so the client picks up any concurrent edits that landed between its pull
   and push.
5. Snapshots restore *via the same sync pipeline*: a restore is just one
   more CRDT update — offline edits made since the snapshot are NOT
   silently overwritten; they remain in the doc's history.

## What's implemented (2026-02-27)

- Next.js 16 + Prisma + Postgres + NextAuth Credentials wired end-to-end
- Yjs CRDT editor with IndexedDB persistence and live sync engine in Redux
- Background sync queue with retry, idempotent server-side dedup
- Snapshots + safe restore that funnels through the sync pipeline
- RBAC: Owner / Editor / Viewer roles, viewers blocked at the route layer
- Smart AI Assistant (Gemini via Emergent universal LLM key) — summarize + grammar
- Zod validation on every API boundary; size caps on update + state bytes
- Connection status indicator (online / offline / syncing / error)
- Footer with name + GitHub + LinkedIn

## Backlog (P1)

- Multi-user real-time presence (cursors) via WebSocket / Hocuspocus
- Document export (Markdown, PDF)
- Per-snapshot diff preview before restore
- Audit log of permission changes

## Next action items

- Run the testing agent end-to-end on the auth + sync + RBAC flows
- Add document export to Markdown
- Wire WebSocket-based presence for live collaboration
