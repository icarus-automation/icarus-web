import { Workflow, Globe, Cpu, FileStack, ArrowRight } from "lucide-react";
import { services, site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const icons = {
  workflow: Workflow,
  globe: Globe,
  cpu: Cpu,
  digitize: FileStack,
} as const;

/**
 * Breadth band: nothing off-the-shelf fits? We build it. Scannable — icon +
 * title + short capability chips, no paragraphs. Funnels to the demo.
 */
export function WaysWeBuild() {
  return (
    <section className="border-y border-ruling bg-folio-raised py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Custom builds"
          title="Nothing fits? We build it from scratch."
          subtitle="Automation, systems, and hardware, made for how your business actually runs."
        />
        <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <StaggerItem
                as="li"
                key={service.title}
                className="rounded-sm border border-ruling bg-white p-6"
              >
                <div className="flex size-11 items-center justify-center rounded-sm bg-blueprint-tint text-blueprint-deep">
                  <Icon className="size-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">
                  {service.title}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
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
              </StaggerItem>
            );
          })}
        </Stagger>
        <Reveal delay={0.1} className="mt-10 text-center">
          <Button href={site.cta.href} size="lg">
            {site.cta.label}
            <ArrowRight className="size-4" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
