import type { Metadata } from "next";
import { SolutionsIndex } from "@/components/solutions/solutions-index";
import { CtaBand } from "@/components/home/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbs } from "@/lib/schema";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Solutions: Systems We’ve Built",
  description:
    "Software running in Philippine businesses today. Keep Inv for inventory and POS, Lease Linq for property operations, and custom automation, systems and IoT for everything else.",
  alternates: { canonical: "/solutions" },
  openGraph: pageOpenGraph({
    title: "Systems that run real businesses",
    description:
      "Keep Inv for inventory and POS, Lease Linq for property operations, and custom builds for everything else.",
    url: "/solutions",
  }),
};

/**
 * The browse-and-decide page. A visitor should be looking at real products, not
 * at an introduction, so the header is deliberately short and everything left
 * of the fold is the grid. Trusted-by and the industries strip live on the home
 * page; repeating them here only pushed the products further down.
 */
export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Solutions", path: "/solutions" }])} />
      <SolutionsIndex />
      <CtaBand
        title="Which one sounds like your business?"
        subtitle="Book a free demo and we’ll walk you through the one that fits, using your own business as the example. Thirty minutes, no obligation."
      />
    </>
  );
}
