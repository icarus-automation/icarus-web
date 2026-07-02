import { cn } from "@/lib/utils";

/**
 * Radiating gold sun rays echoing the Icarus illustration.
 * Alternates long/dashed rays like the artwork. Purely decorative.
 */
export function SunRays({
  className,
  rays = 36,
}: {
  className?: string;
  rays?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      className={cn("animate-rays text-gold", className)}
      fill="none"
    >
      {Array.from({ length: rays }).map((_, i) => {
        const angle = (i * 360) / rays;
        const long = i % 2 === 0;
        return (
          <line
            key={i}
            x1="200"
            y1={long ? 18 : 46}
            x2="200"
            y2={long ? 92 : 104}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray={long ? undefined : "10 6"}
            opacity={long ? 0.55 : 0.35}
            transform={`rotate(${angle} 200 200)`}
          />
        );
      })}
    </svg>
  );
}
