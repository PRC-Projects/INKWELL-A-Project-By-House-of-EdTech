"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setBusy(false);
    if (res?.error) toast.error("Sign-in failed", { description: "Check your email and password." });
    else { toast.success("Welcome back"); router.push("/dashboard"); router.refresh(); }
  };
  return (
    <div className="container mx-auto px-6 py-16 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle data-testid="login-title">Sign in</CardTitle>
          <CardDescription>Use your Inkwell credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <Input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required data-testid="login-email" />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required data-testid="login-password" />
            <Button type="submit" className="w-full" disabled={busy} data-testid="login-submit">{busy ? "Signing in…" : "Sign in"}</Button>
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
