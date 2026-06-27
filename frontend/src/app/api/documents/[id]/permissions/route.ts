import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getDocumentAccess, canManage } from "@/lib/rbac";
import { updateMembershipSchema } from "@/lib/validators";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: Ctx) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const { id: documentId } = await params;

  const access = await getDocumentAccess(documentId, userId);
  if (!canManage(access)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = (await req.json().catch(() => null)) as unknown;
  const parsed = updateMembershipSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const target = await prisma.user.findUnique({ where: { email: parsed.data.email }, select: { id: true, email: true, name: true } });
  if (!target) return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (target.id === userId) return NextResponse.json({ error: "Cannot add yourself" }, { status: 400 });

  const membership = await prisma.membership.upsert({
    where: { userId_documentId: { userId: target.id, documentId } },
    update: { role: parsed.data.role },
    create: { userId: target.id, documentId, role: parsed.data.role },
    select: { id: true, role: true, user: { select: { id: true, email: true, name: true } } },
  });
  return NextResponse.json({ membership });
}

export async function DELETE(req: Request, { params }: Ctx) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const { id: documentId } = await params;
  const access = await getDocumentAccess(documentId, userId);
  if (!canManage(access)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const url = new URL(req.url);
  const targetUserId = url.searchParams.get("userId");
  if (!targetUserId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  await prisma.membership.deleteMany({ where: { userId: targetUserId, documentId } });
  return NextResponse.json({ ok: true });
}
