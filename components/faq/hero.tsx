import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Laurel } from "@/components/greek/laurel";
import { Reveal } from "@/components/motion/reveal";

export function FaqHero() {
  return (
    <section className="marble pt-28 pb-14 text-center sm:pt-36 sm:pb-18">
      <Container>
        <Reveal className="mx-auto max-w-2xl">
          <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gilt-deep uppercase">
            <Laurel className="h-8 w-5" />
            FAQ
            <Laurel className="h-8 w-5" flip />
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-balance text-ink sm:text-5xl">
            The questions we hear most
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-pretty text-ink-mid">
            The things business owners ask us first — cost, timelines, hardware, and
            what happens once you’re up and running. If yours isn’t here, just ask.
          </p>
          <p className="mt-6">
            <Link
              href={site.cta.href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blueprint-deep transition-colors hover:text-blueprint-pressed"
            >
              Ask us anything
              <ArrowUpRight className="size-4" />
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
