"use client";

import { motion, useReducedMotion } from "motion/react";
import { philosophy } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Laurel } from "@/components/greek/laurel";
import { Reveal } from "@/components/motion/reveal";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "-80px" } as const;

/**
 * The philosophy on one fold. A left-aligned statement — laurel kicker, title,
 * and belief in the site's section-heading format — heads the fold; beneath it
 * the reasoning
 * runs down the left in two paragraphs with the legend below, while the proof
 * (a cumulative-cost line) sits on the right, its top aligned to the first
 * paragraph. Subscription climbs forever; the one-time license goes flat; the
 * shaded wedge is what a client keeps by owning. Kept on the folio ground so
 * the transparent navbar reads.
 */
export function Manifesto() {
  const reduce = useReducedMotion();

  const draw = (duration: number, delay = 0) =>
    reduce
      ? { initial: { pathLength: 1 } }
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: VIEWPORT,
          transition: { duration, delay, ease: EASE },
        };

  const fade = (delay: number) =>
    reduce
      ? { initial: { opacity: 1 } }
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: VIEWPORT,
          transition: { duration: 0.6, delay, ease: "easeOut" as const },
        };

  return (
    <section className="marble flex min-h-svh items-center pt-28 pb-16 sm:pt-32 sm:pb-20">
      <Container>
        {/* Left-aligned statement heading in the site's SectionHeading
            typography; the reasoning and proof sit in the grid beneath. */}
        <Reveal className="max-w-2xl">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gilt-deep uppercase">
            <Laurel className="h-8 w-5" />
            {philosophy.kicker}
            <Laurel className="h-8 w-5" flip />
          </p>
          <h1 className="mt-4 font-display text-3xl leading-tight text-balance text-ink sm:text-4xl md:text-[2.75rem]">
            {philosophy.title}
            <span className="text-gilt">.</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-pretty text-ink-mid">
            {philosophy.lead}
          </p>
        </Reveal>

        {/* Reasoning on the left; the proof on the right, its top aligned to
            the first paragraph via items-start rather than centered. */}
        <div className="mt-14 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <Reveal delay={0.18}>
              <p className="max-w-xl text-lg leading-relaxed text-pretty text-justify text-ink-mid">
                {philosophy.body}
              </p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-justify text-ink-mid">
                {philosophy.contrast}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <dl className="mt-9 space-y-6">
                {philosophy.legend.map((item) => (
                  <div key={item.label}>
                    <dt className="text-sm font-semibold text-blueprint-deep">
                      {item.label}
                    </dt>
                    <dd className="text-sm text-ink-mid">{item.note}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* The statistics */}
          <Reveal delay={0.2} className="min-w-0">
            <figure className="mx-auto max-w-md rounded-sm border border-ruling bg-folio-raised p-5 sm:p-6 lg:mr-0 lg:ml-auto">
              <svg
                viewBox="0 0 480 320"
                className="block h-auto w-full max-w-full"
                role="img"
                aria-label="A cumulative-cost chart over five years. The subscription line climbs without stopping, while the one-time license steps up once and then stays flat. After the first year the subscription costs more, and the growing wedge between the two lines is what a client keeps by owning instead of renting."
              >
                {/* grid */}
                <g stroke="var(--color-ink)" strokeOpacity="0.06">
                  {[70, 118, 166, 214].map((y) => (
                    <line key={y} x1="52" y1={y} x2="440" y2={y} />
                  ))}
                  {[149, 246, 343].map((x) => (
                    <line key={x} x1={x} y1="44" x2={x} y2="262" />
                  ))}
                </g>

                {/* axes */}
                <g stroke="var(--color-ink)" strokeOpacity="0.16">
                  <line x1="52" y1="44" x2="52" y2="262" />
                  <line x1="52" y1="262" x2="440" y2="262" />
                </g>

                {/* the wedge: what you keep by owning */}
                <motion.polygon
                  points="147,214 440,66 440,214"
                  fill="var(--color-blueprint-deep)"
                  fillOpacity="0.1"
                  {...fade(reduce ? 0 : 1.1)}
                />

                {/* subscription: the endless climb */}
                <motion.polyline
                  points="52,262 440,66"
                  fill="none"
                  stroke="var(--color-ink-mid)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  {...draw(1.5)}
                />

                {/* one-time: pay once, then flat */}
                <motion.polyline
                  points="52,262 52,214 440,214"
                  fill="none"
                  stroke="var(--color-blueprint-deep)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  {...draw(1.2, reduce ? 0 : 0.25)}
                />

                {/* endpoint markers + annotations */}
                <motion.g {...fade(reduce ? 0 : 1.35)}>
                  <circle cx="440" cy="66" r="3.5" fill="var(--color-ink-mid)" />
                  <text
                    x="434"
                    y="60"
                    textAnchor="end"
                    className="fill-ink-mid font-sans text-[13px]"
                  >
                    Still paying
                  </text>

                  <circle
                    cx="440"
                    cy="214"
                    r="4"
                    fill="var(--color-blueprint-deep)"
                  />
                  <text
                    x="434"
                    y="232"
                    textAnchor="end"
                    className="fill-blueprint-deep font-sans text-[13px] font-semibold"
                  >
                    Paid once
                  </text>

                  <text
                    x="330"
                    y="150"
                    textAnchor="middle"
                    className="fill-ink-mid font-sans text-[12px]"
                  >
                    What you keep
                  </text>
                </motion.g>

                {/* axis labels */}
                <text
                  x="52"
                  y="34"
                  className="fill-ink-mid font-sans text-[11px] tracking-[0.18em] uppercase"
                >
                  Total paid
                </text>
                <text
                  x="52"
                  y="282"
                  className="fill-ink-mid font-sans text-[11px]"
                >
                  Day one
                </text>
                <text
                  x="440"
                  y="282"
                  textAnchor="end"
                  className="fill-ink-mid font-sans text-[11px]"
                >
                  Five years on
                </text>
              </svg>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
