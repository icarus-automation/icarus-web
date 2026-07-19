"use client";

import { useRef } from "react";

/**
 * The bright blue field + duotone Icarus plate that fills a card edge-to-edge
 * (transparent-card treatment, like Hermes). On hover the plate zooms slightly
 * and parallax-pans toward the cursor, giving the "living image" motion; it
 * eases back to the shared grid alignment on leave. Reduced motion opts out.
 *
 * `art` carries the shared-background size/position classes so the plate stays
 * one continuous engraving across the 2×2 grid.
 */
export function ServiceCardArt({
  image,
  art,
  children,
}: {
  image: string;
  art: string;
  children: React.ReactNode;
}) {
  const artRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = artRef.current;
      if (el) {
        el.style.transform = `scale(1.1) translate3d(${px * -16}px, ${py * -16}px, 0)`;
      }
    });
  }

  function handleLeave() {
    cancelAnimationFrame(raf.current);
    const el = artRef.current;
    if (el) el.style.transform = "scale(1) translate3d(0, 0, 0)";
  }

  return (
    <div
      className="relative flex flex-1 flex-col justify-end"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* bright blue field */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(160deg,#0d86d2_0%,#0074c2_55%,#0468a8_100%)]"
      />
      {/* duotone engraving — one plate spanning the whole grid */}
      <div
        ref={artRef}
        aria-hidden
        style={{ backgroundImage: `url(${image})` }}
        className={`absolute inset-0 bg-no-repeat transition-transform duration-300 ease-out [will-change:transform] ${art}`}
      />
      {/* light gradient only at the base so the copy stays legible */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(3,16,30,0.9)_0%,rgba(3,16,30,0.52)_16%,rgba(3,16,30,0.14)_36%,transparent_54%)]"
      />

      <div className="relative p-7 [text-shadow:0_1px_12px_rgba(2,13,25,0.6)] sm:p-8">
        {children}
      </div>
    </div>
  );
}
