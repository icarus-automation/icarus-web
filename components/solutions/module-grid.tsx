import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

type Item = {
  icon: LucideIcon;
  title: string;
  description: string;
};

/**
 * Reusable icon-led grid for a solution's modules or capabilities. Content
 * carries the Lucide icon directly, so any future solution just passes its
 * own items — no per-component icon map to maintain.
 */
export function SolutionModuleGrid({
  eyebrow,
  title,
  subtitle,
  items,
  muted = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  items: Item[];
  /** Render on the raised surface (for alternating section rhythm). */
  muted?: boolean;
}) {
  return (
    <section className={muted ? "bg-folio-raised py-20 sm:py-28" : "py-20 sm:py-28"}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <StaggerItem
              as="li"
              key={item.title}
              className="rounded-sm border border-ruling bg-white p-6"
            >
              <div className="flex size-11 items-center justify-center rounded-sm bg-blueprint-tint text-blueprint-deep">
                <item.icon className="size-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-1.5 text-base leading-relaxed text-ink-mid">
                {item.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
