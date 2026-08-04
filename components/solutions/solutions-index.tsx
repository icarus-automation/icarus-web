import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  solutions,
  solutionsFallback,
  solutionsHeader,
} from "@/content/solutions";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Laurel } from "@/components/greek/laurel";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * The whole /solutions body: title, one paragraph, the grid.
 *
 * One section, not three. Stacked section padding between a header band and a
 * grid band was the entire reason the cards used to start below the fold, so
 * there are no bands here to pad against each other. The title runs one line at
 * lg and up, the paragraph sits directly under it, and the cards follow.
 *
 * Everything is left-aligned except the note under the grid, which addresses the
 * visitor no card fits and so belongs to the page rather than to the row.
 */
export function SolutionsIndex() {
  return (
    <section className="marble pt-24 pb-12 sm:pt-28 sm:pb-16">
      <Container>
        <Reveal>
          {/* Left-aligned laurel pair, same treatment as /philosophy. This is
              the page's one gilt element — nothing below it is gilt. */}
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gilt-deep uppercase">
            <Laurel className="h-8 w-5" />
            {solutionsHeader.kicker}
            <Laurel className="h-8 w-5" flip />
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.1] text-balance text-ink lg:text-5xl">
            {solutionsHeader.title}{" "}
            <span className="text-blueprint-deep">{solutionsHeader.accent}</span>
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-pretty text-ink-mid">
            {solutionsHeader.subtitle}
          </p>
        </Reveal>

        <Stagger as="ul" className="mt-8 flex flex-wrap gap-6">
          {solutions.map((solution) => (
            <StaggerItem
              as="li"
              key={solution.name}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <Link
                href={solution.href}
                className="group flex h-full flex-col overflow-hidden rounded-sm border border-ruling bg-folio-raised transition-colors duration-200 hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueprint-deep"
              >
                {/* 4:3 and object-cover, matching how both detail heroes render
                    the same marks. Each mark carries its own baked background:
                    it fills the frame, it is never padded onto a ground. */}
                <div
                  className={cn(
                    "relative aspect-4/3 overflow-hidden border-b border-ruling",
                    solution.tile === "ink" ? "bg-ink" : "bg-folio-raised",
                  )}
                >
                  <Image
                    src={solution.logo}
                    // Decorative: the product name is the next thing read.
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 350px, (min-width: 640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-2xl text-ink">
                    {solution.name}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-pretty text-ink-mid">
                    {solution.blurb}
                  </p>

                  <div className="mt-auto pt-6">
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-ruling pt-4 text-sm">
                      <span className="inline-flex items-center gap-2 font-medium text-ink">
                        <span
                          aria-hidden
                          className={cn(
                            "size-1.5 rounded-sm",
                            solution.status === "Live"
                              ? "bg-blueprint-deep"
                              : "bg-ink-mid/40",
                          )}
                        />
                        {solution.status}
                      </span>
                      <span className="text-ink-mid">{solution.pricing}</span>
                    </div>
                    {/* blueprint-pressed, not blueprint-deep: deep measures
                        4.42:1 on folio-raised and fails AA at this size. The
                        pressed tone clears it at 6.76:1. Do not "restore" it. */}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blueprint-pressed">
                      Explore {solution.name}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-xl text-center text-base leading-relaxed text-pretty text-ink-mid">
            {solutionsFallback.text}{" "}
            <Link
              href={site.cta.href}
              className="group/link inline-flex items-center gap-1 font-medium whitespace-nowrap text-blueprint-deep transition-colors hover:text-blueprint-pressed"
            >
              {solutionsFallback.linkLabel}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
