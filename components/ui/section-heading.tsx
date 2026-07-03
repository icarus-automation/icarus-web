import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className,
}: {
  /** Optional small label. Use sparingly: at most one per few sections. */
  eyebrow?: string;
  /** Accepts nodes so a key phrase can carry the blueprint-deep authorship accent. */
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-xs font-semibold tracking-[0.25em] uppercase",
            dark ? "text-gilt" : "text-gilt-deep",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl leading-tight text-balance sm:text-4xl md:text-[2.75rem]",
          eyebrow && "mt-4",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed text-pretty",
            dark ? "text-white/70" : "text-ink-mid",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
