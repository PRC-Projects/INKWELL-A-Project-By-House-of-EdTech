import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { aiSchema } from "@/lib/validators";
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * AI route — calls Google Gemini directly with the user's free-tier key.
 * No Python sidecar in this path.
 */
const MODEL = "gemini-2.5-flash";
const FALLBACK_MODEL = "gemini-2.5-flash-lite";

function buildPrompt(parsed: ReturnType<typeof aiSchema.parse>): { system: string; prompt: string } {
  const system =
    "You are a precise editorial assistant. Reply with the requested transformation only — no preamble, no markdown headings, no commentary.";
  if (parsed.action === "summarize") {
    return {
      system,
      prompt:
        "Summarize the following document in 3-6 sentences. Preserve key facts and tone.\n\n---\n" +
        parsed.text +
        "\n---",
    };
  }
  if (parsed.action === "grammar") {
    return {
      system,
      prompt:
        "Rewrite the following passage with grammar, punctuation, and clarity corrected. Preserve voice, paragraph structure, and meaning. Output the corrected text only.\n\n---\n" +
        parsed.text +
        "\n---",
    };
  }
  // explain-diff
  return {
    system,
    prompt:
      "Two versions of a document are below. In 2-3 plain sentences, explain what changed between BEFORE and AFTER (additions, deletions, tone/structure shifts). Be specific and editorial — do NOT enumerate every line.\n\n=== BEFORE ===\n" +
      parsed.before +
      "\n\n=== AFTER ===\n" +
      parsed.after +
      "\n",
  };
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GEMINI_API_KEY is not configured" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = aiSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", issues: parsed.error.flatten() }, { status: 400 });
  }

  const { system, prompt } = buildPrompt(parsed.data);

  try {
    const genai = new GoogleGenerativeAI(apiKey);
    const callModel = async (modelName: string) => {
      const model = genai.getGenerativeModel({ model: modelName, systemInstruction: system });
      const result = await model.generateContent(prompt);
      return result.response.text().trim();
    };
    let text: string;
    let used = MODEL;
    try {
      text = await callModel(MODEL);
    } catch (e) {
      const msg = (e as Error).message || "";
      // If the primary model is rate-limited or unavailable, fall back automatically.
      if (/quota|429|503|exhausted|unavailable/i.test(msg)) {
        used = FALLBACK_MODEL;
        text = await callModel(FALLBACK_MODEL);
      } else {
        throw e;
      }
    }
    return NextResponse.json({ result: text, action: parsed.data.action, model: used });
  } catch (e) {
    const msg = (e as Error).message || String(e);
    return NextResponse.json({ error: "Gemini call failed", detail: msg }, { status: 502 });
  }
}
