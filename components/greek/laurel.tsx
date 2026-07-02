import { cn } from "@/lib/utils";

/** Small laurel-branch flourish, mirrored pair around content. Decorative. */
export function Laurel({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 40"
      className={cn("text-gold", flip && "-scale-x-100", className)}
      fill="currentColor"
    >
      <path d="M12 40c-2-8-2-16 0-24" fill="none" stroke="currentColor" strokeWidth="1.2" />
      {[
        [11, 34],
        [10.4, 28],
        [10.2, 22],
        [10.6, 16],
      ].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x - 3.4} cy={y} rx="3.4" ry="1.5" transform={`rotate(-32 ${x - 3.4} ${y})`} opacity="0.85" />
          <ellipse cx={x + 4.6} cy={y - 1} rx="3.4" ry="1.5" transform={`rotate(38 ${x + 4.6} ${y - 1})`} opacity="0.65" />
        </g>
      ))}
      <circle cx="12.2" cy="12.5" r="1.6" opacity="0.9" />
    </svg>
  );
}
