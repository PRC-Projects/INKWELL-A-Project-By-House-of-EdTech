"use client";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { cn } from "@/lib/utils";

export function SyncStatus() {
  const status = useSelector((s: RootState) => s.sync.status);
  const queueLen = useSelector((s: RootState) => s.sync.queue.length);
  const lastError = useSelector((s: RootState) => s.sync.lastError);
  const lastSyncedAt = useSelector((s: RootState) => s.sync.lastSyncedAt);

  const dotColor =
    status === "online" ? "bg-emerald-500"
    : status === "syncing" ? "bg-amber-500"
    : status === "offline" ? "bg-zinc-400"
    : "bg-red-500";
  const label =
    status === "online" ? "Online"
    : status === "syncing" ? "Syncing"
    : status === "offline" ? "Offline"
    : "Error";

  return (
    <div
      data-testid="sync-status"
      data-status={status}
      className="flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-full border border-border bg-card/80"
      title={lastError || (lastSyncedAt ? `Last synced ${new Date(lastSyncedAt).toLocaleTimeString()}` : "")}
    >
      <span className={cn("h-2 w-2 rounded-full animate-pulse-dot", dotColor)} />
      <span data-testid="sync-status-label" className="font-medium tracking-wide">{label}</span>
      {queueLen > 0 && (
        <span data-testid="sync-queue-count" className="text-muted-foreground">· {queueLen} queued</span>
      )}
    </div>
  );
}
