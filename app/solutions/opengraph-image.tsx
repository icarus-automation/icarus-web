import { ogCards } from "@/content/og";
import { ogContentType, ogImageSize, renderOgCard } from "@/lib/og";

// Static route, so Next renders this once at build time and serves a file.
// Copy lives in content/og.ts; the layout lives in lib/og.tsx.
export const alt =
  "Icarus.Automation solutions: systems that run real businesses in the Philippines.";
export const size = ogImageSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard(ogCards.solutions);
}
