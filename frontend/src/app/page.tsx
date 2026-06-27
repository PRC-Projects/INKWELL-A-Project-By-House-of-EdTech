import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { CloudOff, GitBranch, ShieldCheck, Sparkles } from "lucide-react";

export default async function Home() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");
  return (
    <div className="container mx-auto px-6 py-16 lg:py-24">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4" data-testid="home-eyebrow">
          Inkwell · v0.1
        </p>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-6" data-testid="home-headline">
          A document editor that<br />
          <span className="italic text-primary">never blocks</span> on the network.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-10 font-sans">
          Local-first storage powered by Yjs CRDT and IndexedDB. Edit offline, restore versions safely,
          collaborate with strict roles, and let Gemini help you summarize or polish prose.
        </p>
        <div className="flex flex-wrap gap-3" data-testid="home-cta-row">
          <Button asChild size="lg" data-testid="home-cta-signup">
            <Link href="/register">Create an account</Link>
          </Button>
          <Button asChild size="lg" variant="outline" data-testid="home-cta-login">
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-20 max-w-5xl">
        <Feature icon={<CloudOff className="h-5 w-5" />} title="Offline-first" body="Edits land in IndexedDB instantly. Network failures are invisible to the user." />
        <Feature icon={<GitBranch className="h-5 w-5" />} title="CRDT merge" body="Yjs guarantees concurrent edits converge without overwrites." />
        <Feature icon={<ShieldCheck className="h-5 w-5" />} title="RBAC" body="Owner / Editor / Viewer roles enforced in middleware and Prisma queries." />
        <Feature icon={<Sparkles className="h-5 w-5" />} title="Gemini AI" body="Summarize or fix grammar with the Smart AI Assistant." />
      </div>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="paper-card rounded-lg p-5 animate-fade-up">
      <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-3">{icon}</div>
      <p className="font-display text-base mb-1">{title}</p>
      <p className="text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
