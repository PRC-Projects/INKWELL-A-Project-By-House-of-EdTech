"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ConnectionStatus = "online" | "offline" | "syncing" | "error";

export interface PendingUpdate {
  id: string;       // local UUID, used to remove from queue on ack
  clientId: string; // stable client identity, used for server idempotency
  clock: number;
  documentId: string;
  update: string;   // base64 encoded Yjs update
  enqueuedAt: number;
}

export interface SyncState {
  status: ConnectionStatus;
  isOnline: boolean;
  queue: PendingUpdate[];
  lastSyncedAt: number | null;
  lastError: string | null;
  // monotonically-increasing clock per client, persisted in localStorage
  clock: number;
}

const initialState: SyncState = {
  status: "offline",
  isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
  queue: [],
  lastSyncedAt: null,
  lastError: null,
  clock: 0,
};

const slice = createSlice({
  name: "sync",
  initialState,
  reducers: {
    setOnline(state, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
      state.status = action.payload ? "online" : "offline";
    },
    setStatus(state, action: PayloadAction<ConnectionStatus>) {
      state.status = action.payload;
    },
    enqueueUpdate(state, action: PayloadAction<PendingUpdate>) {
      state.queue.push(action.payload);
    },
    ackUpdates(state, action: PayloadAction<string[]>) {
      const ids = new Set(action.payload);
      state.queue = state.queue.filter((u) => !ids.has(u.id));
      state.lastSyncedAt = Date.now();
      state.lastError = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.lastError = action.payload;
      state.status = "error";
    },
    bumpClock(state) {
      state.clock += 1;
    },
    hydrateClock(state, action: PayloadAction<number>) {
      state.clock = action.payload;
    },
  },
});

export const { setOnline, setStatus, enqueueUpdate, ackUpdates, setError, bumpClock, hydrateClock } = slice.actions;
export const syncReducer = slice.reducer;
