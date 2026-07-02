import Image from "next/image";
import { ArrowRight, Radio, ShieldCheck, Wallet } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

const highlights = [
  {
    icon: Radio,
    title: "RFID audits in seconds",
    description:
      "Scan thousands of assets in one sweep and spot anything missing instantly.",
  },
  {
    icon: Wallet,
    title: "₱1,299 lifetime access",
    description:
      "One payment, no subscription. Devices available for every budget.",
  },
  {
    icon: ShieldCheck,
    title: "Anti-theft by design",
    description:
      "Every item accounted for, protecting your business from internal loss.",
  },
];

export function KeepInvTeaser() {
  return (
    <section className="overflow-hidden py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-4/3 overflow-hidden rounded-sm border border-line">
              <Image
                src="/assets/pxl-default-image.png"
                alt="Replace with: Keep Inv dashboard screenshot showing inventory and POS"
                fill
                sizes="(min-width: 1024px) 50vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <Badge>Featured product</Badge>
              <h2 className="mt-4 font-display text-3xl leading-tight text-balance text-ink sm:text-4xl">
                Keep Inv: the inventory &amp; POS big retailers run, at a
                small-business price
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                A modern inventory management system with integrated POS,
                printers, barcode, and handheld RFID. Launched and running in
                real businesses today.
              </p>
            </Reveal>
            <ul className="mt-7 space-y-4">
              {highlights.map((item, i) => (
                <Reveal as="li" key={item.title} delay={0.08 * (i + 1)}>
                  <div className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-primary-soft text-primary-deep">
                      <item.icon className="size-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-ink">{item.title}</p>
                      <p className="text-sm text-ink-muted">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.35}>
              <Button href="/solutions/keepinv" size="lg" className="mt-8">
                See pricing &amp; features
                <ArrowRight className="size-4" />
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
