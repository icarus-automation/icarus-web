import { cn } from "@/lib/utils";

/**
 * Compact winged Icarus in flight — the decorative traveller that rides the
 * process ruling line. Two-tone: blueprint wings/body tie it to the cerulean
 * line, a single gilt head-glint echoes the hero's sun. Head-on and symmetric
 * so it reads upright whether gliding across (desktop) or down (mobile).
 * Purely decorative.
 */
export function IcarusGlyph({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 40"
      className={cn(className)}
      fill="none"
    >
      {/* wings — upswept, feathered lower edge, mirrored pair */}
      <path
        d="M24 20C17 10 9 7 2 9c6 3 12 7 20 13z"
        fill="var(--color-blueprint-deep)"
        opacity="0.92"
      />
      <path
        d="M24 20c7-10 15-13 22-11-6 3-12 7-20 13z"
        fill="var(--color-blueprint-deep)"
        opacity="0.92"
      />
      {/* feather hints */}
      <g stroke="var(--color-blueprint)" strokeWidth="0.9" opacity="0.4">
        <path d="M8 10.5l6 4M14 9l5 5.5M9.5 13l6 3.5" />
        <path d="M40 10.5l-6 4M34 9l-5 5.5M38.5 13l-6 3.5" />
      </g>
      {/* body */}
      <path
        d="M24 17c-1.6 6-1.2 12 0 19 1.2-7 1.6-13 0-19z"
        fill="var(--color-blueprint-deep)"
      />
      {/* head — the one gilt glint */}
      <circle cx="24" cy="13.2" r="3.1" fill="var(--color-gilt)" />
    </svg>
  );
}
