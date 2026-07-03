"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the drawer is open; close it if the viewport grows to desktop
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled
          ? "border-b border-ruling bg-folio"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-18">
        <Link
          href="/"
          className="font-display text-lg tracking-wide text-ink"
          aria-label={`${site.name}, home`}
        >
          Icarus<span className="text-blueprint-deep">.Automation</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-sm px-3.5 py-2 text-sm transition-colors",
                isActive(item.href)
                  ? "font-semibold text-blueprint-deep"
                  : "text-ink-mid hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={site.cta.href} size="sm">
            {site.cta.label}
          </Button>
        </div>

        <button
          className="flex size-10 items-center justify-center rounded-sm text-ink md:hidden"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
      </Container>

      {/* Right-side drawer (mobile). z-scale: backdrop 70, panel 80. */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[70] bg-ink/50 md:hidden"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
              animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="fixed inset-y-0 right-0 z-[80] flex w-[82%] max-w-sm flex-col border-l border-ruling bg-folio md:hidden"
            >
              <div className="flex items-center justify-between border-b border-ruling px-6 py-4">
                <p className="text-xs font-semibold tracking-[0.25em] text-ink uppercase">
                  Menu
                </p>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex size-9 items-center justify-center rounded-sm border border-ruling text-ink transition-colors hover:border-ink/40"
                >
                  <X className="size-4" />
                </button>
              </div>

              <nav
                aria-label="Mobile"
                className="flex-1 overflow-y-auto px-6"
              >
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.05,
                      duration: 0.35,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex border-b border-ruling py-4 text-sm font-semibold tracking-[0.2em] uppercase transition-colors",
                        isActive(item.href)
                          ? "text-blueprint-deep"
                          : "text-ink-mid hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="border-t border-ruling p-6">
                <Button
                  href={site.cta.href}
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  {site.cta.label}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
