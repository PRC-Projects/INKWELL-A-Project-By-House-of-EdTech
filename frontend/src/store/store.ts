"use client";
import { configureStore } from "@reduxjs/toolkit";
import { syncReducer } from "./slices/syncSlice";
import { documentsReducer } from "./slices/documentsSlice";

export const makeStore = () =>
  configureStore({
    reducer: { sync: syncReducer, documents: documentsReducer },
    middleware: (gDM) => gDM({ serializableCheck: false }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
