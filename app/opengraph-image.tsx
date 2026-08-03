import { ogCards } from "@/content/og";
import { ogContentType, ogImageSize, renderOgCard } from "@/lib/og";

// Static route, so Next renders this once at build time and serves a file.
// Copy lives in content/og.ts; the layout lives in lib/og.tsx.
export const alt = "Icarus.Automation — let your business fly on autopilot. Automation, custom systems and IoT for Philippine businesses.";
export const size = ogImageSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard(ogCards.home);
}
