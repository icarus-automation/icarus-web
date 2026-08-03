import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/coming-soon";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbs } from "@/lib/schema";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "Automation, custom system, and IoT implementations we've delivered for Philippine businesses. We're documenting the first stories now.",
  alternates: { canonical: "/success-stories" },
  openGraph: pageOpenGraph({
    title: "Businesses already in flight",
    description:
      "We're documenting what our clients built with us. The first stories land here soon.",
    url: "/success-stories",
  }),
};

export default function SuccessStoriesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbs([{ name: "Success Stories", path: "/success-stories" }])}
      />
      <ComingSoon
        eyebrow="Success stories"
        title="Stories of businesses in flight"
        subtitle="We're documenting our clients' successful implementations. The first stories land here soon."
      />
    </>
  );
}
