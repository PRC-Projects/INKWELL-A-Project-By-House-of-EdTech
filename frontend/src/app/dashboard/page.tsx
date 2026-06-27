"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Plus, FileText } from "lucide-react";
import { toast } from "sonner";

interface Doc {
  id: string; title: string; updatedAt: string;
  role: "OWNER" | "EDITOR" | "VIEWER";
  owner: { email: string; name: string | null };
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  const load = async () => {
    const r = await fetch("/api/documents", { cache: "no-store" });
    if (!r.ok) return;
    const j = await r.json();
    setDocs(j.documents);
  };
  useEffect(() => { if (status === "authenticated") void load(); }, [status]);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    try {
      const r = await fetch("/api/documents", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() }),
      });
      if (!r.ok) {
        toast.error("Could not create document");
        return;
      }
      const j = await r.json();
      router.push(`/documents/${j.document.id}`);
    } finally { setBusy(false); }
  };

  if (status !== "authenticated") {
    return <div className="container mx-auto px-6 py-16 text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-1">Inkwell</p>
          <h1 className="font-display text-3xl" data-testid="dashboard-title">Welcome back, {session.user?.name || session.user?.email}</h1>
        </div>
        <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: "/" })} data-testid="dashboard-signout">
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader><CardTitle>New document</CardTitle></CardHeader>
        <CardContent>
          <form className="flex gap-2" onSubmit={create}>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Untitled draft" data-testid="new-doc-title" />
            <Button type="submit" disabled={busy || !title.trim()} data-testid="new-doc-submit">
              <Plus className="h-4 w-4" /> Create
            </Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="font-display text-xl mb-3" data-testid="docs-list-heading">Your documents</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="docs-grid">
        {docs.length === 0 && (
          <p className="text-sm text-muted-foreground italic" data-testid="docs-empty">No documents yet. Create your first above.</p>
        )}
        {docs.map((d) => (
          <Link key={d.id} href={`/documents/${d.id}`} data-testid={`doc-card-${d.id}`}>
            <Card className="hover:translate-y-[-1px] transition-transform">
              <CardContent className="pt-5">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div className="min-w-0">
                    <p className="font-display text-base truncate" data-testid={`doc-title-${d.id}`}>{d.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="uppercase tracking-wide" data-testid={`doc-role-${d.id}`}>{d.role}</span> · {new Date(d.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
