import { Workflow, Globe, Cpu, ScanBarcode, Check } from "lucide-react";
import { services } from "@/content/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const icons = {
  workflow: Workflow,
  globe: Globe,
  cpu: Cpu,
  scan: ScanBarcode,
} as const;

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
        <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <StaggerItem
                as="li"
                key={service.title}
                className="rounded-sm border border-ruling bg-folio-raised p-6"
              >
                <div className="flex size-12 items-center justify-center rounded-sm bg-blueprint-tint text-blueprint-deep">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-base leading-relaxed text-ink-mid">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm text-ink"
                    >
                      <Check className="size-3.5 text-ink-mid" />
                      {point}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
