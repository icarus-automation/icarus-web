import { ogCards } from "@/content/og";
import { ogContentType, ogImageSize, renderOgCard } from "@/lib/og";

// Static route, so Next renders this once at build time and serves a file.
// Copy lives in content/og.ts; the layout lives in lib/og.tsx.
export const alt = "Keep Inv — audit a warehouse in seconds. RFID inventory and POS from 1,299 pesos lifetime.";
export const size = ogImageSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard(ogCards.keepinv);
}
