import { keepinv } from "@/content/keepinv";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function KeepInvVideo() {
  return (
    <section className="border-y border-line bg-white py-20 sm:py-24">
      <Container className="max-w-4xl">
        <SectionHeading title="Watch Keep Inv work" />
        <Reveal delay={0.1}>
          {/* TODO: replace youtubeId in content/keepinv.ts with the real ad video once uploaded */}
          <div className="mt-10 overflow-hidden rounded-sm border border-line">
            <iframe
              className="aspect-video w-full"
              src={`https://www.youtube-nocookie.com/embed/${keepinv.youtubeId}`}
              title="Keep Inv product video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
