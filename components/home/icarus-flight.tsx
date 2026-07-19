"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { IcarusGlyph } from "@/components/greek/icarus-glyph";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/**
 * Decorative Icarus that flies from Step I to Step IV as the section scrolls
 * through view. The motion path is an invisible, responsive SVG with a very
 * subtle wave; only transforms are animated (MotionPathPlugin translates the
 * figure — a separate DOM node — so the artwork itself is never distorted by
 * the stretched path).
 *
 * - "desktop": horizontal glide above the ruling line, clear of the numerals.
 * - "mobile": vertical descent in the channel between the numeral boxes and
 *   their text, so it never covers a box or a line of copy.
 *
 * gsap.matchMedia scopes each variant to its breakpoint (and cleans itself up
 * across breakpoint changes); ScrollTrigger auto-refreshes on resize and
 * invalidateOnRefresh re-samples the path, so layout stays correct on resize.
 * prefers-reduced-motion parks Icarus statically near the final step.
 */
export function IcarusFlight({
  variant,
  triggerRef,
}: {
  variant: "desktop" | "mobile";
  triggerRef: React.RefObject<HTMLElement | null>;
}) {
  const figureRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const figure = figureRef.current;
    const path = pathRef.current;
    const trigger = triggerRef.current;
    if (!figure || !path || !trigger) return;

    const breakpoint =
      variant === "desktop" ? "(min-width: 1024px)" : "(max-width: 1023.98px)";

    const mm = gsap.matchMedia();
    mm.add(
      { active: breakpoint, reduce: "(prefers-reduced-motion: reduce)" },
      (ctx) => {
        const conditions = ctx.conditions as {
          active: boolean;
          reduce: boolean;
        };
        // Wrong breakpoint: the overlay is display:none — leave it be.
        if (!conditions.active) return;

        const motionPath = {
          path,
          align: path,
          alignOrigin: [0.5, 0.5] as [number, number],
          autoRotate: false,
        };

        // Reduced motion: park statically near the final step, no scroll link.
        if (conditions.reduce) {
          gsap.set(figure, {
            opacity: 1,
            motionPath: { ...motionPath, start: 1, end: 1 },
          });
          return;
        }

        gsap.set(figure, { opacity: 1 });
        gsap.to(figure, {
          ease: "none",
          motionPath: { ...motionPath, start: 0, end: 1 },
          scrollTrigger: {
            trigger,
            start: "top 78%",
            end: "bottom 62%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      },
    );

    return () => mm.revert();
  }, [variant, triggerRef]);

  if (variant === "desktop") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute -top-14 right-0 left-0 z-10 hidden h-10 overflow-visible lg:block"
      >
        <svg
          viewBox="0 0 1000 40"
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
        >
          <path
            ref={pathRef}
            d="M30 21C200 15 340 26 500 20 660 15 720 25 800 20"
            fill="none"
            stroke="none"
          />
        </svg>
        <div ref={figureRef} className="absolute top-0 left-0 opacity-0">
          <IcarusGlyph className="h-8 w-8 drop-shadow-[0_2px_6px_rgba(0,116,194,0.18)]" />
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 bottom-0 left-12 z-10 w-5 overflow-visible lg:hidden"
    >
      <svg
        viewBox="0 0 20 1000"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        {/* Wave kept tight (x∈[8.5,11.5]) so the 14px figure stays inside the
            20px channel — clear of the box (ends at 48px) and text (from 68px). */}
        <path
          ref={pathRef}
          d="M10 20C8.5 220 11.5 440 10 620 8.5 760 11.5 840 10 880"
          fill="none"
          stroke="none"
        />
      </svg>
      <div ref={figureRef} className="absolute top-0 left-0 opacity-0">
        <IcarusGlyph className="h-3.5 w-3.5 drop-shadow-[0_2px_6px_rgba(0,116,194,0.18)]" />
      </div>
    </div>
  );
}
