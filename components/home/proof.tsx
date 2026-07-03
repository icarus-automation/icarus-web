import { ArrowUpRight } from "lucide-react";
import { proofPoints } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Meander } from "@/components/greek/meander";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

/**
 * Named-proof band (PRODUCT.md principle 4): a few verifiable facts stated
 * plainly, instead of generic animated stat counters. The gilt meander pair
 * framing the band is the viewport's single gilt moment.
 */
export function Proof() {
  return (
    <section className="bg-ink text-white">
      <Meander className="text-gilt/60" />
      <Container className="py-16 sm:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight text-balance sm:text-4xl">
              Proof, not promises.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              We&apos;re early in the climb — so everything here is something
              you can check.
            </p>
          </Reveal>
          <Stagger className="divide-y divide-white/10">
            {proofPoints.map((point) => (
              <StaggerItem key={point.fact} className="py-5 first:pt-0 last:pb-0">
                <p className="font-semibold">{point.fact}</p>
                <p className="mt-1 text-base leading-relaxed text-white/70">
                  {point.detail}
                </p>
                {point.certificate && (
                  <a
                    href={point.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-blueprint transition-colors hover:text-white"
                  >
                    View certificate
                    <ArrowUpRight className="size-3.5" />
                  </a>
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
      <Meander className="rotate-180 text-gilt/60" />
    </section>
  );
}
