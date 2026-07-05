"use client";

import { motion, useReducedMotion } from "motion/react";
import { processSteps } from "@/content/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

/**
 * The one real sequence on the page, drawn as a stepper on a literal ruling
 * line — the cerulean line being ruled across the draft is the brand's
 * creative north star. No cards: markers on the line, open text beneath.
 */
export function Process() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-folio-raised py-20 sm:py-28">
      <Container>
        <SectionHeading
          title={
            <>
              From first call to{" "}
              <span className="text-blueprint-deep">full flight</span>
            </>
          }
          subtitle="A simple four-step path. You always know where your project stands."
        />

        {/* Desktop: horizontal stepper — the blueprint line drawn left to right */}
        <div className="relative mt-16 hidden lg:block">
          <motion.div
            aria-hidden
            className="absolute top-6 right-0 left-0 h-px origin-left bg-blueprint"
            initial={reduceMotion ? { opacity: 0 } : { scaleX: 0 }}
            whileInView={reduceMotion ? { opacity: 1 } : { scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <Stagger as="ol" className="relative grid grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <StaggerItem as="li" key={step.title}>
                <div className="flex size-12 items-center justify-center rounded-sm bg-blueprint-tint font-display text-xl text-blueprint-deep">
                  {step.numeral}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[36ch] text-base leading-relaxed text-ink-mid">
                  {step.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Mobile / tablet: vertical stepper down the same line */}
        <Stagger as="ol" className="mt-12 lg:hidden">
          {processSteps.map((step, i) => (
            <StaggerItem
              as="li"
              key={step.title}
              className="relative flex gap-5 pb-10 last:pb-0"
            >
              {i < processSteps.length - 1 && (
                <div
                  aria-hidden
                  className="absolute top-12 left-6 h-[calc(100%-3rem)] w-px -translate-x-1/2 bg-blueprint"
                />
              )}
              <div className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-blueprint-tint font-display text-xl text-blueprint-deep">
                {step.numeral}
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-mid">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
