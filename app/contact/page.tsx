import type { Metadata } from "next";
import { Mail, Clock } from "lucide-react";
import { FacebookIcon } from "@/components/icons/facebook";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Book a Free Demo",
  description:
    "Book a free demo with Icarus Automation. Automation, custom systems, IoT, and POS & inventory for Philippine businesses.",
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    icon: Mail,
    label: "Email us",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: FacebookIcon,
    label: "Message us on Facebook",
    value: "Icarus Automation",
    href: site.facebook,
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within one business day",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <section className="marble pt-28 pb-20 sm:pt-36 sm:pb-28">
      <Container>
        <SectionHeading
          title="Book your free demo"
          subtitle="Pick a time that works for you. 30 minutes, no obligation, Tagalog or English."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-[1fr_280px]">
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-sm border border-line bg-white">
              <iframe
                src={site.bookingUrl}
                title="Book a free demo with Icarus Automation"
                className="h-[52rem] w-full"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <aside className="space-y-4">
              <p className="text-sm leading-relaxed text-ink-muted">
                Prefer to reach out directly? These work too.
              </p>
              {channels.map((channel) => {
                const content = (
                  <div className="flex items-start gap-3.5 rounded-sm border border-line bg-white p-5 transition-colors hover:border-ink/30">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-primary-soft text-primary-deep">
                      <channel.icon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">
                        {channel.label}
                      </p>
                      <p className="truncate text-sm text-ink-muted">
                        {channel.value}
                      </p>
                    </div>
                  </div>
                );
                return channel.href ? (
                  <a
                    key={channel.label}
                    href={channel.href}
                    className="block"
                    {...(channel.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={channel.label}>{content}</div>
                );
              })}
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
