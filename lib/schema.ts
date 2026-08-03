import { faqs, services, site } from "@/content/site";
import { keepinv, keepinvPricing } from "@/content/keepinv";

/**
 * schema.org graph for the site.
 *
 * Two audiences read this and neither is a human: Google, which turns it into
 * rich results and knowledge-panel facts, and the AI answer engines, which lean
 * on it heavily because it states plainly what the prose only implies.
 *
 * Nodes are given stable @ids and cross-referenced rather than repeated, so the
 * organisation is described once and pointed at from everywhere else.
 */

const id = (fragment: string) => `${site.url}/#${fragment}`;
const abs = (path: string) => `${site.url}${path}`;

export const ORG_ID = id("organization");
export const WEBSITE_ID = id("website");

/**
 * ProfessionalService rather than a bare Organization: it is a LocalBusiness
 * subtype, which is what makes the address, phone and service area eligible for
 * local results.
 */
const organization = {
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: site.name,
  alternateName: "Icarus Automation",
  url: site.url,
  description: site.description,
  email: site.email,
  telephone: site.phone,
  // The generated home social card, at its unhashed and therefore stable path.
  image: abs("/opengraph-image"),
  logo: {
    "@type": "ImageObject",
    "@id": id("logo"),
    // app/icon.png, not the 3.3 MB source portrait. Google wants a square
    // raster of at least 112px for the logo; 512 is plenty.
    url: abs("/icon.png"),
    width: 512,
    height: 512,
    caption: site.name,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: site.country,
  },
  areaServed: {
    "@type": "Country",
    name: "Philippines",
  },
  // Signals the bracket without publishing a rate card.
  priceRange: "₱₱",
  currenciesAccepted: "PHP",
  sameAs: [site.facebook],
  knowsAbout: services.map((s) => s.title),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Automation, systems and IoT services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.description,
      },
    })),
  },
} as const;

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-PH",
} as const;

/** Emitted once, from the root layout, for every page on the site. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [organization, website],
};

/**
 * Breadcrumbs. Google renders these in place of the raw URL in results, which
 * reads better and is worth the handful of bytes.
 */
export function breadcrumbs(trail: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": id("faq"),
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

/**
 * Keep Inv is a product with a real price, so it gets SoftwareApplication with
 * an Offer per tier. Prices are parsed off the display strings in
 * content/keepinv.ts so there is one source of truth.
 *
 * Two kinds of tier are dropped rather than published wrong: those with no
 * numeric price ("Let's talk"), and those flagged `provisional`, where the
 * figure on the page is a stated placeholder. Google will print a price it
 * finds here in a search result, so a guess is worse than saying nothing.
 */
export const keepinvSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": id("keepinv"),
  name: keepinv.name,
  description: keepinv.description,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Inventory Management, Point of Sale",
  operatingSystem: "Web browser, Windows, Android",
  url: abs("/solutions/keepinv"),
  image: abs("/assets/keep-inv-logo.png"),
  publisher: { "@id": ORG_ID },
  offers: keepinvPricing
    .map((tier) => {
      if ("provisional" in tier && tier.provisional) return null;
      const amount = tier.price.replace(/[^\d.]/g, "");
      if (!amount) return null;
      return {
        "@type": "Offer",
        name: tier.name,
        description: tier.description,
        price: amount,
        priceCurrency: "PHP",
        // A perpetual licence, not a subscription — the whole pitch.
        category: "One-time licence",
        availability: "https://schema.org/InStock",
        seller: { "@id": ORG_ID },
      };
    })
    .filter(Boolean),
};
