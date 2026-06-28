import { cn } from "@/lib/utils";

/**
 * Stylized text mark for the Inkwell brand. Mixes a Fraunces display ligature
 * with a small ink-drop dot — pure CSS, no image asset required.
 */
export function InkwellMark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)} data-testid="inkwell-mark">
      <div className="relative h-9 w-9 rounded-md bg-primary flex items-center justify-center shadow-sm">
        <span className="font-display text-primary-foreground text-xl leading-none italic">I</span>
        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-foreground border-2 border-card" />
      </div>
      <span className="font-display text-xl tracking-tight text-foreground hidden sm:inline">
        Inkwell
      </span>
    </div>
  );
}
