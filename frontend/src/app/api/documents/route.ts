import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createDocumentSchema } from "@/lib/validators";
import * as Y from "yjs";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const docs = await prisma.document.findMany({
    where: {
      OR: [{ ownerId: userId }, { memberships: { some: { userId } } }],
    },
    select: {
      id: true,
      title: true,
      ownerId: true,
      updatedAt: true,
      owner: { select: { email: true, name: true } },
      memberships: { where: { userId }, select: { role: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
  const data = docs.map((d) => ({
    id: d.id,
    title: d.title,
    updatedAt: d.updatedAt,
    owner: d.owner,
    role: d.ownerId === userId ? "OWNER" : (d.memberships[0]?.role ?? "VIEWER"),
  }));
  return NextResponse.json({ documents: data });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  const parsed = createDocumentSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const ydoc = new Y.Doc();
  ydoc.getText("content");
  const initial = Buffer.from(Y.encodeStateAsUpdate(ydoc));

  const doc = await prisma.document.create({
    data: { title: parsed.data.title, ownerId: userId, yjsState: initial },
    select: { id: true, title: true },
  });
  return NextResponse.json({ document: doc }, { status: 201 });
}
