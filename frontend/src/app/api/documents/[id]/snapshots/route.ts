import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getDocumentAccess, canRead, canWrite } from "@/lib/rbac";
import { createSnapshotSchema } from "@/lib/validators";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Ctx) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const { id: documentId } = await params;
  const access = await getDocumentAccess(documentId, userId);
  if (!canRead(access)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const snapshots = await prisma.snapshot.findMany({
    where: { documentId },
    select: { id: true, label: true, createdAt: true, createdBy: { select: { email: true, name: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json({ snapshots });
}

export async function POST(req: Request, { params }: Ctx) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const { id: documentId } = await params;
  const access = await getDocumentAccess(documentId, userId);
  if (!canWrite(access)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = (await req.json().catch(() => null)) as unknown;
  const parsed = createSnapshotSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const doc = await prisma.document.findUnique({ where: { id: documentId }, select: { yjsState: true } });
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const snap = await prisma.snapshot.create({
    data: { documentId, createdById: userId, label: parsed.data.label, state: doc.yjsState },
    select: { id: true, label: true, createdAt: true },
  });
  return NextResponse.json({ snapshot: snap }, { status: 201 });
}
