import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export type AccessLevel = "none" | "view" | "edit" | "own";

export interface DocAccess {
  documentId: string;
  userId: string;
  role: Role | null;
  isOwner: boolean;
  level: AccessLevel;
}

/**
 * Resolves a user's access to a document via ORM scoping. Used as the single
 * source of truth for tenant isolation. Every route MUST call this before any
 * read/write to a document — never trust a documentId from the client.
 */
export async function getDocumentAccess(
  documentId: string,
  userId: string,
): Promise<DocAccess> {
  const doc = await prisma.document.findFirst({
    where: {
      id: documentId,
      OR: [{ ownerId: userId }, { memberships: { some: { userId } } }],
    },
    select: { id: true, ownerId: true, memberships: { where: { userId }, select: { role: true } } },
  });
  if (!doc) {
    return { documentId, userId, role: null, isOwner: false, level: "none" };
  }
  const isOwner = doc.ownerId === userId;
  const role: Role | null = isOwner ? Role.OWNER : (doc.memberships[0]?.role ?? null);
  let level: AccessLevel = "none";
  if (isOwner) level = "own";
  else if (role === Role.EDITOR) level = "edit";
  else if (role === Role.VIEWER) level = "view";
  return { documentId, userId, role, isOwner, level };
}

export function canWrite(access: DocAccess): boolean {
  return access.level === "own" || access.level === "edit";
}
export function canRead(access: DocAccess): boolean {
  return access.level !== "none";
}
export function canManage(access: DocAccess): boolean {
  return access.level === "own";
}
