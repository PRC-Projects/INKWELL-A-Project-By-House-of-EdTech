"use client";
import type { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  Bold, Italic, Underline, Strikethrough,
  Heading1, Heading2, List, ListOrdered, Quote, Code, Code2,
  Undo2, Redo2, Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Props { editor: Editor }

function Btn({
  active, onClick, children, label, testId, disabled,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label: string;
  testId: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      data-testid={testId}
      title={label}
      aria-label={label}
      aria-pressed={!!active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()} /* keep editor focus */
      onClick={onClick}
      className={cn(
        "h-8 w-8 inline-flex items-center justify-center rounded-md text-sm",
        "hover:bg-secondary text-foreground transition-colors",
        active && "bg-secondary text-primary",
        disabled && "opacity-40 cursor-not-allowed",
      )}
    >
      {children}
    </button>
  );
}

export function EditorToolbar({ editor }: Props) {
  const can = (action: () => boolean) => { try { return action(); } catch { return false; } };

  return (
    <div
      data-testid="editor-toolbar"
      className="sticky top-0 z-20 flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-border bg-card/95 backdrop-blur"
    >
      <Btn
        testId="tb-bold"
        label="Bold (Ctrl/Cmd+B)"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      ><Bold className="h-4 w-4" /></Btn>
      <Btn
        testId="tb-italic"
        label="Italic (Ctrl/Cmd+I)"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      ><Italic className="h-4 w-4" /></Btn>
      <Btn
        testId="tb-underline"
        label="Underline (Ctrl/Cmd+U)"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      ><Underline className="h-4 w-4" /></Btn>
      <Btn
        testId="tb-strike"
        label="Strikethrough"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      ><Strikethrough className="h-4 w-4" /></Btn>

      <div className="w-px h-5 bg-border mx-1" />

      <Btn
        testId="tb-h1"
        label="Heading 1"
        active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      ><Heading1 className="h-4 w-4" /></Btn>
      <Btn
        testId="tb-h2"
        label="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      ><Heading2 className="h-4 w-4" /></Btn>

      <div className="w-px h-5 bg-border mx-1" />

      <Btn
        testId="tb-bullet-list"
        label="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      ><List className="h-4 w-4" /></Btn>
      <Btn
        testId="tb-ordered-list"
        label="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      ><ListOrdered className="h-4 w-4" /></Btn>
      <Btn
        testId="tb-blockquote"
        label="Blockquote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      ><Quote className="h-4 w-4" /></Btn>
      <Btn
        testId="tb-code"
        label="Inline code"
        active={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
      ><Code className="h-4 w-4" /></Btn>
      <Btn
        testId="tb-code-block"
        label="Code block"
        active={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      ><Code2 className="h-4 w-4" /></Btn>
      <Btn
        testId="tb-hr"
        label="Horizontal rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      ><Minus className="h-4 w-4" /></Btn>

      <div className="w-px h-5 bg-border mx-1" />

      <Btn
        testId="tb-undo"
        label="Undo (Ctrl/Cmd+Z)"
        disabled={!can(() => editor.can().chain().focus().undo().run())}
        onClick={() => editor.chain().focus().undo().run()}
      ><Undo2 className="h-4 w-4" /></Btn>
      <Btn
        testId="tb-redo"
        label="Redo (Ctrl/Cmd+Shift+Z)"
        disabled={!can(() => editor.can().chain().focus().redo().run())}
        onClick={() => editor.chain().focus().redo().run()}
      ><Redo2 className="h-4 w-4" /></Btn>
    </div>
  );
}

// kept for non-button usages; not used.
export { Button };
