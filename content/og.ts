import type { OgCard } from "@/lib/og";

/**
 * Copy for the social cards, keyed by route. The layout lives in lib/og.tsx;
 * this is the part worth rewriting when a post underperforms.
 *
 * Writing rules, learned from how these actually get seen:
 *
 *   - Messenger and Viber render the card small. The headline has to land at
 *     thumbnail size, so it is two short lines, not one long one.
 *   - Line breaks are authored. Keep each line under ~18 characters to hold the
 *     largest type size; lib/og.tsx steps the size down past that rather than
 *     letting a line collide with the emblem.
 *   - The second line carries the blueprint accent, so put the payoff there.
 *   - The display face has no peso glyph. Prices belong in `sub`, set in Inter.
 *   - `sub` earns the click the headline won — concrete, under ~110 characters.
 */
export const ogCards = {
  home: {
    kicker: "Automation · Custom Systems · IoT",
    lines: ["Automation that works", { text: "as hard as you do.", accent: true }],
    // The turn: matching the owner's effort is the warm half of the promise,
    // never clocking out is the half they can't do themselves.
    sub: "And it never clocks out. Enterprise-grade automation, systems and IoT, without the enterprise price.",
  },

  // Matches the page's own h1, so a click from Facebook lands on the line it
  // was promised.
  solutions: {
    kicker: "Solutions",
    lines: ["Systems that run", { text: "real businesses.", accent: true }],
    sub: "Keep Inv for inventory and POS, Lease Linq for property operations, custom builds for everything else.",
    cta: "See our solutions",
  },

  // Problem-led, matching how the hub card frames it in content/solutions.ts.
  // No price in the sub: Lease Linq is in development and deliberately has no
  // public pricing.
  leaselinq: {
    kicker: "Lease Linq · Real-Estate Operations",
    lines: ["Property run on", { text: "spreadsheets?", accent: true }],
    sub: "Units, tenants, leases, parking and revenue in one system. In development, so book an early demo.",
  },

  keepinv: {
    kicker: "Keep Inv · Inventory & POS",
    lines: ["Audit a warehouse", { text: "in seconds.", accent: true }],
    sub: "RFID inventory and POS from ₱1,299 lifetime. One payment, no subscription, hardware included.",
    cta: "See Keep Inv",
  },

  philosophy: {
    kicker: "Licensed, not subscribed",
    lines: ["Pay once.", { text: "It's yours to keep.", accent: true }],
    sub: "Every subscription is a bill that never ends. We price software as a one-time licence instead.",
    cta: "Read our philosophy",
  },

  faq: {
    kicker: "Frequently asked",
    lines: ["Straight answers,", { text: "no vague “soon.”", accent: true }],
    sub: "Timelines, payment terms, hardware, and what happens the day you need something changed.",
    cta: "Read the FAQ",
  },

  contact: {
    kicker: "Free demo · 30 minutes",
    lines: ["Thirty minutes.", { text: "No obligation.", accent: true }],
    sub: "Book a free demo in Tagalog or English. We map what to automate and send a clear quote.",
    cta: "Pick a time",
  },

  successStories: {
    kicker: "Success stories",
    lines: ["Businesses", { text: "already in flight.", accent: true }],
    sub: "We're documenting what our clients built with us. The first stories land here soon.",
    cta: "Book a Free Demo",
  },
} as const satisfies Record<string, OgCard>;
