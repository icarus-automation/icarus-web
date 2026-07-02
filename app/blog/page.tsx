import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/coming-soon";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on automation, systems, and IoT from Icarus Automation. Coming soon.",
  alternates: { canonical: "/blog" },
  // Hidden from nav and sitemap until there is content; keep out of search too
  robots: { index: false, follow: false },
};

export default function BlogPage() {
  return (
    <ComingSoon
      eyebrow="Blog"
      title="Notes from the workshop"
      subtitle="Automation guides, build logs, and lessons from real projects. First posts coming soon."
    />
  );
}
