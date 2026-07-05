"use client";

import { motion, useScroll } from "motion/react";

/**
 * Page scroll progress — the ruling line being drawn across the top of the
 * draft. Directly bound to scroll position (Lenis drives native scroll, so
 * useScroll tracks it); no autonomous animation, so reduced-motion safe.
 * z-index scale: nav 50 → progress 60 → drawer backdrop 70 → drawer 80.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.75 origin-left bg-blueprint-deep"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
