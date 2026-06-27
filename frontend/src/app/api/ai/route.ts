import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { aiSchema } from "@/lib/validators";

/**
 * The AI endpoint proxies to a small Python sidecar that uses the
 * Emergent universal LLM key (the integration library is Python-only).
 * We DO NOT trust the client text length here — Zod caps at 20k chars and
 * we re-cap before forwarding.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  const parsed = aiSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input", issues: parsed.error.flatten() }, { status: 400 });

  const sidecar = process.env.AI_SIDECAR_URL || "http://localhost:8001";
  try {
    const r = await fetch(`${sidecar}/__internal/ai`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    if (!r.ok) {
      const txt = await r.text();
      return NextResponse.json({ error: "AI service failed", detail: txt }, { status: 502 });
    }
    const data = await r.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "AI service unavailable", detail: String(e) }, { status: 503 });
  }
}
