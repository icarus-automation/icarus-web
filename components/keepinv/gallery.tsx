import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

// TODO: replace placeholder photos with real client deployment shots
const photos = [
  {
    src: "/assets/keep-inv-logo.png",
    alt: "Keep Inv logo",
    caption: "The POS in daily use at a client's counter",
  },
  {
    src: "/assets/keep-inv-logo.png",
    alt: "Keep Inv logo",
    caption: "An RFID audit sweep in the stockroom",
  },
  {
    src: "/assets/keep-inv-logo.png",
    alt: "Keep Inv logo",
    caption: "Printers and scanners set up on site",
  },
] as const;

export function KeepInvGallery() {
  return (
    <section className="border-y border-ruling bg-folio-raised py-20 sm:py-24">
      <Container>
        <SectionHeading
          title="Keep Inv, out in the field"
          subtitle="Not mockups — real businesses running their counters and stockrooms on Keep Inv."
        />
        <Stagger className="mt-12 grid gap-4 lg:grid-cols-[1.6fr_1fr] lg:grid-rows-2">
          {photos.map((photo, i) => (
            <StaggerItem key={photo.caption} className={i === 0 ? "lg:row-span-2" : undefined}>
              <figure className="flex h-full flex-col">
                <div
                  className={
                    i === 0
                      ? "relative aspect-4/3 min-h-0 overflow-hidden rounded-sm border border-ruling lg:aspect-auto lg:flex-1"
                      : "relative aspect-3/2 overflow-hidden rounded-sm border border-ruling"
                  }
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={
                      i === 0
                        ? "(min-width: 1024px) 60vw, 90vw"
                        : "(min-width: 1024px) 35vw, 90vw"
                    }
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-sm text-ink-mid">
                  {photo.caption}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
