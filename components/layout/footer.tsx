import Link from "next/link";
import { FileCheck, Mail, MapPin } from "lucide-react";
import { FacebookIcon } from "@/components/icons/facebook";
import { nav, site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Meander } from "@/components/greek/meander";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      {/* The footer's single gilt moment (Gilt Discipline Rule) */}
      <Meander className="text-gilt/70" />
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="font-display text-xl tracking-wide">
              Icarus<span className="text-blueprint">.Automation</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Automation, custom systems, IoT, and affordable POS &amp;
              inventory for Philippine businesses.
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-white/60">
              <MapPin className="size-4 text-blueprint" />
              Based in the Philippines, serving businesses nationwide
            </p>
            <a
              href="/BNRS_Certificate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <FileCheck className="size-4 text-blueprint" />
              DTI-registered business — view certificate
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-semibold tracking-[0.25em] text-white/60 uppercase">
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
            <p className="text-xs font-semibold tracking-[0.25em] text-white/60 uppercase">
              Get in touch
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail className="size-4 text-blueprint" />
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
                  <FacebookIcon className="size-4 text-blueprint" />
                  Icarus.Automation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-xs font-semibold tracking-[0.25em] text-white/60 uppercase">
            Reach higher.
          </p>
        </div>
      </Container>
    </footer>
  );
}
