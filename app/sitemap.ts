import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // /blog is intentionally excluded until it has content
  const routes = [
    "",
    "/solutions",
    "/solutions/keepinv",
    "/success-stories",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/solutions/keepinv" ? 0.9 : 0.7,
  }));
}
