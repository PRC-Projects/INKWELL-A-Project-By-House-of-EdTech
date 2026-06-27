import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import * as Y from "yjs";

/**
 * Form POST endpoint for creating a document. Used as the form `action` so
 * the document is created before any client-side React hydration matters.
 * Returns a 303 redirect that the browser follows to /documents/{id}.
 */
export async function POST(req: Request): Promise<Response> {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", req.url), 303);
  }
  const userId = (session.user as { id: string }).id;
  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  const raw = String(form.get("title") || "").trim();
  if (!raw) {
    return NextResponse.redirect(new URL("/dashboard", req.url), 303);
  }
  const title = raw.slice(0, 200);

  const ydoc = new Y.Doc();
  ydoc.getText("content");
  const initial = Buffer.from(Y.encodeStateAsUpdate(ydoc));

  const doc = await prisma.document.create({
    data: { title, ownerId: userId, yjsState: initial },
    select: { id: true },
  });

  // Use the request URL's origin so the redirect works through the proxy.
  const h = await headers();
  const proto = h.get("x-forwarded-proto") || "https";
  const host = h.get("x-forwarded-host") || h.get("host") || new URL(req.url).host;
  return NextResponse.redirect(`${proto}://${host}/documents/${doc.id}`, 303);
}
