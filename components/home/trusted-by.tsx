import Image from "next/image";
import { clients } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export function TrustedBy() {
  return (
    <section className="border-y border-ruling bg-folio-raised py-14 sm:py-16">
      <Container>
        <Reveal>
          <p className="text-center text-xs font-semibold tracking-[0.25em] text-ink-mid/80 uppercase">
            Trusted by Philippine businesses
          </p>
        </Reveal>

        {/* Logos arrive one after another rather than as a block, so the row
            reads as six separate engagements. Hover lifts a single logo out of
            the even grey tone: colour returns and it grows just enough to
            register as picked up, on the house easing curve. */}
        <Stagger
          as="ul"
          delay={0.1}
          className="mt-9 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16"
        >
          {clients.map((client) => (
            <StaggerItem as="li" key={client.name}>
              <Image
                src={client.logo}
                alt={client.name}
                width={client.w}
                height={client.h}
                sizes="(max-width: 640px) 130px, 160px"
                className="h-12 w-auto object-contain opacity-55 grayscale transition duration-500 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] hover:scale-[1.06] hover:opacity-100 hover:grayscale-0 sm:h-14"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
