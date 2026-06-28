"""Backend auth-gate regression tests.

Locks in the security contract that every authenticated API endpoint returns
401 to unauthenticated callers, and that the auth callback chain succeeds
for the seeded users.
"""
from __future__ import annotations

import pytest
import requests


# Test users seeded by /app/memory/test_credentials.md
SEED_USERS = [
    ("test@inkwell.dev", "test1234"),
    ("editor@inkwell.dev", "editor1234"),
    ("viewer@inkwell.dev", "viewer1234"),
]

# Endpoints that MUST require auth. Each tuple = (method, path).
PROTECTED_ENDPOINTS = [
    ("GET", "/api/documents"),
    ("POST", "/api/documents"),
    ("GET", "/api/documents/any-id/snapshots"),
    ("POST", "/api/ai"),
]


@pytest.mark.parametrize("method,path", PROTECTED_ENDPOINTS)
def test_unauthenticated_returns_401(
    backend_url: str, http_session: requests.Session, method: str, path: str
) -> None:
    r = http_session.request(method, f"{backend_url}{path}", timeout=10, allow_redirects=False)
    assert r.status_code == 401, (
        f"{method} {path} should be 401 without auth, got {r.status_code}: "
        f"{r.text[:200]}"
    )


@pytest.mark.parametrize("email,password", SEED_USERS)
def test_seeded_user_can_log_in(
    backend_url: str, http_session: requests.Session, email: str, password: str
) -> None:
    """The login chain `/api/auth/csrf` → `/api/auth/callback/credentials` must
    succeed for every seeded user and produce a session cookie that lets the
    next call to `/api/documents` succeed."""
    csrf_resp = http_session.get(f"{backend_url}/api/auth/csrf", timeout=10)
    assert csrf_resp.status_code == 200, csrf_resp.text
    csrf_token = csrf_resp.json()["csrfToken"]

    login = http_session.post(
        f"{backend_url}/api/auth/callback/credentials",
        data={
            "csrfToken": csrf_token,
            "email": email,
            "password": password,
            "callbackUrl": f"{backend_url}/dashboard",
        },
        allow_redirects=False,
        timeout=10,
    )
    # NextAuth redirects to /dashboard on success and to /login?error=... on failure.
    assert login.status_code in (302, 303), f"login chain status: {login.status_code}"
    location = login.headers.get("location", "")
    assert "error" not in location, f"login redirected to error: {location}"

    # Now hit a protected endpoint with the session cookie — should be 200.
    docs = http_session.get(f"{backend_url}/api/documents", timeout=10)
    assert docs.status_code == 200, (
        f"GET /api/documents post-login returned {docs.status_code}: "
        f"{docs.text[:200]}"
    )
    payload = docs.json()
    assert "documents" in payload, payload


def test_viewer_role_rbac_on_diagx(
    backend_url: str, http_session: requests.Session
) -> None:
    """The seeded VIEWER member of the demo doc must get role=VIEWER and
    isOwner=False, NOT a 404."""
    csrf = http_session.get(f"{backend_url}/api/auth/csrf", timeout=10).json()["csrfToken"]
    http_session.post(
        f"{backend_url}/api/auth/callback/credentials",
        data={
            "csrfToken": csrf,
            "email": "viewer@inkwell.dev",
            "password": "viewer1234",
            "callbackUrl": f"{backend_url}/dashboard",
        },
        allow_redirects=False,
        timeout=10,
    )
    r = http_session.get(
        f"{backend_url}/api/documents/cmqy41omm007ydtv8mbnyq6s8", timeout=10
    )
    assert r.status_code == 200, f"viewer should see DiagX, got {r.status_code}"
    payload = r.json()
    doc = payload.get("document", {})
    assert doc.get("role") == "VIEWER", payload
    assert doc.get("isOwner") is False, payload
