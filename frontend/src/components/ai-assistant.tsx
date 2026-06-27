"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ScanText, SpellCheck2 } from "lucide-react";
import { toast } from "sonner";
import * as Y from "yjs";

export function AIAssistant({ doc, canEdit }: { doc: Y.Doc | null; canEdit: boolean }) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<"summarize" | "grammar" | null>(null);

  const run = async (action: "summarize" | "grammar") => {
    if (!doc) return;
    const text = doc.getText("content").toString().trim();
    if (text.length === 0) {
      toast.message("Nothing to analyze yet — start writing first.");
      return;
    }
    setLoading(action);
    setResult(null);
    try {
      const r = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, text: text.slice(0, 20_000) }),
      });
      if (!r.ok) throw new Error((await r.json().catch(() => ({})))?.error ?? r.statusText);
      const j = await r.json();
      setResult(j.result || "");
    } catch (e) {
      toast.error("AI request failed", { description: String((e as Error).message || e) });
    } finally {
      setLoading(null);
    }
  };

  const applyToDoc = () => {
    if (!doc || !result) return;
    const ytext = doc.getText("content");
    doc.transact(() => {
      const cur = ytext.toString();
      if (cur.length > 0) ytext.delete(0, cur.length);
      ytext.insert(0, result);
    }, "local");
    toast.success("Replaced document with AI output");
    setOpen(false);
  };

  return (
    <div className="relative">
      <Button size="sm" onClick={() => setOpen((v) => !v)} data-testid="ai-toggle">
        <Sparkles className="h-4 w-4" /> AI Assistant
      </Button>
      {open && (
        <div
          data-testid="ai-panel"
          className="absolute right-0 mt-2 w-[380px] z-30 paper-card rounded-lg p-4 animate-fade-up"
        >
          <p className="text-sm font-display mb-3">Smart AI Assistant</p>
          <div className="flex gap-2 mb-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => run("summarize")}
              disabled={loading !== null}
              data-testid="ai-summarize-btn"
            >
              <ScanText className="h-4 w-4" /> {loading === "summarize" ? "Summarizing…" : "Summarize"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => run("grammar")}
              disabled={loading !== null}
              data-testid="ai-grammar-btn"
            >
              <SpellCheck2 className="h-4 w-4" /> {loading === "grammar" ? "Fixing…" : "Fix grammar"}
            </Button>
          </div>
          {result !== null && (
            <div className="space-y-3" data-testid="ai-result-container">
              <div className="max-h-56 overflow-y-auto rounded-md border border-border/70 bg-background p-3 text-sm whitespace-pre-wrap" data-testid="ai-result-text">
                {result}
              </div>
              {canEdit && (
                <Button size="sm" onClick={applyToDoc} data-testid="ai-apply-btn">
                  Replace document with this
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
