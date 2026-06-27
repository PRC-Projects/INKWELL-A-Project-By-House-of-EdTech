"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2, UserMinus } from "lucide-react";
import { toast } from "sonner";

interface Member {
  id: string;
  role: "OWNER" | "EDITOR" | "VIEWER";
  user: { id: string; email: string; name: string | null };
}
interface Props {
  documentId: string;
  isOwner: boolean;
  owner: { email: string; name: string | null };
  memberships: Member[];
  onChange: () => void;
}

export function ShareDialog({ documentId, isOwner, owner, memberships, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"EDITOR" | "VIEWER">("EDITOR");
  const [busy, setBusy] = useState(false);

  if (!isOwner) return null;

  const invite = async () => {
    if (!email.trim()) return;
    setBusy(true);
    try {
      const r = await fetch(`/api/documents/${documentId}/permissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), role }),
      });
      if (!r.ok) throw new Error((await r.json().catch(() => ({})))?.error ?? r.statusText);
      toast.success(`Granted ${role.toLowerCase()} access to ${email}`);
      setEmail("");
      onChange();
    } catch (e) {
      toast.error("Could not share", { description: String((e as Error).message || e) });
    } finally {
      setBusy(false);
    }
  };

  const remove = async (userId: string) => {
    const r = await fetch(`/api/documents/${documentId}/permissions?userId=${userId}`, { method: "DELETE" });
    if (r.ok) onChange();
  };

  return (
    <div className="relative">
      <Button size="sm" variant="outline" onClick={() => setOpen((v) => !v)} data-testid="share-toggle">
        <Share2 className="h-4 w-4" /> Share
      </Button>
      {open && (
        <div
          data-testid="share-panel"
          className="absolute right-0 mt-2 w-[400px] z-30 paper-card rounded-lg p-4 animate-fade-up"
        >
          <p className="text-sm font-display mb-3">Manage collaborators</p>
          <div className="flex gap-2 items-center mb-3">
            <Input
              value={email}
              type="email"
              placeholder="collaborator@email.com"
              onChange={(e) => setEmail(e.target.value)}
              data-testid="share-email-input"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "EDITOR" | "VIEWER")}
              data-testid="share-role-select"
              className="h-10 rounded-md border border-input bg-card px-2 text-sm"
            >
              <option value="EDITOR">Editor</option>
              <option value="VIEWER">Viewer</option>
            </select>
            <Button onClick={invite} disabled={busy} size="sm" data-testid="share-invite-btn">Invite</Button>
          </div>
          <div className="space-y-1.5 max-h-56 overflow-y-auto" data-testid="member-list">
            <div className="flex items-center justify-between px-2 py-1.5 rounded border border-border/60 bg-secondary/30">
              <span className="text-sm">{owner.name ?? owner.email}</span>
              <span className="text-xs font-medium uppercase tracking-wide text-primary">Owner</span>
            </div>
            {memberships.map((m) => (
              <div key={m.id} className="flex items-center justify-between px-2 py-1.5 rounded border border-border/60" data-testid={`member-row-${m.user.id}`}>
                <div className="text-sm min-w-0 truncate">{m.user.name ?? m.user.email}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground" data-testid={`member-role-${m.user.id}`}>{m.role}</span>
                  <Button size="icon" variant="ghost" onClick={() => remove(m.user.id)} data-testid={`member-remove-${m.user.id}`}>
                    <UserMinus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
