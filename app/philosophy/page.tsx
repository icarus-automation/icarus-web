import type { Metadata } from "next";
import { Manifesto } from "@/components/philosophy/manifesto";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbs } from "@/lib/schema";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Philosophy: Licensed, Not Subscribed",
  description:
    "Businesses shouldn't have to subscribe forever to use great software. Why Icarus.Automation prices with a one-time license and no recurring subscription fees.",
  alternates: { canonical: "/philosophy" },
  openGraph: pageOpenGraph({
    title: "Pay once. It's yours to keep.",
    description:
      "Every subscription is a bill that never ends. We price software as a one-time licence instead.",
    url: "/philosophy",
  }),
};

export default function PhilosophyPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Our Philosophy", path: "/philosophy" }])} />
      <Manifesto />
    </>
  );
}
