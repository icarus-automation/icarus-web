import { Workflow, Globe, Cpu, FileStack } from "lucide-react";
import { services } from "@/content/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ServiceCardArt } from "./service-card";

const icons = {
  workflow: Workflow,
  globe: Globe,
  cpu: Cpu,
  digitize: FileStack,
} as const;

const labels = ["N8N + AI", "WEB + SYSTEMS", "SENSORS + FIRMWARE", "DATA + PROCESS"];

/**
 * The winged-Icarus engraving is cut into four quadrants (`icarus-divide-1…4`),
 * one per card. Each quadrant is anchored toward the grid centre — left column
 * to the right edge, right column to the left — so the figure meets at the
 * central cross and reads as one continuous plate over the folio page. On
 * mobile the cards stack, so each simply centres its own quadrant.
 */
const artPosition = (i: number) =>
  i % 2 === 0 ? "object-center sm:object-right" : "object-center sm:object-left";

export function Services() {
  return (
    <section className="py-20 sm:py-28" id="services">
      <Container>
        <SectionHeading
          title={
            <>
              Four ways we help you{" "}
              <span className="text-blueprint-deep">rise</span>
            </>
          }
          subtitle="From daily marketing on autopilot to full POS and inventory systems. We build technology that pays for itself."
        />
        <Stagger as="ul" className="mt-14 grid gap-2 sm:grid-cols-2">
          {services.map((service, i) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <StaggerItem
                as="li"
                key={service.title}
                className="relative isolate flex min-h-[23rem] flex-col overflow-hidden sm:min-h-[27rem]"
              >
                <ServiceCardArt
                  image={`/assets/icarus-card/icarus-divide-${i + 1}.png`}
                  alt=""
                  position={artPosition(i)}
                >
                  <div className="flex items-center gap-2.5 text-ink-mid">
                    <Icon className="size-4" strokeWidth={1.75} />
                    <span className="text-[0.7rem] font-semibold tracking-[0.22em] uppercase">
                      {labels[i]}
                    </span>
                  </div>
                  <h3 className="mt-3.5 font-display text-2xl leading-[1.12] text-blueprint-deep sm:text-[1.75rem]">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-mid">
                    {service.description}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 pt-6">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-1.5 text-xs text-ink-mid"
                      >
                        <span className="size-1 rounded-full bg-blueprint-deep/50" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </ServiceCardArt>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
