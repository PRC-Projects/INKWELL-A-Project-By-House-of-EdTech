"use server";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import * as Y from "yjs";

/**
 * Server Action for creating a document. Lives in a separate "use server"
 * file so it can be invoked by <form action={createDocument}> directly,
 * with no dependency on client-side React hydration.
 */
export async function createDocument(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const userId = (session.user as { id: string }).id;
  const raw = String(formData.get("title") || "").trim();
  if (!raw) return;
  const title = raw.slice(0, 200);

  const ydoc = new Y.Doc();
  ydoc.getText("content");
  const initial = Buffer.from(Y.encodeStateAsUpdate(ydoc));

  const doc = await prisma.document.create({
    data: { title, ownerId: userId, yjsState: initial },
    select: { id: true },
  });
  redirect(`/documents/${doc.id}`);
}
