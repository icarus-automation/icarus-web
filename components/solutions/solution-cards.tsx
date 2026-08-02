import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { flagships } from "@/content/solutions";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Flagship showcase for the /solutions hub. Problem-led: each card leads with
 * the pain it removes, then the solution. Only real, shippable solutions here.
 */
export function SolutionCards() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          align="left"
          title={
            <>
              Solutions that <span className="text-blueprint-deep">ship</span>
            </>
          }
          subtitle="Real systems solving real problems — pick the one that sounds like your business."
        />
        <Stagger as="ul" className="mt-12 grid gap-6 lg:grid-cols-3">
          {flagships.map((f) => (
            <StaggerItem
              as="li"
              key={f.name}
              className={f.primary ? "lg:col-span-2" : ""}
            >
              <Link
                href={f.href}
                className="group flex h-full flex-col overflow-hidden rounded-sm border border-ruling bg-folio-raised transition-colors duration-200 hover:border-ink/30"
              >
                <div
                  className={cn(
                    "relative overflow-hidden",
                    f.primary ? "aspect-16/9" : "aspect-3/2",
                    f.darkLogo ? "bg-ink" : "bg-white",
                  )}
                >
                  <Image
                    src={f.logo}
                    alt={`${f.name} logo`}
                    fill
                    sizes={f.primary ? "(min-width: 1024px) 66vw, 90vw" : "(min-width: 1024px) 33vw, 90vw"}
                    className={cn(
                      "transition-transform duration-500 group-hover:scale-105",
                      f.darkLogo ? "object-cover" : "object-contain p-8",
                    )}
                  />
                  <span className="absolute top-4 left-4">
                    <Badge>{f.status}</Badge>
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold tracking-[0.18em] text-gilt-deep uppercase">
                    {f.problem}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-ink">
                    {f.name}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-ink-mid">
                    {f.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blueprint-deep">
                    Explore
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
