"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { processSteps } from "@/content/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

/**
 * The one real sequence on the page: the four-step path to flight, drawn as an
 * image-led gallery on the ink "sky". Each duotone Icarus plate is a phase of
 * the ascent (blueprint → wings → takeoff → sustained climb). The single
 * cerulean line ruled across the draft — the brand's north star — caps the row.
 */
export function Process() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      {/* Horizon glow: the sky the figures climb into, blueprint tint kept faint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_55%_100%_at_50%_0%,rgba(0,157,255,0.14),transparent_70%)]"
      />

      <Container className="relative">
        <SectionHeading
          tone="dark"
          title={
            <>
              From first call to{" "}
              <span className="text-blueprint">full flight</span>
            </>
          }
          subtitle="A simple four-step path. You always know where your project stands."
        />

        {/* The ruling line drawn across the draft before the plates are placed */}
        <motion.div
          aria-hidden
          className="mx-auto mt-14 h-px w-full origin-left bg-gradient-to-r from-transparent via-blueprint/60 to-transparent"
          initial={reduceMotion ? { opacity: 0 } : { scaleX: 0 }}
          whileInView={reduceMotion ? { opacity: 1 } : { scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        <Stagger
          as="ol"
          className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8"
        >
          {processSteps.map((step) => (
            <StaggerItem as="li" key={step.title} className="group flex flex-col">
              {/* Marker: Roman numeral + phase name — the reference's "#1 CONNECT" */}
              <div className="flex items-center gap-3 text-blueprint">
                <span className="font-display text-lg leading-none">
                  {step.numeral}
                </span>
                <span aria-hidden className="h-px w-6 bg-blueprint/40" />
                <span className="text-xs font-semibold tracking-[0.25em] uppercase">
                  {step.title}
                </span>
              </div>

              <h3 className="mt-4 font-display text-2xl leading-tight text-balance text-white sm:text-[1.75rem] lg:text-xl">
                {step.headline}
              </h3>

              <div className="relative mt-5 aspect-3/4 w-full overflow-hidden rounded-sm bg-gradient-to-b from-blueprint-tint to-folio ring-1 ring-blueprint/15 ring-inset lg:max-w-[220px]">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(min-width: 1024px) 220px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>

              <p className="mt-5 text-sm leading-relaxed text-white/70 text-justify lg:max-w-[220px]">
                {step.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
