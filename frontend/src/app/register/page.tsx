"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [csrf, setCsrf] = useState("");

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/auth/csrf");
      const j = await r.json();
      setCsrf(j.csrfToken);
    })();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const r = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name: name || undefined }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        toast.error("Registration failed", { description: j?.error ?? r.statusText });
        setBusy(false);
        return;
      }
      // Submit a real form POST to NextAuth credentials callback so the
      // browser follows the 302 and accepts the session cookie reliably.
      const fd = new FormData();
      fd.set("email", email);
      fd.set("password", password);
      fd.set("csrfToken", csrf);
      fd.set("callbackUrl", "/dashboard");
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/api/auth/callback/credentials";
      fd.forEach((v, k) => {
        const inp = document.createElement("input");
        inp.type = "hidden";
        inp.name = k;
        inp.value = v.toString();
        form.appendChild(inp);
      });
      document.body.appendChild(form);
      form.submit();
    } catch {
      setBusy(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-16 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle data-testid="register-title">Create your account</CardTitle>
          <CardDescription>Get started in seconds — no email confirmation required.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <Input placeholder="Your name (optional)" value={name} onChange={(e) => setName(e.target.value)} data-testid="register-name" />
            <Input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required data-testid="register-email" />
            <Input type="password" placeholder="Password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} data-testid="register-password" />
            <Button type="submit" className="w-full" disabled={busy} data-testid="register-submit">{busy ? "Creating…" : "Create account"}</Button>
            <p className="text-sm text-muted-foreground text-center">
              Have an account?{" "}
              <Link href="/login" className="text-primary underline-offset-4 hover:underline" data-testid="register-to-login">Sign in</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
