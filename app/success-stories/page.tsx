import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/coming-soon";

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "Successful implementations from Icarus Automation clients. Coming soon.",
  alternates: { canonical: "/success-stories" },
};

export default function SuccessStoriesPage() {
  return (
    <ComingSoon
      eyebrow="Success stories"
      title="Stories of businesses in flight"
      subtitle="We're documenting our clients' successful implementations. The first stories land here soon."
    />
  );
}
