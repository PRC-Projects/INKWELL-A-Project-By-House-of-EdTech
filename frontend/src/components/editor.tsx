"use client";
import { useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import { useSelector } from "react-redux";
import { useYDoc, base64ToBytes, type PresenceUser } from "@/lib/yjs-client";
import { useSyncEngine } from "@/store/useSyncEngine";
import type { RootState } from "@/store/store";

interface EditorProps {
  documentId: string;
  initialServerState: string; // base64
  canEdit: boolean;
}

/**
 * The editor is a contentEditable bound bidirectionally to Yjs's Y.Text
 * named "content". We keep typing latency minimal by writing directly into
 * the Y.Doc (no React state in the hot path).
 *
 * Presence:
 *  - Other users' carets are rendered as colored vertical bars overlaid on
 *    the editor surface. Positions come from each peer's `caret` awareness
 *    field, which we update on every selectionchange.
 *  - This DOES NOT touch the Y.Doc itself — awareness is ephemeral, kept in
 *    memory by Hocuspocus, and discarded on disconnect. Cannot affect CRDT
 *    determinism.
 */
export function Editor({ documentId, initialServerState, canEdit }: EditorProps) {
  const { doc, ready, presence, setCaret } = useYDoc(documentId);
  useSyncEngine(documentId, doc, canEdit);
  const elRef = useRef<HTMLDivElement>(null);
  const lastTextRef = useRef("");
  const [, force] = useState(0);
  const ytextRef = useRef<Y.Text | null>(null);

  // Hydrate the local doc with the server state ONCE on mount.
  useEffect(() => {
    if (!doc) return;
    if (initialServerState) {
      const bytes = base64ToBytes(initialServerState);
      if (bytes.length > 0) Y.applyUpdate(doc, bytes, "remote");
    }
    ytextRef.current = doc.getText("content");
  }, [doc, initialServerState]);

  // Bind Y.Text → DOM
  useEffect(() => {
    if (!doc || !ready) return;
    const ytext = doc.getText("content");
    ytextRef.current = ytext;
    const refresh = () => {
      const current = ytext.toString();
      if (current === lastTextRef.current) return;
      lastTextRef.current = current;
      if (elRef.current && document.activeElement !== elRef.current) {
        elRef.current.innerText = current;
      } else if (elRef.current) {
        const selection = window.getSelection();
        const caret = selection?.focusOffset ?? 0;
        elRef.current.innerText = current;
        try {
          const node = elRef.current.firstChild ?? elRef.current;
          const range = document.createRange();
          const max = node.nodeType === Node.TEXT_NODE ? (node.textContent ?? "").length : 0;
          range.setStart(node, Math.min(caret, max));
          range.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(range);
        } catch { /* no-op */ }
      }
      force((n) => n + 1);
    };
    refresh();
    ytext.observe(refresh);
    return () => { ytext.unobserve(refresh); };
  }, [doc, ready]);

  // DOM → Y.Text
  const onInput = () => {
    const el = elRef.current;
    const ytext = ytextRef.current;
    if (!el || !ytext || !doc) return;
    const next = el.innerText;
    const prev = ytext.toString();
    if (next === prev) return;
    let start = 0;
    const minLen = Math.min(prev.length, next.length);
    while (start < minLen && prev[start] === next[start]) start++;
    let endPrev = prev.length;
    let endNext = next.length;
    while (endPrev > start && endNext > start && prev[endPrev - 1] === next[endNext - 1]) {
      endPrev--;
      endNext--;
    }
    doc.transact(() => {
      if (endPrev > start) ytext.delete(start, endPrev - start);
      if (endNext > start) ytext.insert(start, next.slice(start, endNext));
    }, "local");
    lastTextRef.current = next;
    broadcastCaret();
  };

  // Broadcast caret offset on selection changes
  const broadcastCaret = () => {
    const el = elRef.current;
    if (!el) return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) { setCaret(null); return; }
    const r = sel.getRangeAt(0);
    if (!el.contains(r.startContainer)) { setCaret(null); return; }
    // count chars before the caret
    let offset = 0;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      if (node === r.startContainer) { offset += r.startOffset; break; }
      offset += (node.textContent ?? "").length;
      node = walker.nextNode();
    }
    setCaret(offset);
  };

  useEffect(() => {
    const h = () => broadcastCaret();
    document.addEventListener("selectionchange", h);
    return () => document.removeEventListener("selectionchange", h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCaret]);

  return (
    <div className="paper-card grain rounded-lg p-8 md:p-12 min-h-[60vh] relative">
      <PresenceLabels presence={presence} />
      <div
        ref={elRef}
        contentEditable={canEdit}
        suppressContentEditableWarning
        onInput={onInput}
        onKeyUp={broadcastCaret}
        onMouseUp={broadcastCaret}
        data-testid="editor-surface"
        data-can-edit={canEdit}
        data-placeholder={canEdit ? "Start writing… your edits save locally first." : "You have view-only access."}
        className="editor-surface relative"
        spellCheck
      />
      <CursorOverlay editorRef={elRef} presence={presence} />
      <ReadOnlyHint canEdit={canEdit} />
    </div>
  );
}

