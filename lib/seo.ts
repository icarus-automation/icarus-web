import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Next merges `metadata` one field at a time, and `openGraph` is one field: a
 * page that declares its own replaces the layout's outright rather than
 * extending it. Declaring an og:title on a page therefore silently drops
 * og:site_name, og:type and og:locale from that page — which is how a card ends
 * up on Facebook with no attribution line.
 *
 * Every page builds its openGraph through this so the shared parts survive.
 */
const shared = {
  siteName: site.name,
  type: "website",
  // Philippine English. Facebook uses it to decide who to surface the link to.
  locale: "en_PH",
} as const;

export function pageOpenGraph(og: {
  /** Written to stand alone — this is the bold line under the card. */
  title: string;
  description: string;
  /** Root-relative; resolved against metadataBase. */
  url: string;
}): Metadata["openGraph"] {
  return { ...shared, ...og };
}
