import type { Metadata } from "next";
import { Mail, Clock } from "lucide-react";
import { FacebookIcon } from "@/components/icons/facebook";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Book a Free Demo",
  description:
    "Book a free demo with Icarus.Automation. Automation, custom systems, IoT, and POS & inventory for Philippine businesses.",
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
    value: "Icarus.Automation",
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
      </Container>

      {/* Full-width booking calendar: tall enough that the embed never scrolls internally */}
      <Container className="mt-12 max-w-7xl">
        <Reveal>
          <div className="overflow-hidden rounded-sm border border-ruling bg-white">
            <iframe
              src={site.bookingUrl}
              title="Book a free demo with Icarus.Automation"
              className="h-300 w-full md:h-275"
              loading="lazy"
            />
          </div>
        </Reveal>
      </Container>

      <Container className="mt-12 max-w-4xl">
        <Reveal>
          <p className="text-center text-sm text-ink-mid">
            Prefer to reach out directly? These work too.
          </p>
        </Reveal>
        <Stagger className="mt-5 grid gap-4 sm:grid-cols-3">
          {channels.map((channel) => {
            const content = (
              <div
                className={cn(
                  "flex h-full items-start gap-3.5 rounded-sm border border-ruling bg-folio-raised p-4",
                  channel.href && "transition-colors hover:border-ink/30",
                )}
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-blueprint-tint text-blueprint-deep">
                  <channel.icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">
                    {channel.label}
                  </p>
                  <p className="truncate text-sm text-ink-mid">
                    {channel.value}
                  </p>
                </div>
              </div>
            );
            return (
              <StaggerItem key={channel.label}>
                {channel.href ? (
                  <a
                    href={channel.href}
                    className="block h-full"
                    {...(channel.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
