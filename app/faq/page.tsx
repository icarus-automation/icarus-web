import type { Metadata } from "next";
import { faqs } from "@/content/site";
import { Container } from "@/components/ui/container";
import { FaqHero } from "@/components/faq/hero";
import { FaqAccordion } from "@/components/faq/accordion";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to what Philippine business owners ask us first — cost, timelines, hardware, where we work, and support after launch.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
