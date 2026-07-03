import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { keepinv } from "@/content/keepinv";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

export function KeepInvHero() {
  return (
    <section className="marble relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <Badge>Live product</Badge>
              <h1 className="mt-4 font-display text-4xl leading-[1.1] text-balance text-ink sm:text-5xl">
                {keepinv.name}
                <span className="block text-blueprint-deep">
                  Inventory &amp; POS, without the price tag
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-mid">
                {keepinv.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={site.cta.href} size="lg">
                  {site.cta.label}
                  <ArrowRight className="size-4" />
                </Button>
                <Button href="#pricing" variant="secondary" size="lg">
                  See pricing
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="relative aspect-4/3 overflow-hidden rounded-sm border border-ruling">
              <Image
                src="/assets/pxl-default-image.png"
                alt="Replace with: Keep Inv product hero shot, POS screen with printer and RFID reader"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
