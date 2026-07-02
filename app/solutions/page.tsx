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
                className="group block overflow-hidden rounded-sm border border-line bg-white transition-colors duration-200 hover:border-ink/30"
              >
                <div className="relative aspect-3/2 overflow-hidden">
                  <Image
                    src="/assets/pxl-default-image.png"
                    alt="Replace with: Keep Inv solution cover, POS and inventory dashboard"
                    fill
                    sizes="(min-width: 1024px) 33vw, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <Badge>Live product</Badge>
                  <h2 className="mt-3 font-display text-xl text-ink">
                    {keepinv.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {keepinv.oneLiner}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-deep">
                    See features &amp; pricing
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>

            {["Next product", "Your project?"].map((label) => (
              <StaggerItem as="li" key={label}>
                <div className="flex h-full min-h-64 flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-line bg-surface-2/60 p-6 text-center">
                  <Hourglass className="size-6 text-gold/60" />
                  <p className="font-display text-lg text-ink-muted">{label}</p>
                  <p className="text-sm text-ink-muted/70">
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
