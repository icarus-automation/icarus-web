import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SunRays } from "@/components/greek/sun-rays";
import { Laurel } from "@/components/greek/laurel";
import { Reveal } from "@/components/motion/reveal";

export function Hero() {
  return (
    <section className="marble relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-gilt-deep uppercase">
                <Laurel className="h-8 w-5" />
                Automation · Web &amp; Systems · IoT
                <Laurel className="h-8 w-5" flip />
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl md:text-6xl">
                Reach higher.
                <br />
                Let your business{" "}
                <span className="text-blueprint-deep">fly on autopilot.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-mid">
                Enterprise-grade automation, custom systems, and IoT for
                Philippine businesses, without the enterprise price.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={site.cta.href} size="lg">
                  {site.cta.label}
                  <ArrowRight className="size-4" />
                </Button>
                <Button href="/solutions/keepinv" variant="secondary" size="lg">
                  Explore Keep Inv
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative aspect-4/5">
              {/* Anchor matches the PNG's own figure bounding box (~47% x, ~50% y),
                  not the frame center, so rays span the full figure top-to-bottom.
                  The glow is the one sanctioned glow in the system (SunRays motif). */}
              <div
                aria-hidden
                className="absolute top-[50%] left-[47%] size-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gilt/15 blur-3xl"
              />
              <SunRays className="absolute top-[50%] left-[47%] size-[115%] -translate-x-1/2 -translate-y-1/2" />
              <Image
                src="/assets/icarus-illustration.png"
                alt="Icarus illustration, winged figure rising toward the sun"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
