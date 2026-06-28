"""
FastAPI sidecar — bridges /api/* HTTP traffic to Next.js on :3000 and
/api/hocus WebSocket traffic to the Hocuspocus presence server on :1234.

Hocuspocus is launched as a background Node process at startup (no supervisor
entry available in this read-only environment). The HTTP /api/documents/:id/sync
path on Next.js remains the SINGLE source of truth for persistence — Hocuspocus
is awareness + low-latency relay only and never writes to disk.
"""
from __future__ import annotations

import asyncio
import os
import subprocess
import time
from typing import Any

import httpx
import websockets
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, Response, WebSocket, WebSocketDisconnect
from pydantic import BaseModel, Field

load_dotenv()

NEXT_ORIGIN = os.environ.get("NEXT_ORIGIN", "http://localhost:3000")
EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY", "")
HOCUS_PORT = int(os.environ.get("HOCUS_PORT", "1234"))


def _ensure_postgres_running() -> None:
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
        for _ in range(10):
            r = subprocess.run(["pg_isready", "-h", "localhost", "-p", "5432"], capture_output=True)
            if r.returncode == 0:
                return
            time.sleep(0.5)
    except Exception:
        pass


def _ensure_hocuspocus_running() -> None:
    """Launch the Hocuspocus Node server in background if not already up."""
    try:
        with subprocess.Popen(
            ["nc", "-z", "127.0.0.1", str(HOCUS_PORT)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        ) as p:
            p.wait(timeout=2)
            if p.returncode == 0:
                return
    except Exception:
        pass
    try:
        subprocess.Popen(
            ["node", "/app/hocuspocus/server.cjs"],
            stdout=open("/tmp/hocus.out.log", "ab"),
            stderr=open("/tmp/hocus.err.log", "ab"),
            env={**os.environ, "HOCUS_PORT": str(HOCUS_PORT)},
            start_new_session=True,
        )
        # wait briefly for it to bind
        for _ in range(20):
            try:
                with subprocess.Popen(
                    ["nc", "-z", "127.0.0.1", str(HOCUS_PORT)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                ) as p2:
                    p2.wait(timeout=1)
                    if p2.returncode == 0:
                        return
            except Exception:
                pass
            time.sleep(0.25)
    except Exception:
        pass


_ensure_postgres_running()
_ensure_hocuspocus_running()


app = FastAPI(title="Inkwell sidecar")
_client = httpx.AsyncClient(timeout=120.0, follow_redirects=False)


class AIRequest(BaseModel):
    action: str = Field(pattern=r"^(summarize|grammar|explain-diff)$")
    text: str | None = Field(default=None, max_length=20_000)
    before: str | None = Field(default=None, max_length=20_000)
    after: str | None = Field(default=None, max_length=20_000)


@app.post("/__internal/ai")
async def internal_ai(payload: AIRequest) -> dict[str, Any]:
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="EMERGENT_LLM_KEY not configured")

    from emergentintegrations.llm.chat import LlmChat, UserMessage

    system = (
        "You are a precise editorial assistant. Reply with the requested transformation only — "
        "no preamble, no markdown headings, no commentary."
    )
    if payload.action == "summarize":
        if not payload.text:
            raise HTTPException(status_code=400, detail="text required for summarize")
        prompt = (
            "Summarize the following document in 3-6 sentences. Preserve key facts and tone.\n\n"
            f"---\n{payload.text}\n---"
        )
    elif payload.action == "grammar":
        if not payload.text:
            raise HTTPException(status_code=400, detail="text required for grammar")
        prompt = (
            "Rewrite the following passage with grammar, punctuation, and clarity corrected. "
            "Preserve voice, paragraph structure, and meaning. Output the corrected text only.\n\n"
            f"---\n{payload.text}\n---"
        )
    else:  # explain-diff
        if payload.before is None or payload.after is None:
            raise HTTPException(status_code=400, detail="before and after required for explain-diff")
        prompt = (
            "Two versions of a document are below. In 2-3 plain sentences, explain what changed "
            "between BEFORE and AFTER (additions, deletions, tone/structure shifts). Be specific "
            "and editorial — do NOT enumerate every line. No markdown headings, no preamble.\n\n"
            f"=== BEFORE ===\n{payload.before}\n\n=== AFTER ===\n{payload.after}\n"
        )

    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=f"inkwell-{payload.action}",
        system_message=system,
    ).with_model("gemini", "gemini-3-flash-preview")

    parts: list[str] = []
    try:
        from emergentintegrations.llm.chat import TextDelta, StreamDone

        async for ev in chat.stream_message(UserMessage(text=prompt)):
            if isinstance(ev, TextDelta):
                parts.append(ev.content)
            elif isinstance(ev, StreamDone):
                break
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"LLM error: {exc}") from exc

    return {"result": "".join(parts).strip(), "action": payload.action}


