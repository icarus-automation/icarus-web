import { Hourglass } from "lucide-react";
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
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <Reveal delay={0.15} className="mt-10 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 text-gold/70">
            <Laurel className="h-10 w-6" />
            <Hourglass className="size-6" />
            <Laurel className="h-10 w-6" flip />
          </div>
          <Button href="/" variant="secondary">
            Back to home
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
