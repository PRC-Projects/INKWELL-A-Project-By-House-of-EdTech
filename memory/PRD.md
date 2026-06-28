# Inkwell — Local-First Collaborative Document Editor (PRD)

## Original problem statement

Build a Local-First, Collaborative Document Editor using **Next.js 16 (App
Router, TypeScript)**, **PostgreSQL + Prisma**, **Redux Toolkit**, **Yjs + IndexedDB**,
**Tailwind + shadcn/ui**, **NextAuth**, and **Google Gemini**. Solve CRDT race
conditions, not basic CRUD.

User reframed (Feb 2026) the priority list to:
1. **Seamless Sync & Presence** — exact live user count, named cursors, zero delay
2. **Rich-text Tiptap toolbar** (Bold/Italic/Lists/H1/H2/Quote/Code/HR)
3. **AI Text Assistant via user-supplied Gemini key** (Summarize, Grammar, Explain-Diff). No image generation.
4. **Dashboard UX** — delete-doc button + popups close on outside click + INKWELL wordmark
5. **Clean UI** — drop paper textures + custom cursors

## Architecture

- **Next.js 16** on port 3000 — pages + every functional `/api/*` route.
- **FastAPI sidecar** on port 8001:
  - reverse-proxies HTTP `/api/*` → Next.js on :3000
  - bridges WebSocket `/api/hocus` → Hocuspocus on :1234
- **Hocuspocus** on port 1234 (awareness + low-latency relay; does NOT persist).
- **PostgreSQL** on port 5432 (`docedit/docedit/docedit`).

### Three layers acting on the same Y.Doc (deterministic by design)

1. **IndexedDB** — local persistence; mirrors every edit immediately.
2. **HTTP sync engine** — Redux queue → POST `/api/.../sync` (SERIALIZABLE
   tx, unique `(documentId, clientId, clock)` for idempotency). Authoritative
   persistence to Postgres.
3. **Hocuspocus WebSocket** — awareness + live relay over the SAME Y.Doc.
   `Y.applyUpdate` is op-ID-idempotent — duplicate application from HTTP and
   WS paths is a no-op. Awareness (cursor positions, user labels) is
   ephemeral and never touches Postgres.

## What's implemented (current — Feb 2026)

- Next.js 16 + Prisma + Postgres + NextAuth Credentials end-to-end
- `/login` Route Handler → `/login-form` redirect with `__Host-authjs.csrf-token` pre-seeded
- Yjs CRDT editor with IndexedDB persistence + Redux sync engine
- **Tiptap rich-text editor** with toolbar (bold/italic/underline/strike/h1/h2/bulletList/orderedList/blockquote/code/codeBlock/hr/undo/redo)
- Snapshots — create, list, diff (line-level), restore (XmlFragment-aware), Markdown export
- **AI Assistant** via user's Gemini API key (`gemini-2.5-flash` + `2.5-flash-lite` fallback): Summarize, Grammar fix, Explain-Diff
- AI "Apply to doc" writes to the live `Y.XmlFragment("default")` so Tiptap re-renders
- RBAC: Owner / Editor / Viewer (viewers blocked at the route layer; viewer-readonly-hint banner)
- **Hocuspocus presence** working:
  - 2 simultaneous tabs both show `2 live` within < 1s
  - 0.5s detection when a peer leaves (down from 6s pre-fix)
  - Named cursor badges via Tiptap CollaborationCursor extension
- Dashboard: doc cards with `doc-delete-{id}` button (owner only), native confirm
- All header popups (AI / History / Share) close on outside click via `use-click-outside`
- Stylized "Inkwell" wordmark logo (text-based, no paper texture)
- Footer with name + GitHub + LinkedIn

## Service map

| Service      | Port | Source                              |
| ------------ | ---- | ----------------------------------- |
| Next.js      | 3000 | `/app/frontend` (`yarn start`)      |
| FastAPI side | 8001 | `/app/backend/server.py`            |
| Hocuspocus   | 1234 | `/app/hocuspocus/server.cjs` (spawned by `server.py` startup) |
| PostgreSQL   | 5432 | local cluster                       |

External `/api/*` traffic → K8s ingress → FastAPI :8001 → either Next.js
:3000 (HTTP) or Hocuspocus :1234 (WebSocket).

## Recent fixes (Feb 2026)

- **P0 awareness sync deadlock** — removed `onAuthenticate` hook from
  `/app/hocuspocus/server.cjs` which had put Hocuspocus in auth-required mode,
  waiting for a client `token` that `@hocuspocus/provider` never sends. The
  sync handshake now completes, awareness frames flow, peers see each other.
- **Provider exposed as React state** in `useYDoc` (`/app/frontend/src/lib/yjs-client.ts`)
  — previously the editor read `doc._hp` at render time before the effect
  attached the provider, so Tiptap's `CollaborationCursor` extension booted
  with a null provider and never broadcast/received awareness.
- **Disconnect-pruning latency 6s → 0.5s** — `/app/backend/server.py` WS proxy
  now cancels its partner task on first completion (instead of `gather`-ing
  both), so the upstream WS to Hocuspocus is closed immediately when the
  browser closes its end. Hocuspocus then broadcasts the awareness removal
  to remaining peers within a single tick.
- **AI Apply-to-doc** now writes to `Y.XmlFragment("default")` so Tiptap
  re-renders (was still writing to the legacy `Y.Text("content")`).
- **Stale NEXTAUTH_URL** in `/app/frontend/.env` pointed at the previous
  preview job's hostname — updated to the current `REACT_APP_BACKEND_URL`.
- **Viewer membership row seeded** for the demo doc (`cmqy41omm007ydtv8mbnyq6s8`)
  so the documented RBAC viewer-readonly path is reachable.

## Backlog (P1)

- Per-user audit log of permission changes
- Document export to PDF
- Per-snapshot diff with word-level granularity
- Snapshot-diff modal: add `data-testid="diff-loading"` for deterministic E2E
