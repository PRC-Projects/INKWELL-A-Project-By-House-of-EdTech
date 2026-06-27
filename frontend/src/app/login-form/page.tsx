"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// The /login route handler seeded the __Host-authjs.csrf-token cookie before
// redirecting here. We still fetch /api/auth/csrf once to read the token value
// (cookie is HttpOnly so the browser can't see it) and embed it in the form.
export default function LoginFormPage() {
  const [csrf, setCsrf] = useState("");
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/auth/csrf", { credentials: "include", cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setCsrf(j.csrfToken))
      .catch(() => setErr("Could not initialize sign-in. Refresh the page."));
    const u = new URL(window.location.href);
    if (u.searchParams.get("error")) setErr("Sign-in failed. Check your email and password.");
  }, []);
  return (
    <div className="container mx-auto px-6 py-16 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle data-testid="login-title">Sign in</CardTitle>
          <CardDescription>Use your Inkwell credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" method="POST" action="/api/auth/callback/credentials">
            <input type="hidden" name="csrfToken" value={csrf} />
            <input type="hidden" name="callbackUrl" value="/dashboard" />
            <Input type="email" name="email" placeholder="you@email.com" required data-testid="login-email" />
            <Input type="password" name="password" placeholder="Password" required data-testid="login-password" />
            {err && <p className="text-sm text-destructive" data-testid="login-error">{err}</p>}
            <Button type="submit" className="w-full" disabled={!csrf} data-testid="login-submit">
              {csrf ? "Sign in" : "Preparing…"}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              No account?{" "}
              <Link href="/register" className="text-primary underline-offset-4 hover:underline" data-testid="login-to-register">Register</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
