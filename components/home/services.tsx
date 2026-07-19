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
 * A single duotone Icarus plate (spread wing + winged figure) is painted *once*
 * across the whole 2×2 grid: each card holds the full image at 2× its own size
 * and anchors a different corner, so the engraving flows unbroken across the
 * seams (`+8px` = the grid gap, aligning the halves across the gutter on
 * desktop). On mobile the cards stack, so each frames its own quadrant.
 */
const artSize =
  "bg-[length:200%_200%] sm:bg-[length:calc(200%+8px)_calc(200%+8px)]";

const artCorner = [
  "bg-[position:0%_0%]",
  "bg-[position:100%_0%]",
  "bg-[position:0%_100%]",
  "bg-[position:100%_100%]",
];

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
        {/* deep-blue backing shows through the 8px gutters as recessed seams */}
        <div className="mt-14 overflow-hidden rounded-sm bg-[#04263f]">
          <Stagger as="ul" className="grid gap-2 sm:grid-cols-2">
            {services.map((service, i) => {
              const Icon = icons[service.icon as keyof typeof icons];
              return (
                <StaggerItem
                  as="li"
                  key={service.title}
                  className="relative isolate flex min-h-[23rem] flex-col overflow-hidden sm:min-h-[27rem]"
                >
                  <ServiceCardArt
                    image="/assets/icarus-services.webp"
                    art={`${artSize} ${artCorner[i]}`}
                  >
                    <div className="flex items-center gap-2.5 text-white/75">
                      <Icon className="size-4" strokeWidth={1.75} />
                      <span className="text-[0.7rem] font-semibold tracking-[0.22em] uppercase">
                        {labels[i]}
                      </span>
                    </div>
                    <h3 className="mt-3.5 font-display text-2xl leading-[1.12] text-white sm:text-[1.75rem]">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">
                      {service.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-1.5 text-xs text-white/70"
                        >
                          <span className="size-1 rounded-full bg-white/55" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </ServiceCardArt>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
