import { Check } from "lucide-react";
import { keepinvPricing } from "@/content/keepinv";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function KeepInvPricing() {
  return (
    <section id="pricing" className="bg-surface-2 py-20 sm:py-28">
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
                "flex h-full flex-col rounded-sm border bg-white p-7",
                tier.featured ? "border-primary" : "border-line",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg text-ink">{tier.name}</h3>
                  <p className="mt-0.5 text-xs font-medium tracking-wide text-ink-muted uppercase">
                    {tier.subtitle}
                  </p>
                </div>
                {tier.featured && (
                  <span className="rounded-sm bg-primary px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-white">
                    Most popular
                  </span>
                )}
              </div>
              <p className="mt-5 flex items-baseline gap-2">
                <span className="font-mono text-3xl font-semibold tracking-tight text-ink">
                  {tier.price}
                </span>
              </p>
              <p className="text-sm text-ink-muted">{tier.period}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {tier.description}
              </p>
              <ul className="mt-5 space-y-2.5">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-ink"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                    {feature}
                  </li>
                ))}
              </ul>
              {tier.note && (
                <p className="mt-4 text-xs text-ink-muted/80">{tier.note}</p>
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
