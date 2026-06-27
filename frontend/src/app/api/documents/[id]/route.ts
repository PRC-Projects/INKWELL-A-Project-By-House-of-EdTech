import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getDocumentAccess, canManage } from "@/lib/rbac";
import { bytesToBase64 } from "@/lib/yjs-server";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Ctx) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const { id } = await params;
  const access = await getDocumentAccess(id, userId);
  if (access.level === "none") return NextResponse.json({ error: "Not found" }, { status: 404 });

  const doc = await prisma.document.findUnique({
    where: { id },
    select: {
      id: true, title: true, ownerId: true, yjsState: true, updatedAt: true,
      owner: { select: { id: true, email: true, name: true } },
      memberships: { select: { id: true, role: true, user: { select: { id: true, email: true, name: true } } } },
    },
  });
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    document: {
      id: doc.id,
      title: doc.title,
      owner: doc.owner,
      updatedAt: doc.updatedAt,
      role: access.role,
      isOwner: access.isOwner,
      memberships: doc.memberships,
      state: bytesToBase64(new Uint8Array(doc.yjsState)),
    },
  });
}

export async function PATCH(req: Request, { params }: Ctx) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const { id } = await params;
  const access = await getDocumentAccess(id, userId);
  if (!canManage(access)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = (await req.json().catch(() => null)) as { title?: string } | null;
  if (!body?.title || typeof body.title !== "string" || body.title.length > 200) {
    return NextResponse.json({ error: "Invalid title" }, { status: 400 });
  }
  await prisma.document.update({ where: { id }, data: { title: body.title.trim() } });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: Ctx) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const { id } = await params;
  const access = await getDocumentAccess(id, userId);
  if (!canManage(access)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await prisma.document.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
