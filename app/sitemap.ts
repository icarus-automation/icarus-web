import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Served at /sitemap.xml and pointed to from robots.txt.
 *
 * Every URL here must be on the canonical origin and must be indexable. Google
 * treats a sitemap listing another host as spam and drops the whole file, and
 * listing a noindex page just burns crawl budget — which is why /blog, which
 * carries robots: noindex until it has posts, is not in the list.
 */
const routes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/solutions/keepinv", changeFrequency: "weekly", priority: 0.9 },
  { path: "/solutions", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/philosophy", changeFrequency: "monthly", priority: 0.6 },
  { path: "/success-stories", changeFrequency: "monthly", priority: 0.5 },
] as const satisfies readonly {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}[];

export default function sitemap(): MetadataRoute.Sitemap {
  // Build time. Not perfectly honest for a page that didn't change in this
  // deploy, but the alternative is hand-maintained dates that go stale — and
  // Google leans on its own crawl history over lastmod anyway.
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
