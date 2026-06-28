"use client";
import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useYDoc, base64ToBytes, type PresenceUser } from "@/lib/yjs-client";
import { useSyncEngine } from "@/store/useSyncEngine";
import { useSession } from "next-auth/react";
import { EditorToolbar } from "@/components/editor-toolbar";
import { HocuspocusProvider } from "@hocuspocus/provider";

interface EditorProps {
  documentId: string;
  initialServerState: string; // base64
  canEdit: boolean;
}

function colorFromId(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
  return `hsl(${h} 70% 45%)`;
}

/**
 * Tiptap-based collaborative editor.
 *
 * - Uses Tiptap's Collaboration extension which writes to Y.XmlFragment "default"
 *   on the SAME Y.Doc managed by useYDoc. The HTTP sync engine persists those
 *   binary updates to Postgres (SERIALIZABLE, idempotent on clientId+clock).
 * - CollaborationCursor uses provider.awareness to broadcast named/colored
 *   cursor positions to every peer in real time — zero-delay because Tiptap
 *   updates awareness on every selection change and Hocuspocus relays it
 *   immediately.
 * - The Collaboration extension OWNS undo/redo (its own UndoManager).
 *   StarterKit's history must be disabled to avoid conflicts.
 */
export function Editor({ documentId, initialServerState, canEdit }: EditorProps) {
  const { doc, presence } = useYDoc(documentId);
  useSyncEngine(documentId, doc, canEdit);
  const { data: session } = useSession();

  // One-time hydration: apply the server's binary state to the local doc
  // BEFORE Tiptap mounts. This ensures Tiptap starts with the correct content.
  useEffect(() => {
    if (!doc) return;
    if (!initialServerState) return;
    const bytes = base64ToBytes(initialServerState);
    if (bytes.length > 0) {
      Y.applyUpdate(doc, bytes, "remote");
      migrateLegacyTextIfNeeded(doc);
    }
  }, [doc, initialServerState]);

  const provider = doc
    ? ((doc as unknown as { _hp?: HocuspocusProvider })._hp ?? null)
    : null;

  const u = session?.user as { id?: string; name?: string | null; email?: string | null } | undefined;
  const uid = u?.id || u?.email || "anon";
  const uname = u?.name || u?.email || "Anonymous";
  const ucolor = colorFromId(uid);

  const editor = useEditor(
    {
      immediatelyRender: false,
      editable: canEdit,
      extensions: [
        // history is provided by Collaboration extension below — must disable here
        StarterKit.configure({ history: false }),
        Underline,
        Placeholder.configure({
          placeholder: canEdit ? "Start writing… your edits save locally first." : "You have view-only access.",
        }),
        ...(doc
          ? [Collaboration.configure({ document: doc, field: "default" })]
          : []),
        ...(provider
          ? [
              CollaborationCursor.configure({
                provider: provider,
                user: { id: uid, name: uname, color: ucolor },
              }),
            ]
          : []),
      ],
      editorProps: {
        attributes: {
          class: "editor-surface prose max-w-none focus:outline-none",
          "data-testid": "editor-surface",
          "data-can-edit": String(canEdit),
          spellcheck: "true",
        },
      },
    },
    [doc, provider, canEdit, uname, ucolor],
  );

  return (
    <div className="paper-card rounded-lg overflow-hidden">
      {canEdit && editor && <EditorToolbar editor={editor} />}
      <div className="p-6 md:p-10 min-h-[60vh] relative">
        <PresenceLabels presence={presence} self={{ id: uid, name: uname, color: ucolor }} />
        <EditorContent editor={editor} />
        <ReadOnlyHint canEdit={canEdit} />
      </div>
    </div>
  );
}

function migrateLegacyTextIfNeeded(doc: Y.Doc) {
  const frag = doc.getXmlFragment("default");
  if (frag.length > 0) return;
  const legacyText = doc.getText("content").toString();
  if (!legacyText.trim()) return;
  // Insert legacy plain text as paragraphs so Tiptap can render it.
  doc.transact(() => {
    for (const line of legacyText.split(/\n+/)) {
      const para = new Y.XmlElement("paragraph");
      if (line) para.insert(0, [new Y.XmlText(line)]);
      frag.push([para]);
    }
  }, "migration");
}

function PresenceLabels({
  presence,
  self,
}: {
  presence: PresenceUser[];
  self: { id: string; name: string; color: string };
}) {
  const list = [self, ...presence];
  return (
    <div className="absolute top-3 right-4 flex items-center gap-1.5 z-10" data-testid="presence-labels">
      {list.slice(0, 6).map((u) => (
        <div
          key={u.id}
          data-testid={`presence-${u.id}`}
          className="flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded-full bg-card border border-border shadow-sm"
          title={u.name}
        >
          <span className="h-2 w-2 rounded-full" style={{ background: u.color }} />
          <span className="max-w-[7rem] truncate">{u.name}{u.id === self.id ? " (you)" : ""}</span>
        </div>
      ))}
      {list.length > 6 && <span className="text-[11px] text-muted-foreground">+{list.length - 6}</span>}
    </div>
  );
}

function ReadOnlyHint({ canEdit }: { canEdit: boolean }) {
  const lastError = useSelector((s: RootState) => s.sync.lastError);
  if (canEdit) return null;
  return (
    <p data-testid="viewer-readonly-hint" className="mt-4 text-xs text-muted-foreground italic">
      Read-only — viewers cannot push state updates to the server.
      {lastError ? ` (${lastError})` : ""}
    </p>
  );
}
