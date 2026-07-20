import Image from "next/image";
import { clients } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function TrustedBy() {
  return (
    <section className="border-y border-ruling bg-folio-raised py-14 sm:py-16">
      <Container>
        <Reveal>
          <p className="text-center text-xs font-semibold tracking-[0.25em] text-ink-mid/80 uppercase">
            Trusted by Philippine businesses
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16">
            {clients.map((client) => (
              <li key={client.name}>
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={client.w}
                  height={client.h}
                  sizes="(max-width: 640px) 130px, 160px"
                  className="h-12 w-auto object-contain opacity-55 grayscale transition duration-500 ease-out hover:opacity-100 hover:grayscale-0 sm:h-14"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
