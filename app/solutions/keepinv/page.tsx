import type { Metadata } from "next";
import { keepinv } from "@/content/keepinv";
import { KeepInvHero } from "@/components/keepinv/hero";
import { KeepInvVideo } from "@/components/keepinv/video";
import { KeepInvFeatures } from "@/components/keepinv/features";
import { KeepInvPricing } from "@/components/keepinv/pricing";
import { KeepInvTestimonials } from "@/components/keepinv/testimonials";
import { CtaBand } from "@/components/home/cta-band";

// This page is the landing target for Facebook/YouTube ads — keep it
// self-contained with its own metadata and OG data.
export const metadata: Metadata = {
  title: "Keep Inv, Affordable Inventory & POS System",
  description: keepinv.oneLiner,
  alternates: { canonical: "/solutions/keepinv" },
  openGraph: {
    title: "Keep Inv, Affordable Inventory & POS System",
    description: keepinv.oneLiner,
  },
};

export default function KeepInvPage() {
  return (
    <>
      <KeepInvHero />
      <KeepInvVideo />
      <KeepInvFeatures />
      <KeepInvPricing />
      <KeepInvTestimonials />
      <CtaBand
        title="See Keep Inv on your own counter"
        subtitle="Book a free demo and we'll walk you through the POS, inventory, and RFID auditing with your own products."
      />
    </>
  );
}
