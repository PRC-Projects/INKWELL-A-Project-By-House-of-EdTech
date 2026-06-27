import Link from "next/link";
import { headers, cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

/**
 * Server-rendered login form. We fetch the CSRF token here so it is already
 * embedded in the HTML by the time the form is interactive. This avoids a
 * client-side fetch race that broke under the reverse-proxy in this preview.
 */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const h = await headers();
  const c = await cookies();
  const sp = await searchParams;
  const proto = h.get("x-forwarded-proto") || "http";
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  const origin = `${proto}://${host}`;
  const cookieHeader = c.getAll().map((x) => `${x.name}=${x.value}`).join("; ");

  let csrfToken = "";
  try {
    const r = await fetch(`${origin}/api/auth/csrf`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });
    if (r.ok) csrfToken = (await r.json()).csrfToken ?? "";
    // Propagate the csrf cookie set by /api/auth/csrf back to the browser.
    const setCookies = r.headers.getSetCookie?.() || [];
    if (setCookies.length > 0) {
      // We cannot set cookies on a server component response directly without
      // route handlers. Instead, we render a hidden script that triggers
      // /api/auth/csrf from the browser side as a fallback to seed the cookie.
    }
  } catch {
    /* ignore — error UI will trigger after submit */
  }

  return (
    <div className="container mx-auto px-6 py-16 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle data-testid="login-title">Sign in</CardTitle>
          <CardDescription>Use your Inkwell credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Fallback: ensure browser hits /api/auth/csrf so the csrf cookie
              is set before the form is submitted. */}
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `fetch('/api/auth/csrf').catch(()=>{});`,
            }}
          />
          <form className="space-y-4" method="POST" action="/api/auth/callback/credentials">
            <input type="hidden" name="csrfToken" value={csrfToken} />
            <input type="hidden" name="callbackUrl" value="/dashboard" />
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
              <Link href="/register" className="text-primary underline-offset-4 hover:underline" data-testid="login-to-register">Register</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
