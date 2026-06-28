"""Shared fixtures and config for the Inkwell regression suite."""
from __future__ import annotations

import json
import os
import socket
import subprocess
import time
import uuid
from pathlib import Path
from typing import Any

import pytest
import requests


REPO_ROOT = Path("/app")
PROBE_PATH = REPO_ROOT / "backend" / "tests" / "helpers" / "awareness_probe.cjs"
FRONTEND_NODE_MODULES = REPO_ROOT / "frontend" / "node_modules"

# Tests run inside the dev pod so we hit Hocuspocus on localhost directly —
# no need to go through the FastAPI WS proxy (which we test via the HTTP suite).
HOCUS_HOST = os.environ.get("HOCUS_HOST", "127.0.0.1")
HOCUS_PORT = int(os.environ.get("HOCUS_PORT", "1234"))
HOCUS_URL = f"ws://{HOCUS_HOST}:{HOCUS_PORT}"

# External backend URL for HTTP gate tests.
BACKEND_URL = os.environ.get(
    "REACT_APP_BACKEND_URL",
    "https://crdt-workspace.preview.emergentagent.com",
).rstrip("/")


def _wait_for_port(host: str, port: int, timeout: float = 5.0) -> bool:
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            with socket.create_connection((host, port), timeout=1):
                return True
        except OSError:
            time.sleep(0.2)
    return False


@pytest.fixture(scope="session")
def hocus_url() -> str:
    """The Hocuspocus WS URL — fails fast if Hocuspocus is not up."""
    assert _wait_for_port(HOCUS_HOST, HOCUS_PORT, timeout=5.0), (
        f"Hocuspocus is not listening on {HOCUS_HOST}:{HOCUS_PORT}. "
        "Start the backend (which spawns Hocuspocus) before running tests."
    )
    return HOCUS_URL


@pytest.fixture(scope="session")
def backend_url() -> str:
    return BACKEND_URL


def run_probe(mode: str, *args: str, timeout: float = 15.0, hocus_url: str | None = None) -> dict[str, Any]:
    """Run the Node awareness probe and return its parsed JSON result."""
    env = os.environ.copy()
    env["NODE_PATH"] = str(FRONTEND_NODE_MODULES)
    if hocus_url:
        env["HOCUS_URL"] = hocus_url
    proc = subprocess.run(
        ["node", str(PROBE_PATH), mode, *args],
        capture_output=True,
        text=True,
        timeout=timeout,
        env=env,
    )
    if proc.returncode not in (0, 1):
        raise RuntimeError(
            f"probe {mode} exited {proc.returncode}\n"
            f"STDOUT: {proc.stdout}\nSTDERR: {proc.stderr}"
        )
    # The probe always prints a single JSON object on its last stdout line.
    last_line = proc.stdout.strip().splitlines()[-1] if proc.stdout.strip() else "{}"
    return json.loads(last_line)


@pytest.fixture
def fresh_doc_id() -> str:
    """A unique synthetic docId per test — Hocuspocus tolerates arbitrary names."""
    return f"pytest-{uuid.uuid4().hex[:12]}"


@pytest.fixture
def http_session() -> requests.Session:
    s = requests.Session()
    s.headers.update({"User-Agent": "inkwell-regression-pytest"})
    return s
