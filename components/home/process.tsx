import { processSteps } from "@/content/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function Process() {
  return (
    <section className="bg-surface-2 py-20 sm:py-28">
      <Container>
        <SectionHeading
          title="From first call to full flight"
          subtitle="A simple four-step path. You always know where your project stands."
        />
        <Stagger as="ol" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <StaggerItem
              as="li"
              key={step.title}
              className="relative rounded-sm border border-line bg-white p-7"
            >
              <span aria-hidden className="font-display text-4xl text-gold/50">
                {step.numeral}
              </span>
              <h3 className="mt-4 font-display text-xl text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {step.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
