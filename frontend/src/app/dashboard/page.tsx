"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Plus, FileText, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { InkwellMark } from "@/components/inkwell-mark";

interface Doc {
  id: string; title: string; updatedAt: string;
  role: "OWNER" | "EDITOR" | "VIEWER";
  owner: { email: string; name: string | null };
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [docs, setDocs] = useState<Doc[]>([]);

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

  const deleteDoc = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const r = await fetch(`/api/documents/${id}`, { method: "DELETE" });
    if (!r.ok) {
      const j = await r.json().catch(() => ({}));
      toast.error("Could not delete", { description: j?.error ?? r.statusText });
      return;
    }
    toast.success(`"${title}" deleted`);
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  if (status !== "authenticated") {
    return <div className="container mx-auto px-6 py-16 text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <InkwellMark />
          <div className="hidden md:block h-10 w-px bg-border" />
          <div className="hidden md:block">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-1">Dashboard</p>
            <h1 className="font-display text-2xl" data-testid="dashboard-title">Welcome back, {session.user?.name || session.user?.email}</h1>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: "/" })} data-testid="dashboard-signout">
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </div>
      <h1 className="font-display text-2xl mb-6 md:hidden" data-testid="dashboard-title-mobile">Welcome back, {session.user?.name || session.user?.email}</h1>

      <Card className="mb-8">
        <CardHeader><CardTitle>New document</CardTitle></CardHeader>
        <CardContent>
          {/* Plain form POST to a Route Handler — works without hydration.
              The handler creates the doc and 303-redirects to /documents/{id}. */}
          <form className="flex gap-2" method="POST" action="/api/documents/new">
            <Input name="title" placeholder="Untitled draft" data-testid="new-doc-title" required />
            <Button type="submit" data-testid="new-doc-submit">
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
          <Card key={d.id} className="hover:shadow-md transition-shadow group relative" data-testid={`doc-card-${d.id}`}>
            <CardContent className="pt-5">
              <Link href={`/documents/${d.id}`} className="block">
                <div className="flex items-start gap-3 pr-7">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div className="min-w-0">
                    <p className="font-display text-base truncate" data-testid={`doc-title-${d.id}`}>{d.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="uppercase tracking-wide" data-testid={`doc-role-${d.id}`}>{d.role}</span> · {new Date(d.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
              {d.role === "OWNER" && (
                <button
                  type="button"
                  data-testid={`doc-delete-${d.id}`}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); void deleteDoc(d.id, d.title); }}
                  className="absolute top-3 right-3 h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Delete ${d.title}`}
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
