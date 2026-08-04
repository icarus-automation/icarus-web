import type { Metadata } from "next";
import { keepinv } from "@/content/keepinv";
import { KeepInvHero } from "@/components/keepinv/hero";
import { KeepInvVideo } from "@/components/keepinv/video";
import { KeepInvFeatures } from "@/components/keepinv/features";
import { KeepInvPricing } from "@/components/keepinv/pricing";
import { KeepInvTestimonials } from "@/components/keepinv/testimonials";
import { KeepInvGallery } from "@/components/keepinv/gallery";
import { CtaBand } from "@/components/home/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbs, keepinvSchema } from "@/lib/schema";
import { pageOpenGraph } from "@/lib/seo";

// This page is the landing target for Facebook/YouTube ads — keep it
// self-contained with its own metadata and OG data.
export const metadata: Metadata = {
  // Leads with the product name and the two terms buyers actually search for.
  title: "Keep Inv: RFID Inventory & POS System",
  description:
    "Affordable inventory management with POS for Philippine businesses. Audit thousands of assets in seconds with RFID. From ₱1,299 lifetime: one payment, no subscription.",
  alternates: { canonical: "/solutions/keepinv" },
  openGraph: pageOpenGraph({
    title: "Audit a warehouse in seconds",
    description:
      "RFID inventory and POS from ₱1,299 lifetime. One payment, no subscription, hardware included.",
    url: "/solutions/keepinv",
  }),
};

export default function KeepInvPage() {
  return (
    <>
      {/* SoftwareApplication with a real Offer per tier — this is the page most
          likely to earn a price-bearing rich result. */}
      <JsonLd data={keepinvSchema} />
      <JsonLd
        data={breadcrumbs([
          { name: "Solutions", path: "/solutions" },
          { name: keepinv.name, path: "/solutions/keepinv" },
        ])}
      />
      <KeepInvHero />
      <KeepInvVideo />
      <KeepInvFeatures />
      <KeepInvPricing />
      <KeepInvTestimonials />
      <KeepInvGallery />
      <CtaBand
        title="See Keep Inv on your own counter"
        subtitle="Book a free demo and we'll walk you through the POS, inventory, and RFID auditing with your own products."
      />
    </>
  );
}
