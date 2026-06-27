"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DocumentSummary {
  id: string;
  title: string;
  updatedAt: string;
  role: "OWNER" | "EDITOR" | "VIEWER";
  owner: { email: string; name: string | null };
}
export interface DocumentsState {
  list: DocumentSummary[];
  loading: boolean;
}
const initialState: DocumentsState = { list: [], loading: false };

const slice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setDocuments(state, action: PayloadAction<DocumentSummary[]>) { state.list = action.payload; },
    setLoading(state, action: PayloadAction<boolean>) { state.loading = action.payload; },
    upsertDocument(state, action: PayloadAction<DocumentSummary>) {
      const idx = state.list.findIndex((d) => d.id === action.payload.id);
      if (idx >= 0) state.list[idx] = action.payload;
      else state.list.unshift(action.payload);
    },
    removeDocument(state, action: PayloadAction<string>) {
      state.list = state.list.filter((d) => d.id !== action.payload);
    },
  },
});

export const { setDocuments, setLoading, upsertDocument, removeDocument } = slice.actions;
export const documentsReducer = slice.reducer;
