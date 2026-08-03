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
  title: "FAQ — Cost, Timelines & Support",
  description:
    "Answers to what Philippine business owners ask us first: how much it costs, how soon it goes live, whether we supply hardware, where we work, and support after launch.",
  alternates: { canonical: "/faq" },
  openGraph: pageOpenGraph({
    title: "Straight answers, no vague “soon”",
    description:
      "Cost, timelines, hardware, where we work, and what happens after launch.",
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
        subtitle="Book a free demo and ask us anything. We'll map out what to automate or build for you and send a clear quote — no obligation."
      />
    </>
  );
}
