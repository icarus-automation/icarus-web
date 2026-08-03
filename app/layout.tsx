import type { Metadata } from "next";
import { Inter, Marcellus, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { siteGraph } from "@/lib/schema";
import { site } from "@/content/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Everything relative below resolves against this. It has to be the canonical
  // origin or half the tags below point at a domain that isn't ours.
  metadataBase: new URL(site.url),
  title: {
    // Google truncates around 60 characters, so this is deliberately shorter
    // than site.tagline: brand first (most early traffic is brand and social),
    // then the terms worth ranking for.
    default: `${site.name} | Automation, Systems & IoT Philippines`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  openGraph: {
    siteName: site.name,
    type: "website",
    url: site.url,
    // en_PH tells Facebook this is Philippine English, which affects who it
    // surfaces the link to.
    locale: "en_PH",
    // og:image comes from the opengraph-image.tsx files, per route.
  },
  twitter: {
    // Next infers summary_large_image from the presence of an image, but naming
    // it means a future metadata change can't silently downgrade the card to a
    // 120px thumbnail.
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Without max-image-preview:large, Google shows a thumbnail-sized image
      // or none at all in results and Discover.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // No canonical here on purpose. Inherited from the root layout it would make
  // any page that forgets to set its own declare itself the homepage. Each
  // route states its own instead.
  formatDetection: {
    telephone: true,
  },
  // Set GOOGLE_SITE_VERIFICATION in Vercel if you verify Search Console with
  // the HTML-tag method. The DNS-record method needs nothing here.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${marcellus.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Organisation + WebSite, once for the whole site. Per-page schema
            (breadcrumbs, FAQ, the Keep Inv product) is added by those pages. */}
        <JsonLd data={siteGraph} />
        <LenisProvider>
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
