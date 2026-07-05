import Image from "next/image";
import { clients } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function TrustedBy() {
  return (
    <section className="border-y border-ruling bg-folio-raised py-10">
      <Container>
        <Reveal>
          <p className="text-center text-xs font-semibold tracking-[0.25em] text-ink-mid uppercase">
            Trusted by Philippine businesses
          </p>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {clients.map((client) => (
              <li key={client.name} className="flex items-center">
                {client.logo ? (
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    width={140}
                    height={48}
                    className="h-10 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  />
                ) : (
                  <span className="font-display text-lg tracking-wide text-ink/60 transition-colors duration-300 hover:text-ink">
                    {client.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