function PresenceLabels({ presence }: { presence: PresenceUser[] }) {
  if (!presence.length) return null;
  return (
    <div className="absolute top-2 right-3 flex items-center gap-1.5" data-testid="presence-labels">
      {presence.slice(0, 6).map((u) => (
        <div
          key={u.id}
          data-testid={`presence-${u.id}`}
          className="flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded-full bg-card border border-border"
          title={u.name}
        >
          <span className="h-2 w-2 rounded-full" style={{ background: u.color }} />
          <span className="max-w-[7rem] truncate">{u.name}</span>
        </div>
      ))}
      {presence.length > 6 && (
        <span className="text-[11px] text-muted-foreground">+{presence.length - 6}</span>
      )}
    </div>
  );
}

/**
 * Renders each peer's caret as a thin colored bar at the right pixel
 * position by walking the editor's text node and measuring with a Range.
 * Re-runs on every render; cheap because there are few peers.
 */
function CursorOverlay({
  editorRef,
  presence,
}: {
  editorRef: React.RefObject<HTMLDivElement | null>;
  presence: PresenceUser[];
}) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const ro = new ResizeObserver(() => setTick((n) => n + 1));
    if (editorRef.current) ro.observe(editorRef.current);
    const onScroll = () => setTick((n) => n + 1);
    window.addEventListener("scroll", onScroll, true);
    return () => { ro.disconnect(); window.removeEventListener("scroll", onScroll, true); };
  }, [editorRef]);

  const el = editorRef.current;
  if (!el) return null;
  const text = el.firstChild?.nodeType === Node.TEXT_NODE ? (el.firstChild as Text) : null;
  if (!text) return null;
  const editorRect = el.getBoundingClientRect();
  const cursors: { user: PresenceUser; left: number; top: number; height: number }[] = [];
  for (const u of presence) {
    if (u.caret == null) continue;
    const offset = Math.min(Math.max(0, u.caret), text.length);
    try {
      const r = document.createRange();
      r.setStart(text, offset);
      r.setEnd(text, offset);
      const rect = r.getBoundingClientRect();
      cursors.push({
        user: u,
        left: rect.left - editorRect.left,
        top: rect.top - editorRect.top,
        height: rect.height || 18,
      });
    } catch { /* ignore */ }
  }
  // ref-only dependency for ResizeObserver tick
  void tick;
  return (
    <div className="pointer-events-none absolute inset-0" data-testid="cursor-overlay">
      {cursors.map(({ user, left, top, height }) => (
        <div
          key={user.id}
          data-testid={`remote-cursor-${user.id}`}
          style={{ left, top, height, background: user.color }}
          className="absolute w-[2px] z-10 animate-pulse"
        >
          <span
            className="absolute -top-5 left-0 text-[10px] font-mono px-1.5 py-0.5 rounded text-white whitespace-nowrap"
            style={{ background: user.color }}
          >
            {user.name}
          </span>
        </div>
      ))}
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
