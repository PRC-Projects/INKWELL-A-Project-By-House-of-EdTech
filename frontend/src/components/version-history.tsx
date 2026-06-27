"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { History, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import * as Y from "yjs";
import { base64ToBytes } from "@/lib/yjs-client";

interface Snapshot {
  id: string;
  label: string;
  createdAt: string;
  createdBy: { email: string; name: string | null };
}

export function VersionHistory({
  documentId,
  doc,
  canEdit,
}: {
  documentId: string;
  doc: Y.Doc | null;
  canEdit: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Snapshot[]>([]);
  const [label, setLabel] = useState("");
  const [creating, setCreating] = useState(false);

  const load = async () => {
    const r = await fetch(`/api/documents/${documentId}/snapshots`);
    if (!r.ok) return;
    const j = await r.json();
    setItems(j.snapshots);
  };

  useEffect(() => {
    if (open) void load();
  }, [open, documentId]); // eslint-disable-line react-hooks/exhaustive-deps

  const createSnapshot = async () => {
    if (!label.trim()) return;
    setCreating(true);
    try {
      const r = await fetch(`/api/documents/${documentId}/snapshots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: label.trim() }),
      });
      if (!r.ok) throw new Error(await r.text());
      setLabel("");
      toast.success("Snapshot saved");
      await load();
    } catch (e) {
      toast.error("Could not save snapshot", { description: String(e) });
    } finally {
      setCreating(false);
    }
  };

  const restore = async (id: string) => {
    if (!doc) return;
    if (!confirm("Restore this version? Your current text will be replaced by the snapshot's text; offline edits remain in your history.")) return;
    const r = await fetch(`/api/documents/${documentId}/snapshots/${id}/restore`, { method: "POST" });
    if (!r.ok) {
      toast.error("Restore failed");
      return;
    }
    const j = await r.json();
    if (j?.serverUpdate) {
      const bytes = base64ToBytes(j.serverUpdate);
      Y.applyUpdate(doc, bytes, "remote");
    }
    toast.success("Version restored");
  };

  return (
    <div>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setOpen((v) => !v)}
        data-testid="version-history-toggle"
      >
        <History className="h-4 w-4" /> History
      </Button>
      {open && (
        <div
          data-testid="version-history-panel"
          className="absolute right-0 mt-2 w-[360px] z-30 paper-card rounded-lg p-4 animate-fade-up"
        >
          <p className="text-sm font-display mb-3">Version timeline</p>
          {canEdit && (
            <div className="flex gap-2 mb-3">
              <Input
                value={label}
                placeholder="Snapshot label (e.g. 'pre-AI rewrite')"
                onChange={(e) => setLabel(e.target.value)}
                data-testid="snapshot-label-input"
              />
              <Button onClick={createSnapshot} disabled={creating || !label.trim()} size="sm" data-testid="snapshot-save-btn">
                Save
              </Button>
            </div>
          )}
          <div className="max-h-72 overflow-y-auto space-y-2" data-testid="snapshot-list">
            {items.length === 0 && (
              <p className="text-xs text-muted-foreground italic">No snapshots yet. Save one to create a recoverable checkpoint.</p>
            )}
            {items.map((s) => (
              <div
                key={s.id}
                data-testid={`snapshot-row-${s.id}`}
                className="flex items-center justify-between rounded-md border border-border/60 p-2.5 hover:bg-secondary/40"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate" data-testid={`snapshot-label-${s.id}`}>{s.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(s.createdAt).toLocaleString()} · {s.createdBy.name ?? s.createdBy.email}
                  </p>
                </div>
                {canEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => restore(s.id)}
                    data-testid={`snapshot-restore-${s.id}`}
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Restore
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
