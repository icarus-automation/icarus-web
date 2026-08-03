import { ogCards } from "@/content/og";
import { ogContentType, ogImageSize, renderOgCard } from "@/lib/og";

// Static route, so Next renders this once at build time and serves a file.
// Copy lives in content/og.ts; the layout lives in lib/og.tsx.
export const alt = "Book a free 30-minute demo with Icarus.Automation. No obligation.";
export const size = ogImageSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard(ogCards.contact);
}
