import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { TrustedBy } from "@/components/home/trusted-by";
import { Services } from "@/components/home/services";
import { Process } from "@/components/home/process";
import { KeepInvTeaser } from "@/components/home/keepinv-teaser";
import { CtaBand } from "@/components/home/cta-band";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  // Title falls through to the layout default — this page is the brand landing.
  description:
    "We build n8n automations, custom web systems, IoT, and affordable POS & inventory software for Philippine businesses. Enterprise capability without the enterprise price. Book a free demo.",
  alternates: { canonical: "/" },
  openGraph: pageOpenGraph({
    // The link title Facebook prints in bold under the card. It is written to
    // be read on its own, so it repeats the promise instead of the brand name —
    // the card image already carries the logo.
    title: "Automation that works as hard as you do",
    description:
      "And it never clocks out. Automation, custom systems and IoT for Philippine businesses: enterprise capability, without the enterprise price. Free demo, no obligation.",
    url: "/",
  }),
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Services />
      <Process />
      <KeepInvTeaser />
      <CtaBand />
    </>
  );
}
