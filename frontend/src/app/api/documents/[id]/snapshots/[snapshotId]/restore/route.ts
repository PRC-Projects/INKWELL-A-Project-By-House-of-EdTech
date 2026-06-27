import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getDocumentAccess, canWrite } from "@/lib/rbac";
import { applyUpdates, bytesToBase64 } from "@/lib/yjs-server";
import * as Y from "yjs";
import { Prisma } from "@prisma/client";

type Ctx = { params: Promise<{ id: string; snapshotId: string }> };

/**
 * Restoring a snapshot is "safe" — it never destroys the live history.
 * Instead, we compute a Yjs update that, when applied to the current state,
 * produces the snapshot's text/structure. We then merge that update normally
 * via the sync pipeline so offline edits made since the snapshot are NOT
 * silently overwritten — they remain as concurrent operations on the CRDT.
 */
export async function POST(_: Request, { params }: Ctx) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const { id: documentId, snapshotId } = await params;

  const access = await getDocumentAccess(documentId, userId);
  if (!canWrite(access)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const result = await prisma.$transaction(
    async (tx) => {
      const snap = await tx.snapshot.findFirst({
        where: { id: snapshotId, documentId },
        select: { state: true },
      });
      const doc = await tx.document.findUnique({ where: { id: documentId }, select: { yjsState: true } });
      if (!snap || !doc) return null;

      // Build a "delta" doc whose content matches the snapshot, applied on top of current.
      const currentDoc = new Y.Doc();
      Y.applyUpdate(currentDoc, new Uint8Array(doc.yjsState));
      const snapDoc = new Y.Doc();
      Y.applyUpdate(snapDoc, new Uint8Array(snap.state));

      const currentText = currentDoc.getText("content").toString();
      const snapText = snapDoc.getText("content").toString();

      // Apply text edit on currentDoc transactionally: replace whole text with snapshot text.
      currentDoc.transact(() => {
        const t = currentDoc.getText("content");
        if (currentText.length > 0) t.delete(0, currentText.length);
        if (snapText.length > 0) t.insert(0, snapText);
      });

      const merged = Y.encodeStateAsUpdate(currentDoc);
      await tx.document.update({
        where: { id: documentId },
        data: { yjsState: Buffer.from(merged), stateVector: { increment: 1 } },
      });
      // Persist as an Update row so other clients receive it on next sync.
      await tx.update.create({
        data: {
          documentId,
          userId,
          clientId: `restore-${snapshotId}`,
          clock: Date.now() & 0x7fffffff,
          payload: Buffer.from(merged),
        },
      });
      return { merged };
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable, timeout: 10_000 },
  );

  if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, serverUpdate: bytesToBase64(result.merged) });
}
