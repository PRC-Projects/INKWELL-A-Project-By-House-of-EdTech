"""Regression tests for the Yjs awareness / Hocuspocus collaboration layer.

These tests lock in two production fixes:

1. **Deterministic sync handshake** (root cause: `onAuthenticate` hook in the
   Hocuspocus server.cjs was putting the server in auth-required mode and
   waiting forever for a client `token` that `@hocuspocus/provider` never
   sends, so the sync handshake never completed and no awareness frames were
   ever exchanged between peers).

2. **Fast disconnect pruning** — the `/api/hocus` FastAPI WS proxy now
   cancels its partner task on first completion (instead of `gather`-ing
   both), so the upstream WS to Hocuspocus is closed immediately when a
   browser tab disappears. The remaining peers see the leaver removed from
   awareness within ~25ms instead of the 30s default Hocuspocus ping
   timeout we used to wait for.

The tests use a real Hocuspocus instance (spawned by the FastAPI startup
hook) and real `@hocuspocus/provider` clients via a Node helper script so we
exercise the exact production code path.
"""
from __future__ import annotations

import pytest

from .conftest import run_probe


HANDSHAKE_BUDGET_MS = 2000
PRUNE_BUDGET_MS = 3000


def test_sync_handshake_completes(hocus_url: str, fresh_doc_id: str) -> None:
    """A single HocuspocusProvider must fire both `connect` and `synced`.

    Before the `onAuthenticate` hook removal, `synced` would never fire
    because the server hung waiting for an auth message — this test
    deadlocked indefinitely on the buggy build.
    """
    result = run_probe("handshake", fresh_doc_id, hocus_url=hocus_url)
    assert result["pass"], f"handshake probe failed: {result}"
    assert result["connected"] is True, result
    assert result["synced"] is True, result
    assert result["handshakeMs"] is not None
    assert result["handshakeMs"] < HANDSHAKE_BUDGET_MS, (
        f"sync handshake took {result['handshakeMs']}ms, "
        f"budget is {HANDSHAKE_BUDGET_MS}ms"
    )


@pytest.mark.parametrize("peer_count", [2, 3])
def test_awareness_propagates_between_peers(
    hocus_url: str, fresh_doc_id: str, peer_count: int
) -> None:
    """N peers joining the same document must each see (N-1) others.

    Before the fix, two peers on the same doc each saw zero peers (which the
    UI rendered as `1 live`, since count = others + self). The regression
    here ensures awareness frames make it across the relay in both
    directions.
    """
    result = run_probe(
        "join", fresh_doc_id, str(peer_count), hocus_url=hocus_url, timeout=10
    )
    assert result["pass"], f"join probe failed: {result}"
    expected = peer_count - 1
    assert all(n == expected for n in result["observed"]), (
        f"peer counts mismatch — expected each peer to see {expected} others, "
        f"got {result['observed']}"
    )


def test_disconnect_pruning_under_budget(
    hocus_url: str, fresh_doc_id: str
) -> None:
    """When peer B leaves, peer A's other-peer count must drop to 0 fast.

    Locked-in budget: 3 seconds. The real measurement against the dev pod
    is in the 25-500ms range — keeping the budget at 3s gives headroom for
    a slower CI environment without masking a true regression (the buggy
    build never pruned at all, peer A stayed at 1 until the 30s default
    Hocuspocus ping timeout expired).
    """
    result = run_probe("prune", fresh_doc_id, "500", hocus_url=hocus_url, timeout=15)
    assert result["pass"], f"prune probe failed: {result}"
    assert result["pruneMs"] is not None, "Peer A never saw the disconnect"
    assert result["pruneMs"] < PRUNE_BUDGET_MS, (
        f"disconnect pruning took {result['pruneMs']}ms, "
        f"budget is {PRUNE_BUDGET_MS}ms (was ~6000ms before the WS-proxy fix)"
    )
