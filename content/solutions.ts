// Hub-page data for /solutions. One even grid, sized for three columns: every
// solution gets the identical card, with no featured cell and no primary /
// secondary split. Adding a solution is one object in `solutions` and nothing
// else — the grid centres whatever is in the list, so two entries and six both
// read as deliberate.
//
// Only things we have actually built belong on this list, and `status` is never
// dressed up: Lease Linq says "In development" because that is where it is.
// Lease Linq also carries no figure in `pricing` — every deployment is scoped
// to the client, so the number comes out of the demo, never off this page.

/**
 * Not a hero. `title` is written to run one line at lg and up, and `subtitle`
 * to run three at a ~512px measure. Growing either pushes the cards down, which
 * is the one thing this page must not do.
 */
export const solutionsHeader = {
  /** Laurel kicker. Uppercased by CSS; the page's one gilt element. */
  kicker: "Solutions",
  /** Rendered as one h1; `accent` is the tail phrase carrying the blueprint. */
  title: "Systems that run",
  accent: "real businesses",
  subtitle:
    "Software we build for Philippine businesses that got tired of doing things by hand. Have a look and see if one of them sounds like yours.",
} as const;

export type Solution = {
  name: string;
  /** Opens by naming who it is for, then what it does. Around 20-25 words. */
  blurb: string;
  /** Where the product actually is today. */
  status: "Live" | "In development";
  /** Money in plain language. A peso figure only where one is published. */
  pricing: string;
  href: string;
  /**
   * Both marks are full-bleed rasters with their own baked background, so the
   * card covers the tile with them rather than padding a transparent logo. A
   * future mark that IS transparent needs a different treatment, not a wider
   * `tile` union.
   */
  logo: string;
  /** Shows only while the raster loads. Lease Linq's is dark, and PRODUCT.md
   *  commits to that mark sitting on ink. */
  tile: "ink" | "raised";
};

export const solutions: Solution[] = [
  {
    name: "Lease Linq",
    blurb:
      "For property teams whose real system is still a spreadsheet. Units, tenants, leases, parking, and collections all in one place.",
    status: "In development",
    pricing: "Quoted after the demo",
    href: "/solutions/lease-linq",
    logo: "/assets/leaselinq/brand-logo.png",
    tile: "ink",
  },
  {
    name: "Keep Inv",
    blurb:
      "For shops that never quite know what’s on the shelf. Inventory, a POS your staff can pick up in an afternoon, and RFID audits that count a room in seconds.",
    status: "Live",
    pricing: "From ₱1,299, one payment",
    href: "/solutions/keepinv",
    logo: "/assets/keep-inv-logo.png",
    tile: "raised",
  },
];

/**
 * For the visitor whose problem is not on the list. One quiet line under the
 * grid, deliberately not a section of its own — the custom work is most of what
 * we do, but this page is here to be browsed, not pitched at.
 */
export const solutionsFallback = {
  text: "Nothing here matches how your business runs? That’s usually where we start.",
  linkLabel: "Tell us about it",
} as const;
