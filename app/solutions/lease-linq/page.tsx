import type { Metadata } from "next";
import { Check } from "lucide-react";
import { leaselinq, leaselinqModules, leaselinqPoints } from "@/content/lease-linq";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { SolutionDetailHero } from "@/components/solutions/detail-hero";
import { SolutionModuleGrid } from "@/components/solutions/module-grid";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = {
  title: "Lease Linq, Real-Estate Operations System",
  description: leaselinq.oneLiner,
  alternates: { canonical: "/solutions/lease-linq" },
  openGraph: {
    title: "Lease Linq, Real-Estate Operations System",
    description: leaselinq.oneLiner,
  },
};

export default function LeaseLinqPage() {
  return (
    <>
      <SolutionDetailHero
        name={leaselinq.name}
        logo={leaselinq.logo}
        darkLogo
        status={leaselinq.status}
        oneLiner={leaselinq.oneLiner}
        description={leaselinq.description}
      />

      <SolutionModuleGrid
        eyebrow="One system"
        title={
          <>
            Everything under <span className="text-blueprint-deep">one roof</span>
          </>
        }
        subtitle="The whole property operation, unified — no more spreadsheets and scattered apps."
        items={leaselinqModules}
      />

      <section className="border-y border-ruling bg-folio-raised py-20 sm:py-24">
        <Container>
          <SectionHeading
            title="Fitted to your operation"
            subtitle="Lease Linq is built around how you run — not forced into a template."
          />
          <Stagger as="ul" className="mt-12 grid gap-4 sm:grid-cols-3">
            {leaselinqPoints.map((point) => (
              <StaggerItem
                as="li"
                key={point}
                className="flex items-start gap-3 rounded-sm border border-ruling bg-white p-6"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-sm bg-blueprint-tint text-blueprint-deep">
                  <Check className="size-4" />
                </span>
                <p className="text-base font-medium text-ink">{point}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CtaBand
        title="See Lease Linq for your properties"
        subtitle="Book a free demo and we'll map it to your portfolio, tenants, and day-to-day operations."
      />
    </>
  );
}
