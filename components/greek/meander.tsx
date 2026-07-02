import { cn } from "@/lib/utils";

/** Thin Greek-key band. Color via text-* utility (uses currentColor). */
export function Meander({ className }: { className?: string }) {
  return <div aria-hidden className={cn("meander w-full", className)} />;
}
