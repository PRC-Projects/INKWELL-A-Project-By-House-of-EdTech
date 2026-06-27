"""
FastAPI sidecar — minimal companion service to the Next.js app.

Why this exists:
  - The K8s ingress in this environment routes ALL `/api/*` traffic to
    port 8001. Next.js's app-router API routes live on port 3000.
  - So we use this FastAPI process as a transparent reverse proxy for
    `/api/*` → `http://localhost:3000/api/*` (preserving method, headers,
    body, cookies).
  - We ALSO own one internal route — `/__internal/ai` — which is called by
    Next.js server-side. It uses the Emergent universal LLM key via the
    Python-only `emergentintegrations` library to talk to Gemini.

Production note:
  In a real deployment, the Next.js app would be served behind nginx that
  routes /api directly into Next.js — no proxy hop needed. The AI sidecar
  would still be its own service, but Next.js would call it over a
  service-mesh URL. The code split between Next.js and this sidecar is
  what matters; the proxy hop is a preview-environment quirk.
"""
import os
import subprocess
import time
from typing import Any

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, Request, Response, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

load_dotenv()

NEXT_ORIGIN = os.environ.get("NEXT_ORIGIN", "http://localhost:3000")
EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY", "")


def _ensure_postgres_running() -> None:
    """Best-effort: bring up the local Postgres cluster if it isn't running.

    Supervisor in this container is read-only so we can't add a dedicated
    program for Postgres. We instead start it on import here, idempotently.
    """
    try:
        out = subprocess.run(
            ["pg_isready", "-h", "localhost", "-p", "5432"],
            capture_output=True, text=True, timeout=5,
        )
        if out.returncode == 0:
            return
    except Exception:
        pass
    try:
        subprocess.run(
            ["su", "-", "postgres", "-c",
             "/usr/lib/postgresql/15/bin/pg_ctl -D /etc/postgresql/15/main -l /tmp/pglog start"],
            check=False, capture_output=True, text=True, timeout=20,
        )
        # give it a moment to accept connections
        for _ in range(10):
            r = subprocess.run(["pg_isready", "-h", "localhost", "-p", "5432"], capture_output=True)
            if r.returncode == 0:
                return
            time.sleep(0.5)
    except Exception:
        pass


_ensure_postgres_running()

app = FastAPI(title="Inkwell sidecar")

# Single shared client (keepalive helps for short proxy hops).
_client = httpx.AsyncClient(timeout=120.0, follow_redirects=False)


class AIRequest(BaseModel):
    action: str = Field(pattern=r"^(summarize|grammar)$")
    text: str = Field(min_length=1, max_length=20_000)


@app.post("/__internal/ai")
async def internal_ai(payload: AIRequest) -> dict[str, Any]:
    """Called server-side by Next.js /api/ai. Not exposed externally."""
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="EMERGENT_LLM_KEY not configured")

    # Local import keeps cold-start of proxy fast even if integrations lib is heavy.
    from emergentintegrations.llm.chat import LlmChat, UserMessage

    system = (
        "You are a precise editorial assistant. Reply with the requested transformation only — "
        "no preamble, no markdown headings, no commentary."
    )
    if payload.action == "summarize":
        prompt = (
            "Summarize the following document in 3-6 sentences. Preserve key facts and tone.\n\n"
            f"---\n{payload.text}\n---"
        )
    else:  # grammar
        prompt = (
            "Rewrite the following passage with grammar, punctuation, and clarity corrected. "
            "Preserve voice, paragraph structure, and meaning. Output the corrected text only.\n\n"
            f"---\n{payload.text}\n---"
        )

    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=f"inkwell-{payload.action}",
        system_message=system,
    ).with_model("gemini", "gemini-3-flash-preview")

    parts: list[str] = []
    try:
        # Streaming is the default per playbook; we collect into a single response
        # because the Next.js /api/ai contract is JSON, not SSE.
        from emergentintegrations.llm.chat import TextDelta, StreamDone

        async for ev in chat.stream_message(UserMessage(text=prompt)):
            if isinstance(ev, TextDelta):
                parts.append(ev.content)
            elif isinstance(ev, StreamDone):
                break
    except Exception as exc:  # pragma: no cover
        raise HTTPException(status_code=502, detail=f"LLM error: {exc}") from exc

    return {"result": "".join(parts).strip(), "action": payload.action}


# ----------------- Reverse proxy for /api/* -> Next.js -----------------

_HOP_BY_HOP = {
    "connection", "keep-alive", "proxy-authenticate", "proxy-authorization",
    "te", "trailers", "transfer-encoding", "upgrade", "content-encoding", "content-length",
}


@app.api_route("/api/{path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"])
async def proxy(path: str, request: Request) -> Response:
    target = f"{NEXT_ORIGIN}/api/{path}"
    if request.url.query:
        target = f"{target}?{request.url.query}"

    headers = {k: v for k, v in request.headers.items() if k.lower() not in _HOP_BY_HOP and k.lower() != "host"}
    body = await request.body()

    try:
        upstream = await _client.request(
            method=request.method,
            url=target,
            headers=headers,
            content=body,
        )
    except httpx.ConnectError:
        raise HTTPException(status_code=502, detail="Next.js dev server not ready") from None

    resp_headers = {k: v for k, v in upstream.headers.items() if k.lower() not in _HOP_BY_HOP}
    return Response(content=upstream.content, status_code=upstream.status_code, headers=resp_headers)


@app.get("/__internal/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
