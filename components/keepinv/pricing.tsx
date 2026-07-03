import { Check } from "lucide-react";
import { keepinvPricing } from "@/content/keepinv";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function KeepInvPricing() {
  return (
    <section id="pricing" className="bg-folio-raised py-20 sm:py-28">
      <Container className="max-w-7xl">
        <SectionHeading
          title="One payment. Yours for life."
          subtitle="No monthly fees, no lock-in. Pick the tier that fits and upgrade any time."
        />
        <Stagger className="mt-14 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {keepinvPricing.map((tier) => (
            <StaggerItem
              key={tier.name}
              className={cn(
                "flex h-full flex-col rounded-sm border bg-white p-6",
                tier.featured ? "border-blueprint-deep" : "border-ruling",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-ink">{tier.name}</h3>
                  <p className="mt-0.5 text-xs font-medium tracking-wide text-ink-mid uppercase">
                    {tier.subtitle}
                  </p>
                </div>
                {tier.featured && (
                  <Badge className="whitespace-nowrap">Recommended</Badge>
                )}
              </div>
              <p className="mt-5 flex items-baseline gap-2">
                <span className="font-mono text-3xl font-semibold tracking-tight text-ink">
                  {tier.price}
                </span>
              </p>
              <p className="text-sm text-ink-mid">{tier.period}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-mid">
                {tier.description}
              </p>
              <ul className="mt-5 space-y-2.5">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-ink"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-ink-mid" />
                    {feature}
                  </li>
                ))}
              </ul>
              {tier.note && (
                <p className="mt-4 text-xs text-ink-mid">{tier.note}</p>
              )}
              <div className="mt-auto pt-7">
                <Button
                  href={tier.cta.href}
                  variant={tier.featured ? "primary" : "secondary"}
                  className="w-full"
                >
                  {tier.cta.label}
                </Button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
