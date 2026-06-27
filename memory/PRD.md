# Inkwell — Local-First Collaborative Document Editor (PRD)

## Original problem statement

Build a Local-First, Collaborative Document Editor using **Next.js 16 (App
Router, TypeScript)**, **PostgreSQL + Prisma**, **Redux Toolkit**, **Yjs + IndexedDB**,
**Tailwind + shadcn/ui**, **NextAuth**, and **Google Gemini**. Solve CRDT race
conditions, not basic CRUD.

## Architecture

- **Next.js 16** on port 3000 — pages + every functional `/api/*` route.
- **FastAPI sidecar** on port 8001:
  - reverse-proxies HTTP `/api/*` → Next.js on :3000
  - bridges WebSocket `/api/hocus` → Hocuspocus on :1234
  - hosts `/__internal/ai` (Gemini via emergentintegrations)
- **Hocuspocus** on port 1234 (awareness + low-latency relay layer over the
  same Y.Doc; **does NOT persist** — HTTP sync remains source of truth).
- **PostgreSQL** on port 5432 (`docedit/docedit/docedit`).

### Three layers acting on the same Y.Doc (deterministic by design)

1. **IndexedDB** — local persistence; mirrors every edit immediately.
2. **HTTP sync engine** — Redux queue → POST `/api/.../sync` (SERIALIZABLE
   tx, unique `(documentId, clientId, clock)` for idempotency). Authoritative
   persistence to Postgres.
3. **Hocuspocus WebSocket** — awareness + live relay. Pumps Y.Doc updates
   between connected clients via `Y.applyUpdate`, which is op-ID-idempotent —
   the same update applied via HTTP path and again via WS path is a no-op.
   Awareness state (cursor positions, user labels) is ephemeral, lost on
   disconnect, and never touches Postgres.

## What's implemented (round 4 — current)

- Next.js 16 + Prisma + Postgres + NextAuth Credentials wired end-to-end
- `/login` Route Handler → `/login-form` redirect with `__Host-authjs.csrf-token`
  pre-seeded — eliminates the browser CSRF race
- Yjs CRDT editor with IndexedDB persistence and a Redux-driven sync engine
- Snapshots + safe restore funneled through the sync pipeline
- **Per-snapshot diff modal** with line-level visual diff + Markdown export
- **AI "Explain this diff"** — Gemini narrates additions/deletions in 2-3 sentences
- RBAC: Owner / Editor / Viewer (viewers blocked at the route layer)
- Smart AI Assistant (summarize + grammar)
- **Hocuspocus presence** — cursor labels coloured by user id, presence
  badges at top of editor, live "N other users" indicator
- Zod validation on every API boundary; OOM caps on update + state bytes
- Connection status indicator (online / offline / syncing / error)
- Footer with name + GitHub + LinkedIn

## Service map

| Service      | Port | Source                              |
| ------------ | ---- | ----------------------------------- |
| Next.js      | 3000 | `/app/frontend` (`yarn start`)      |
| FastAPI side | 8001 | `/app/backend/server.py`            |
| Hocuspocus   | 1234 | `/app/hocuspocus/server.cjs` (spawned by `server.py` startup) |
| PostgreSQL   | 5432 | local cluster (spawned by `server.py` startup) |

External `/api/*` traffic → K8s ingress → FastAPI :8001 → either Next.js
:3000 (HTTP) or Hocuspocus :1234 (WebSocket).

## Backlog (P1)

- Per-user audit log of permission changes
- Document export to PDF
- Per-snapshot diff with word-level granularity
- Conflict-free rich-text (y-prosemirror) for tables/lists
