"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Faq = { question: string; answer: string };

/**
 * FAQ accordion. Each question is its own toggle (multiple can stay open) so a
 * visitor can line up a few answers side by side rather than losing one to open
 * another. Questions are real headings; the panel is a labelled region. Motion
 * is a height expand, collapsed to a plain fade under reduced-motion since
 * Framer animates via JS and the global CSS guard doesn't reach it.
 */
export function FaqAccordion({ items }: { items: readonly Faq[] }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="divide-y divide-ruling overflow-hidden rounded-sm border border-ruling bg-folio-raised">
      {items.map((faq, i) => {
        const isOpen = open.has(i);
        return (
          <div key={faq.question}>
            <h2>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-folio focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blueprint-deep"
              >
                <span className="text-lg font-medium text-ink">{faq.question}</span>
                <Plus
                  aria-hidden
                  className={cn(
                    "size-5 shrink-0 text-blueprint-deep transition-transform duration-300 ease-out",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h2>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0.15 : 0.32, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[68ch] px-6 pb-5 text-base leading-relaxed text-pretty text-ink-mid">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
