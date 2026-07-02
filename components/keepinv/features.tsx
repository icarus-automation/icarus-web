import {
  Radio,
  Monitor,
  Boxes,
  Printer,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { keepinvFeatures } from "@/content/keepinv";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const icons = {
  radio: Radio,
  monitor: Monitor,
  boxes: Boxes,
  printer: Printer,
  shield: ShieldCheck,
  wallet: Wallet,
} as const;

export function KeepInvFeatures() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          title="Everything a growing store needs"
          subtitle="Fast, efficient, and honest. Built for real Philippine businesses."
        />
        <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {keepinvFeatures.map((feature) => {
            const Icon = icons[feature.icon as keyof typeof icons];
            return (
              <StaggerItem
                as="li"
                key={feature.title}
                className="rounded-sm border border-line bg-white p-6 transition-colors duration-200 hover:border-ink/30"
              >
                <div className="flex size-11 items-center justify-center rounded-sm bg-primary-soft text-primary-deep">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-lg text-ink">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {feature.description}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
