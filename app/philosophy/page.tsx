import type { Metadata } from "next";
import { Manifesto } from "@/components/philosophy/manifesto";

export const metadata: Metadata = {
  title: "Our Philosophy",
  description:
    "Businesses shouldn't have to subscribe forever to use great software. Why Icarus.Automation keeps pricing simple — a one-time license, no recurring subscription fees.",
  alternates: { canonical: "/philosophy" },
};

export default function PhilosophyPage() {
  return <Manifesto />;
}
