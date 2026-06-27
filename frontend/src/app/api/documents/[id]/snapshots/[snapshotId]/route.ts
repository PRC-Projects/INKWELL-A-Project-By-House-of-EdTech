import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getDocumentAccess, canRead } from "@/lib/rbac";
import { plainTextFromState } from "@/lib/yjs-server";

type Ctx = { params: Promise<{ id: string; snapshotId: string }> };

/** Returns the snapshot text + the live doc text so the client can render a
 *  side-by-side diff without mutating the live Yjs document. */
export async function GET(_: Request, { params }: Ctx) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const { id: documentId, snapshotId } = await params;
  const access = await getDocumentAccess(documentId, userId);
  if (!canRead(access)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [snap, doc] = await Promise.all([
    prisma.snapshot.findFirst({ where: { id: snapshotId, documentId }, select: { state: true, label: true, createdAt: true } }),
    prisma.document.findUnique({ where: { id: documentId }, select: { yjsState: true, title: true } }),
  ]);
  if (!snap || !doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    snapshot: { label: snap.label, createdAt: snap.createdAt, text: plainTextFromState(new Uint8Array(snap.state)) },
    current: { title: doc.title, text: plainTextFromState(new Uint8Array(doc.yjsState)) },
  });
}
