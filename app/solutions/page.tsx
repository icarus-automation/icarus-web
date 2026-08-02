import type { Metadata } from "next";
import { solutionsHero } from "@/content/solutions";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SolutionCards } from "@/components/solutions/solution-cards";
import { WaysWeBuild } from "@/components/solutions/ways-we-build";
import { Industries } from "@/components/solutions/industries";
import { TrustedBy } from "@/components/home/trusted-by";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Software live in Philippine businesses today — from Lease Linq for property operations to Keep Inv for inventory & POS, plus custom automation, systems, and IoT built to fit.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <section className="marble pt-28 pb-4 sm:pt-36 sm:pb-8">
        <Container>
          <SectionHeading
            eyebrow="Solutions"
            title={solutionsHero.title}
            subtitle={solutionsHero.subtitle}
          />
        </Container>
      </section>

      <SolutionCards />
      <WaysWeBuild />
      <Industries />
      <TrustedBy />
      <CtaBand
        title="Which problem should we solve first?"
        subtitle="Book a free demo and we'll show you exactly what we can build for your business. No obligation."
      />
    </>
  );
}
