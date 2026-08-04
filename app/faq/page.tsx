import type { Metadata } from "next";
import { faqs } from "@/content/site";
import { Container } from "@/components/ui/container";
import { FaqHero } from "@/components/faq/hero";
import { FaqAccordion } from "@/components/faq/accordion";
import { CtaBand } from "@/components/home/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbs, faqPageSchema } from "@/lib/schema";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ: Timelines, Payment & Support",
  description:
    "Answers to what Philippine business owners ask us first: how soon it goes live, how payment works, what happens when you need changes, whether we supply the hardware, and what it takes on your side.",
  alternates: { canonical: "/faq" },
  openGraph: pageOpenGraph({
    title: "Straight answers, no vague “soon”",
    description:
      "Timelines, payment terms, changes after launch, hardware, and what it takes on your side.",
    url: "/faq",
  }),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageSchema} />
      <JsonLd data={breadcrumbs([{ name: "FAQ", path: "/faq" }])} />
      <FaqHero />
      <section className="border-t border-ruling py-20 sm:py-28">
        <Container className="max-w-3xl">
          <FaqAccordion items={faqs} />
        </Container>
      </section>
      <CtaBand
        title="Still have a question?"
        subtitle="Book a free demo and ask us anything. We'll map out what to automate or build for you, then send a clear quote with no obligation."
      />
    </>
  );
}
