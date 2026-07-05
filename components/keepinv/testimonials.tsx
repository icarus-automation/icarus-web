import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function KeepInvTestimonials() {
  return (
    <section className="py-20 sm:py-24">
      <Container className="max-w-3xl">
        <SectionHeading title="What our clients say" />
        {/* TODO: replace with real testimonial once the first client deployment completes */}
        <Reveal delay={0.1}>
          <figure className="mt-12 rounded-sm border border-dashed border-ruling bg-folio-raised p-8 text-center">
            <Quote aria-hidden className="mx-auto size-8 text-gilt" />
            <blockquote className="mt-4 text-lg leading-relaxed text-ink-mid italic">
              Our first client&apos;s deployment is underway. Their story will
              live here soon.
            </blockquote>
            <figcaption className="mt-4 text-sm text-ink-mid">
              First testimonial arriving after launch
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
