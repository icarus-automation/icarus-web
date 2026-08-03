import Link from "next/link";
import { industries } from "@/content/solutions";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

/**
 * "Who we build for" — a light self-identify strip. Deliberately shallow
 * (no per-industry pages); every chip funnels to the free demo.
 */
export function Industries() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          title="Who we build for"
          subtitle="Different industries, same problem: work that should run itself."
        />
        <Stagger as="ul" className="mt-12 flex flex-wrap justify-center gap-3">
          {industries.map((industry) => (
            <StaggerItem as="li" key={industry.label}>
              <Link
                href={site.cta.href}
                className="group inline-flex items-center gap-2.5 rounded-sm border border-ruling bg-folio-raised px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/30 hover:text-blueprint-deep"
              >
                <industry.icon
                  className="size-4 text-blueprint-deep"
                  strokeWidth={1.75}
                />
                {industry.label}
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
