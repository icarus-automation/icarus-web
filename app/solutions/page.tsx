import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hourglass } from "lucide-react";
import { keepinv } from "@/content/keepinv";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Products and systems we've launched for Philippine businesses, starting with Keep Inv, our affordable inventory management and POS platform.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <section className="marble pt-28 pb-16 sm:pt-36 sm:pb-20">
        <Container>
          <SectionHeading
            title="Solutions we've launched"
            subtitle="Real software, live in the market. Each solution covers the problem, the build, and the pricing."
          />

          <Stagger as="ul" className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <StaggerItem as="li">
              <Link
                href="/solutions/keepinv"
                className="group block overflow-hidden rounded-sm border border-ruling bg-folio-raised transition-colors duration-200 hover:border-ink/30"
              >
                <div className="relative aspect-3/2 overflow-hidden">
                  <Image
                    src="/assets/keep-inv-logo.png"
                    alt="Keep Inv logo"
                    fill
                    sizes="(min-width: 1024px) 33vw, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <Badge>Live product</Badge>
                  <h2 className="mt-3 text-lg font-semibold text-ink">
                    {keepinv.name}
                  </h2>
                  <p className="mt-2 text-base leading-relaxed text-ink-mid">
                    {keepinv.oneLiner}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blueprint-deep">
                    See features &amp; pricing
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>

            {["Next product", "Your project?"].map((label) => (
              <StaggerItem as="li" key={label}>
                <div className="flex h-full min-h-64 flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-ruling bg-folio-raised p-6 text-center">
                  <Hourglass aria-hidden className="size-6 text-ink/30" />
                  <p className="text-base font-medium text-ink-mid">{label}</p>
                  <p className="text-sm text-ink-mid">
                    {label === "Your project?"
                      ? "The next solution here could be the system we build for you."
                      : "In development. Coming soon."}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
