"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/editor";
import { SyncStatus } from "@/components/sync-status";
import { VersionHistory } from "@/components/version-history";
import { AIAssistant } from "@/components/ai-assistant";
import { ShareDialog } from "@/components/share-dialog";
import { InkwellMark } from "@/components/inkwell-mark";
import { useYDoc } from "@/lib/yjs-client";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface DocPayload {
  id: string;
  title: string;
  state: string;
  role: "OWNER" | "EDITOR" | "VIEWER";
  isOwner: boolean;
  owner: { id: string; email: string; name: string | null };
  memberships: { id: string; role: "OWNER" | "EDITOR" | "VIEWER"; user: { id: string; email: string; name: string | null } }[];
}

export default function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { status } = useSession();
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [data, setData] = useState<DocPayload | null>(null);
  const [titleDraft, setTitleDraft] = useState("");

  useEffect(() => { params.then((p) => setId(p.id)); }, [params]);
  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  const load = async (docId: string) => {
    const r = await fetch(`/api/documents/${docId}`, { cache: "no-store" });
    if (r.status === 404) { router.replace("/dashboard"); return; }
    if (!r.ok) { toast.error("Could not load document"); return; }
    const j = await r.json();
    setData(j.document);
    setTitleDraft(j.document.title);
  };
  useEffect(() => { if (id && status === "authenticated") void load(id); }, [id, status]);

  // Pull the same Y.Doc handle the Editor will use so siblings (AI, history) can read it.
  const { doc, presence, wsConnected } = useYDoc(id ?? "");

  const saveTitle = async () => {
    if (!data || !id || titleDraft === data.title) return;
    const r = await fetch(`/api/documents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: titleDraft }),
    });
    if (r.ok) setData({ ...data, title: titleDraft });
  };

  if (status !== "authenticated" || !id) {
    return <div className="container mx-auto px-6 py-16 text-muted-foreground">Loading…</div>;
  }
  if (!data) {
    return <div className="container mx-auto px-6 py-16 text-muted-foreground" data-testid="doc-loading">Loading document…</div>;
  }

  const canEdit = data.role === "OWNER" || data.role === "EDITOR";

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <Button asChild variant="ghost" size="sm" data-testid="back-to-dashboard">
            <Link href="/dashboard"><ArrowLeft className="h-4 w-4" /> Back</Link>
          </Button>
          <InkwellMark className="hidden md:flex" />
          <div className="hidden md:block h-6 w-px bg-border" />
          <input
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            onBlur={saveTitle}
            disabled={!data.isOwner}
            className="bg-transparent font-display text-2xl outline-none border-b border-transparent focus:border-border min-w-0 flex-1"
            data-testid="doc-title-input"
          />
        </div>
        <div className="flex items-center gap-2 relative">
          <span className="text-xs px-2 py-1 rounded-md bg-secondary uppercase tracking-wide" data-testid="doc-role-badge">{data.role}</span>
          <div
            data-testid="presence-indicator"
            data-ws-connected={wsConnected}
            className="text-xs px-2 py-1 rounded-md bg-card border border-border flex items-center gap-1.5"
            title={wsConnected ? `${presence.length + 1} live (incl. you)` : "Presence disconnected"}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${wsConnected ? "bg-emerald-500 animate-pulse-dot" : "bg-zinc-400"}`} />
            <span data-testid="presence-count">{wsConnected ? presence.length + 1 : 0} live</span>
          </div>
          <SyncStatus />
          <AIAssistant doc={doc} canEdit={canEdit} />
          <VersionHistory documentId={id} doc={doc} canEdit={canEdit} />
          <ShareDialog
            documentId={id}
            isOwner={data.isOwner}
            owner={data.owner}
            memberships={data.memberships.filter((m) => m.user.id !== data.owner.id)}
            onChange={() => load(id)}
          />
        </div>
      </div>

      <Editor documentId={id} initialServerState={data.state} canEdit={canEdit} />

      <p className="text-xs text-muted-foreground italic mt-4" data-testid="local-first-hint">
        Edits save to IndexedDB instantly. The background sync engine pushes them to the server when online — concurrent edits merge deterministically via Yjs.
      </p>
    </div>
  );
}
