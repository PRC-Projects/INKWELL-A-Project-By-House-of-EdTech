"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

interface DiffPayload {
  snapshot: { label: string; createdAt: string; text: string };
  current: { title: string; text: string };
}

/** Computes a line-level diff (LCS-free greedy) suitable for short documents. */
function diffLines(a: string, b: string): { type: "same" | "add" | "del"; text: string }[] {
  const A = a.split("\n");
  const B = b.split("\n");
  const out: { type: "same" | "add" | "del"; text: string }[] = [];
  let i = 0, j = 0;
  while (i < A.length || j < B.length) {
    if (i < A.length && j < B.length && A[i] === B[j]) {
      out.push({ type: "same", text: A[i] }); i++; j++;
    } else if (j < B.length && !A.includes(B[j], i)) {
      out.push({ type: "add", text: B[j] }); j++;
    } else if (i < A.length) {
      out.push({ type: "del", text: A[i] }); i++;
    } else {
      out.push({ type: "add", text: B[j] }); j++;
    }
  }
  return out;
}

export function SnapshotDiff({
  documentId,
  snapshotId,
  onClose,
}: {
  documentId: string;
  snapshotId: string;
  onClose: () => void;
}) {
  const [data, setData] = useState<DiffPayload | null>(null);
  useEffect(() => {
    fetch(`/api/documents/${documentId}/snapshots/${snapshotId}`)
      .then((r) => r.json())
      .then(setData);
  }, [documentId, snapshotId]);

  if (!data) return null;
  const diff = diffLines(data.snapshot.text, data.current.text);

  const downloadMd = () => {
    const md = `# ${data.current.title}\n\n_Diff vs. snapshot "${data.snapshot.label}" (${new Date(data.snapshot.createdAt).toLocaleString()})_\n\n` +
      diff.map((d) => (d.type === "add" ? `+ ${d.text}` : d.type === "del" ? `- ${d.text}` : `  ${d.text}`)).join("\n");
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${data.current.title}-diff.md`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div data-testid="snapshot-diff-modal" className="fixed inset-0 z-40 bg-foreground/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="paper-card rounded-lg max-w-3xl w-full max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Diff vs snapshot</p>
            <p className="font-display text-lg" data-testid="snapshot-diff-label">{data.snapshot.label}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={downloadMd} data-testid="snapshot-diff-export"><Download className="h-4 w-4" /> Markdown</Button>
            <Button variant="ghost" size="icon" onClick={onClose} data-testid="snapshot-diff-close"><X className="h-4 w-4" /></Button>
          </div>
        </div>
        <div className="overflow-y-auto p-4 font-mono text-xs" data-testid="snapshot-diff-body">
          {diff.map((d, i) => (
            <div
              key={i}
              data-testid={`diff-line-${d.type}`}
              className={
                d.type === "add" ? "bg-emerald-500/15 text-emerald-700 px-2 rounded"
                : d.type === "del" ? "bg-red-500/10 text-red-700 px-2 rounded line-through"
                : "px-2 text-muted-foreground"
              }
            >
              <span className="inline-block w-4">{d.type === "add" ? "+" : d.type === "del" ? "−" : " "}</span>
              {d.text || "\u00A0"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
