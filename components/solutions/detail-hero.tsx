import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Reusable hero for a solution detail page. This is the template future
 * solution items should compose from (not the Keep Inv page). Visual-first:
 * a big logo tile + one headline + one line. No pricing, no demo URL by
 * design — the single conversion path is the free-demo CTA.
 */
export function SolutionDetailHero({
  name,
  logo,
  darkLogo = false,
  status,
  oneLiner,
  description,
}: {
  name: string;
  logo: string;
  darkLogo?: boolean;
  status?: string;
  oneLiner: string;
  description?: string;
}) {
  return (
    <section className="marble relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              {status && <Badge>{status}</Badge>}
              <h1 className="mt-4 font-display text-4xl leading-[1.1] text-balance text-ink sm:text-5xl">
                {name}
              </h1>
              <p className="mt-4 max-w-xl text-xl leading-snug text-blueprint-deep">
                {oneLiner}
              </p>
              {description && (
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-mid">
                  {description}
                </p>
              )}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={site.cta.href} size="lg">
                  {site.cta.label}
                  <ArrowRight className="size-4" />
                </Button>
                <Button href={site.facebook} variant="ghost" size="lg">
                  Message us on Facebook
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div
              className={cn(
                "relative aspect-4/3 overflow-hidden rounded-sm border",
                darkLogo ? "border-ink/20 bg-ink" : "border-ruling bg-folio-raised",
              )}
            >
              <Image
                src={logo}
                alt={`${name} logo`}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 90vw"
                className={darkLogo ? "object-cover" : "object-contain p-10"}
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
