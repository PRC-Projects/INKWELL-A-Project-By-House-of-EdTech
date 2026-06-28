"use client";
import { useEffect, useRef } from "react";

/**
 * Closes the panel when the user clicks anywhere outside `ref.current`.
 * Used by the AI / History / Share popovers and similar dropdowns.
 */
export function useClickOutside<T extends HTMLElement>(
  open: boolean,
  onClose: () => void,
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el) return;
      if (el.contains(e.target as Node)) return;
      onClose();
    };
    // Defer attach so the same click that opened the panel doesn't immediately close it.
    const t = setTimeout(() => {
      document.addEventListener("mousedown", handler);
      document.addEventListener("touchstart", handler);
    }, 0);
    const escHandler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", escHandler);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
      document.removeEventListener("keydown", escHandler);
    };
  }, [open, onClose]);
  return ref;
}