# ---------------------------- HTTP reverse proxy ----------------------------

_HOP_BY_HOP = {
    "connection", "keep-alive", "proxy-authenticate", "proxy-authorization",
    "te", "trailers", "transfer-encoding", "upgrade", "content-encoding", "content-length",
}


@app.websocket("/api/hocus")
async def hocus_ws_proxy(ws: WebSocket) -> None:
    """Bridge a browser WebSocket to the Hocuspocus server on localhost:1234."""
    await ws.accept(subprotocol=None)
    try:
        async with websockets.connect(
            f"ws://localhost:{HOCUS_PORT}",
            open_timeout=5,
            max_size=8 * 1024 * 1024,
        ) as upstream:
            async def client_to_upstream() -> None:
                try:
                    while True:
                        msg = await ws.receive()
                        if msg.get("type") == "websocket.disconnect":
                            break
                        if "bytes" in msg and msg["bytes"] is not None:
                            await upstream.send(msg["bytes"])
                        elif "text" in msg and msg["text"] is not None:
                            await upstream.send(msg["text"])
                except WebSocketDisconnect:
                    pass

            async def upstream_to_client() -> None:
                try:
                    async for frame in upstream:
                        if isinstance(frame, (bytes, bytearray, memoryview)):
                            await ws.send_bytes(bytes(frame))
                        else:
                            await ws.send_text(frame)
                except websockets.ConnectionClosed:
                    pass

            await asyncio.gather(client_to_upstream(), upstream_to_client(), return_exceptions=True)
    except (websockets.WebSocketException, OSError):
        pass
    finally:
        try:
            await ws.close()
        except Exception:
            pass


@app.api_route("/api/{path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"])
async def proxy(path: str, request: Request) -> Response:
    target = f"{NEXT_ORIGIN}/api/{path}"
    if request.url.query:
        target = f"{target}?{request.url.query}"

    incoming = request.headers
    original_host = incoming.get("host", "")
    proto = incoming.get("x-forwarded-proto") or ("https" if request.url.scheme == "https" else "http")
    fwd_host = incoming.get("x-forwarded-host") or original_host

    headers: dict[str, str] = {}
    for k, v in incoming.items():
        kl = k.lower()
        if kl in _HOP_BY_HOP or kl == "host":
            continue
        headers[k] = v
    if original_host:
        headers["host"] = original_host
        headers["x-forwarded-host"] = fwd_host
    headers["x-forwarded-proto"] = proto
    client_ip = (request.client.host if request.client else "") or ""
    if client_ip:
        existing = headers.get("x-forwarded-for")
        headers["x-forwarded-for"] = f"{existing}, {client_ip}" if existing else client_ip

    body = await request.body()
    try:
        upstream = await _client.request(
            method=request.method, url=target, headers=headers, content=body,
        )
    except httpx.ConnectError:
        raise HTTPException(status_code=502, detail="Next.js dev server not ready") from None

    resp = Response(content=upstream.content, status_code=upstream.status_code)
    resp.raw_headers = [
        (k.lower().encode("latin-1"), v.encode("latin-1"))
        for k, v in upstream.headers.multi_items()
        if k.lower() not in _HOP_BY_HOP
    ]
    return resp


@app.get("/__internal/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "hocus_port": str(HOCUS_PORT)}
