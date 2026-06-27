import Link from "next/link";
import { cookies, headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

/**
 * Server Component. We read the __Host-authjs.csrf-token cookie that the
 * /login Route Handler just set, split off the token (cookie value is
 * `${token}|${HMAC}`), and embed it directly in the form. No client-side
 * fetch race, no disabled gate.
 */
export const dynamic = "force-dynamic";

export default async function LoginFormPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const h = await headers();
  const c = await cookies();
  const proto = h.get("x-forwarded-proto") || "https";
  const cookieName = proto === "https" ? "__Host-authjs.csrf-token" : "authjs.csrf-token";
  const cookieVal = c.get(cookieName)?.value || "";
  const csrfToken = cookieVal.split("|")[0] || "";

  return (
    <div className="container mx-auto px-6 py-16 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle data-testid="login-title">Sign in</CardTitle>
          <CardDescription>Use your Inkwell credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" method="POST" action="/api/auth/callback/credentials">
            <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
            <input type="hidden" name="callbackUrl" defaultValue="/dashboard" />
            <Input type="email" name="email" placeholder="you@email.com" required data-testid="login-email" />
            <Input type="password" name="password" placeholder="Password" required data-testid="login-password" />
            {sp?.error && (
              <p className="text-sm text-destructive" data-testid="login-error">
                Sign-in failed. Check your email and password.
              </p>
            )}
            <Button type="submit" className="w-full" data-testid="login-submit">Sign in</Button>
            <p className="text-sm text-muted-foreground text-center">
              No account?{" "}
              <Link href="/register" className="text-primary underline-offset-4 hover:underline" data-testid="login-to-register">
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
