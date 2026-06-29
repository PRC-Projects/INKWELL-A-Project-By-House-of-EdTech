import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getDocumentAccess, canWrite } from "@/lib/rbac";
import { bytesToBase64 } from "@/lib/yjs-server";
import * as Y from "yjs";
import { Prisma } from "@prisma/client";

type Ctx = { params: Promise<{ id: string; snapshotId: string }> };

/**
 * Restore a snapshot.
 *
 * Strategy:
 * 1. Read the snapshot's saved Y.Doc binary state.
 * 2. Build a fresh Y.Doc from the snapshot, encode it as a full update.
 * 3. Also apply that update on top of the CURRENT doc to ensure all clients
 * that have made offline edits since the snapshot still see a converged
 * state — CRDT properties guarantee no information is lost; concurrent
 * edits remain in history and merge deterministically with the snapshot
 * ops we are about to broadcast.
 * 4. Persist as a regular Update row so the standard sync pipeline relays
 * it to other clients on their next pull.
 *
 * For Tiptap-managed docs we additionally clear the current XmlFragment so
 * the visible content matches the snapshot exactly (users expect "restore"
 * to be visually authoritative). Offline structural changes made since the
 * snapshot will surface as a CRDT-merged diff once they reconnect.
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

      // Hydrate current Y.Doc from disk.
      const ydoc = new Y.Doc();
      Y.applyUpdate(ydoc, new Uint8Array(doc.yjsState));

      // Hydrate a temp Y.Doc from the snapshot to inspect its content.
      const snapDoc = new Y.Doc();
      Y.applyUpdate(snapDoc, new Uint8Array(snap.state));

      ydoc.transact(() => {
        // --- Tiptap (XmlFragment "default") ---
        const liveFrag = ydoc.getXmlFragment("default");
        const snapFrag = snapDoc.getXmlFragment("default");
        if (snapFrag.length > 0 || liveFrag.length > 0) {
          // Replace live fragment children with cloned snapshot children.
          if (liveFrag.length > 0) liveFrag.delete(0, liveFrag.length);
          for (const child of snapFrag.toArray()) {
            // FIX: Explicitly cast 'child' before passing it into cloneXml
            liveFrag.push([cloneXml(child as Y.XmlElement | Y.XmlText)]);
          }
        }
        // --- Legacy Y.Text "content" ---
        const liveText = ydoc.getText("content");
        const snapText = snapDoc.getText("content").toString();
        const curText = liveText.toString();
        if (curText.length > 0) liveText.delete(0, curText.length);
        if (snapText.length > 0) liveText.insert(0, snapText);
      }, "restore");

      const merged = Y.encodeStateAsUpdate(ydoc);
      await tx.document.update({
        where: { id: documentId },
        data: { yjsState: Buffer.from(merged), stateVector: { increment: 1 } },
      });
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
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable, timeout: 15_000 },
  );

  if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, serverUpdate: bytesToBase64(result.merged) });
}

/** Deep-clone a Y.XmlElement / Y.XmlText so it can be inserted into another doc. */
function cloneXml(node: Y.XmlElement | Y.XmlText): Y.XmlElement | Y.XmlText {
  if (node instanceof Y.XmlText) {
    const t = new Y.XmlText();
    const delta = node.toDelta() as Array<{ insert: string; attributes?: Record<string, unknown> }>;
    if (delta.length > 0) t.applyDelta(delta);
    return t;
  }
  const el = new Y.XmlElement(node.nodeName);
  const attrs = node.getAttributes();
  for (const key of Object.keys(attrs)) el.setAttribute(key, attrs[key] as string);
  for (const child of node.toArray()) el.push([cloneXml(child as Y.XmlElement | Y.XmlText)]);
  return el;
}
