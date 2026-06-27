import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getDocumentAccess, canWrite } from "@/lib/rbac";
import { syncPushSchema, MAX_UPDATE_BYTES } from "@/lib/validators";
import { applyUpdates, base64ToBytes, bytesToBase64, diffForClient } from "@/lib/yjs-server";
import { Prisma } from "@prisma/client";

type Ctx = { params: Promise<{ id: string }> };

/**
 * The sync endpoint. This is the heart of the system.
 *
 * Concurrency model:
 *  - We open a SERIALIZABLE transaction so two concurrent pushes for the same
 *    document never read the same `yjsState` and overwrite each other.
 *  - We insert each (clientId, clock) update with createMany + skipDuplicates,
 *    making the request idempotent — clients can safely retry a push that
 *    failed midway without producing duplicate ops.
 *  - We then re-read the merged state, apply only the *newly inserted* updates
 *    (the diff for THIS request), and write the new state back.
 *  - Finally, we encode a diff for the client's current state vector so the
 *    client receives every remote change it doesn't yet have — including any
 *    operations that landed between its last pull and this push.
 *
 * Viewers are rejected with 403 — they cannot push state changes.
 */
export async function POST(req: Request, { params }: Ctx) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const { id: documentId } = await params;

  const access = await getDocumentAccess(documentId, userId);
  if (access.level === "none") return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!canWrite(access)) {
    return NextResponse.json({ error: "Viewers cannot push state updates" }, { status: 403 });
  }

  // ---- Validation (defends against OOM payloads) ----
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  const parsed = syncPushSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", issues: parsed.error.flatten() }, { status: 400 });
  }
  // Defense in depth: re-check decoded byte sizes.
  for (const u of parsed.data.updates) {
    const len = Math.floor((u.update.length * 3) / 4);
    if (len > MAX_UPDATE_BYTES) {
      return NextResponse.json({ error: "Update too large" }, { status: 413 });
    }
  }

  // ---- Merge in a serializable transaction ----
  const txResult = await prisma.$transaction(
    async (tx) => {
      const doc = await tx.document.findUnique({ where: { id: documentId }, select: { yjsState: true } });
      if (!doc) return null;

      // Idempotent insert of incoming updates.
      const upserts = await tx.update.createMany({
        data: parsed.data.updates.map((u) => ({
          documentId,
          userId,
          clientId: u.clientId,
          clock: u.clock,
          payload: Buffer.from(u.update, "base64"),
        })),
        skipDuplicates: true,
      });

      // Re-read which updates are actually new in this request so we don't
      // double-apply on a retry.
      const inserted = await tx.update.findMany({
        where: {
          documentId,
          OR: parsed.data.updates.map((u) => ({ clientId: u.clientId, clock: u.clock })),
        },
        select: { payload: true, createdAt: true },
        orderBy: { createdAt: "asc" },
      });

      const { state: merged } = applyUpdates(
        new Uint8Array(doc.yjsState),
        inserted.map((r) => Buffer.from(r.payload).toString("base64")),
      );

      await tx.document.update({
        where: { id: documentId },
        data: { yjsState: Buffer.from(merged), stateVector: { increment: 1 } },
      });

      return { merged, accepted: upserts.count };
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable, timeout: 10_000 },
  );

  if (!txResult) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Diff back to client (covers concurrent edits we accepted between their pull and push).
  const diff = diffForClient(txResult.merged, parsed.data.stateVector);

  return NextResponse.json({
    accepted: txResult.accepted,
    serverUpdate: bytesToBase64(diff),
  });
}

/** Returns a diff the client can apply to catch up since `sv`. */
export async function GET(req: Request, { params }: Ctx) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const { id: documentId } = await params;

  const access = await getDocumentAccess(documentId, userId);
  if (access.level === "none") return NextResponse.json({ error: "Not found" }, { status: 404 });

  const url = new URL(req.url);
  const sv = url.searchParams.get("sv") || undefined;
  if (sv) {
    if (sv.length > Math.ceil((MAX_UPDATE_BYTES * 4) / 3) + 8) {
      return NextResponse.json({ error: "stateVector too large" }, { status: 413 });
    }
    // light validation that it's base64
    try { base64ToBytes(sv); } catch { return NextResponse.json({ error: "Invalid state vector" }, { status: 400 }); }
  }
  const doc = await prisma.document.findUnique({ where: { id: documentId }, select: { yjsState: true } });
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const diff = diffForClient(new Uint8Array(doc.yjsState), sv);
  return NextResponse.json({ serverUpdate: bytesToBase64(diff) });
}
