import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /blog is left crawlable on purpose. It carries robots: noindex, and a
      // Disallow here would stop crawlers reading that tag — the page would
      // stay eligible for indexing as a bare URL instead of being dropped.
      disallow: ["/_next/", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
