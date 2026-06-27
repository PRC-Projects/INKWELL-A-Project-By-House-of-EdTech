"use client";
import { Toaster as SonnerToaster } from "sonner";
export const Toaster = () => (
  <SonnerToaster
    position="top-right"
    toastOptions={{
      style: {
        background: "hsl(var(--card))",
        color: "hsl(var(--foreground))",
        border: "1px solid hsl(var(--border))",
      },
    }}
  />
);
