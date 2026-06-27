import { NextResponse } from "next/server";
import { headers } from "next/headers";

/**
 * GET /login → this Route Handler.
 *
 * It calls /api/auth/csrf server-to-server, captures every Set-Cookie header
 * (notably __Host-authjs.csrf-token), then 302-redirects to /login-form with
 * those cookies attached. By the time the browser renders the form, the
 * NextAuth CSRF cookie is already seeded — no client-side fetch race.
 */
export async function GET() {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") || "https";
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  const origin = `${proto}://${host}`;

  const r = await fetch(`${origin}/api/auth/csrf`, { cache: "no-store" });

  const res = NextResponse.redirect(new URL("/login-form", origin), 302);
  // Forward every Set-Cookie from NextAuth so the browser stores the csrf cookie.
  const set = r.headers.getSetCookie?.() || [];
  for (const c of set) res.headers.append("set-cookie", c);
  return res;
}
