"use client";
import { useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import { useDispatch, useSelector } from "react-redux";
import { useYDoc, base64ToBytes } from "@/lib/yjs-client";
import { useSyncEngine } from "@/store/useSyncEngine";
import type { RootState } from "@/store/store";

interface EditorProps {
  documentId: string;
  initialServerState: string; // base64
  canEdit: boolean;
}

/**
 * The editor is a contentEditable that binds bidirectionally to Yjs's Y.Text
 * named "content". We avoid heavyweight bindings (y-prosemirror) to keep
 * typing latency minimal and the code transparent.
 *
 * Performance notes:
 *  - All edits are applied to the Yjs doc immediately (no React state in
 *    the hot path). Re-renders are scheduled via Y.Text.observe → setState
 *    only when the *remote* state changes — local typing never causes a
 *    re-render of the entire surface.
 *  - We use a manual diff on input (collapsed selection range) to translate
 *    DOM mutations into Y.Text ops, preserving caret position.
 */
export function Editor({ documentId, initialServerState, canEdit }: EditorProps) {
  const { doc, ready } = useYDoc(documentId);
  useSyncEngine(documentId, doc, canEdit);
  const dispatch = useDispatch();
  void dispatch;
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
        // Preserve caret if the user is currently typing in this element
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
    // Minimal diff: find common prefix/suffix to compute a single delete + insert.
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
  };

  return (
    <div className="paper-card grain rounded-lg p-8 md:p-12 min-h-[60vh]">
      <div
        ref={elRef}
        contentEditable={canEdit}
        suppressContentEditableWarning
        onInput={onInput}
        data-testid="editor-surface"
        data-can-edit={canEdit}
        data-placeholder={canEdit ? "Start writing… your edits save locally first." : "You have view-only access."}
        className="editor-surface"
        spellCheck
      />
      <ReadOnlyHint canEdit={canEdit} />
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
