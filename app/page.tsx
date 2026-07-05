import { Hero } from "@/components/home/hero";
import { TrustedBy } from "@/components/home/trusted-by";
import { Services } from "@/components/home/services";
import { Process } from "@/components/home/process";
import { KeepInvTeaser } from "@/components/home/keepinv-teaser";
import { Proof } from "@/components/home/proof";
import { Faq } from "@/components/home/faq";
import { CtaBand } from "@/components/home/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Services />
      <Process />
      <KeepInvTeaser />
      <Proof />
      <Faq />
      <CtaBand />
    </>
  );
}
