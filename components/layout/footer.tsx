import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { FacebookIcon } from "@/components/icons/facebook";
import { nav, site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Meander } from "@/components/greek/meander";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Meander className="text-gold/70" />
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="font-display text-xl tracking-wide">
              Icarus <span className="text-primary">Automation</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Automation, custom systems, IoT, and affordable POS &amp;
              inventory for Philippine businesses.
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-white/60">
              <MapPin className="size-4 text-primary" />
              Based in the Philippines, serving businesses nationwide
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/solutions/keepinv"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Keep Inv
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">
              Get in touch
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail className="size-4 text-primary" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <FacebookIcon className="size-4 text-primary" />
                  Facebook page
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-display text-xs tracking-[0.2em] text-white/40 uppercase">
            Reach higher.
          </p>
        </div>
      </Container>
    </footer>
  );
}
