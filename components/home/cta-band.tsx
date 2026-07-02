import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SunRays } from "@/components/greek/sun-rays";
import { Reveal } from "@/components/motion/reveal";

export function CtaBand({
  title = "Ready to reach higher?",
  subtitle = "Book a free demo and we'll show you exactly what we can automate, build, or connect for your business. No obligation.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      <SunRays
        className="pointer-events-none absolute -top-1/2 left-1/2 size-[52rem] -translate-x-1/2 opacity-60"
        rays={48}
      />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight text-balance sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            {subtitle}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href={site.cta.href} variant="inverse" size="lg">
              {site.cta.label}
              <ArrowRight className="size-4" />
            </Button>
            <Button
              href={site.facebook}
              variant="ghost"
              size="lg"
              className="text-white/80 hover:text-white"
            >
              Or message us on Facebook
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
