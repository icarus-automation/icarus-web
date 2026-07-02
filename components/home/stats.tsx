"use client";

import CountUp from "react-countup";
import { useInView } from "motion/react";
import { useRef } from "react";
import { stats } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Meander } from "@/components/greek/meander";

export function Stats() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-ink text-white">
      <Meander className="text-gold/50" />
      <Container className="py-16 sm:py-20">
        {/* TODO: replace placeholder figures in content/site.ts with real numbers */}
        <ul
          ref={ref}
          className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <li key={stat.label} className="text-center">
              <p className="font-display text-4xl text-gold sm:text-5xl">
                {inView ? (
                  <CountUp end={stat.value} duration={2} separator="," />
                ) : (
                  0
                )}
                {stat.suffix}
              </p>
              <p className="mt-2 text-sm tracking-wide text-white/60">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </Container>
      <Meander className="rotate-180 text-gold/50" />
    </section>
  );
}
