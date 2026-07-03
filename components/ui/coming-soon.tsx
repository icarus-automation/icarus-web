import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Laurel } from "@/components/greek/laurel";

export function ComingSoon({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="marble flex min-h-[70vh] items-center pt-32 pb-20 sm:pt-40">
      <Container>
        <Reveal>
          {/* Canonical kicker: gilt label flanked by a matched laurel pair */}
          <p className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.25em] text-gilt-deep uppercase">
            <Laurel className="h-8 w-5" />
            {eyebrow}
            <Laurel className="h-8 w-5" flip />
          </p>
        </Reveal>
        <SectionHeading title={title} subtitle={subtitle} className="mt-5" />
        <Reveal delay={0.15} className="mt-10 text-center">
          <Button href="/" variant="secondary">
            Back to home
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
