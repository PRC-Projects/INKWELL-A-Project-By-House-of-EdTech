"use client";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LoginPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // First fetch CSRF — this sets the __Host-authjs.csrf-token cookie on the
    // browser. Then read the token from the JSON body, inject into the hidden
    // input, and submit natively so the browser follows the 302 redirect.
    const r = await fetch("/api/auth/csrf", { credentials: "include", cache: "no-store" });
    const j = await r.json();
    const form = formRef.current!;
    (form.elements.namedItem("csrfToken") as HTMLInputElement).value = j.csrfToken;
    form.submit();
  };
  return (
    <div className="container mx-auto px-6 py-16 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle data-testid="login-title">Sign in</CardTitle>
          <CardDescription>Use your Inkwell credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            ref={formRef}
            className="space-y-4"
            method="POST"
            action="/api/auth/callback/credentials"
            onSubmit={onSubmit}
          >
            <input type="hidden" name="csrfToken" value="" />
            <input type="hidden" name="callbackUrl" value="/dashboard" />
            <Input type="email" name="email" placeholder="you@email.com" required data-testid="login-email" />
            <Input type="password" name="password" placeholder="Password" required data-testid="login-password" />
            <Button type="submit" className="w-full" data-testid="login-submit">Sign in</Button>
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
