import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Served at /manifest.webmanifest. Mostly this is what lets someone add the
 * site to a phone home screen with the right name and icon rather than a
 * screenshot and a truncated URL — worth having on a site whose traffic
 * arrives from Facebook on mobile.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}: ${site.tagline}`,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf8", // --color-folio
    theme_color: "#0a1b2e", // --color-ink
    lang: "en-PH",
    categories: ["business", "productivity"],
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
