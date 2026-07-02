import { site } from "./site";

export const keepinv = {
  name: "Keep Inv",
  slug: "keepinv",
  oneLiner:
    "An affordable inventory management system with POS. Audit thousands of assets in seconds with RFID.",
  description:
    "Keep Inv is a modern, user-friendly inventory management system with an integrated POS. RFID-powered auditing scans thousands of assets in seconds and instantly flags anything missing. Fast, efficient, and built to stop staff theft.",
  // Live app exists at https://app.keepinv.com — intentionally not linked
  // publicly (prospects would only see a login page). Funnel to demo instead.
  liveUrl: "https://app.keepinv.com",
  // TODO: replace with the real YouTube ad video ID once uploaded
  youtubeId: "dQw4w9WgXcQ",
} as const;

export const keepinvFeatures = [
  {
    icon: "radio",
    title: "RFID audits in seconds",
    description:
      "Sweep a room with a handheld RFID reader and audit thousands of assets in seconds. Anything missing shows up immediately.",
  },
  {
    icon: "monitor",
    title: "Modern, friendly POS",
    description:
      "A fast point-of-sale your staff learns in minutes, with thermal receipt printing built in.",
  },
  {
    icon: "boxes",
    title: "Full inventory tracking",
    description:
      "Know what you have, where it is, and what's being sold. Assets and stock in one place.",
  },
  {
    icon: "printer",
    title: "Printer & scanner integrated",
    description:
      "Label printers, receipt printers, and barcode scanners work out of the box. No fiddly setup.",
  },
  {
    icon: "shield",
    title: "Anti-theft by design",
    description:
      "Every movement is accounted for. Discrepancies surface instantly, protecting you from internal loss.",
  },
  {
    icon: "wallet",
    title: "Enterprise power, small-business price",
    description:
      "The capability of systems big retailers run, from ₱1,299 lifetime. One payment, no subscription.",
  },
] as const;

export const keepinvPricing = [
  {
    name: "BASIC",
    subtitle: "Inventory only",
    price: "₱1,299",
    period: "lifetime access",
    description:
      "For businesses that just need to track assets. No POS required.",
    features: [
      "Full inventory tracking",
      "Barcode support",
      "Bring your own device",
      "Lifetime updates",
    ],
    note: "Some PRO features not included",
    cta: { label: "Book a Free Demo", href: "/contact" },
    featured: false,
  },
  {
    name: "PRO",
    subtitle: "Inventory + POS",
    price: "₱1,499",
    period: "lifetime access",
    description:
      "For businesses selling products that need to track what's being sold.",
    features: [
      "Everything in BASIC",
      "Modern POS with receipt printing",
      "All features unlocked",
      "Bring your own device",
      "Lifetime updates",
    ],
    note: null,
    cta: { label: "Book a Free Demo", href: "/contact" },
    featured: true,
  },
  {
    name: "PRO + Devices",
    subtitle: "Software + hardware bundle",
    // TODO: set the real bundle price. ₱4,999 is a visible placeholder.
    price: "₱4,999",
    period: "one-time bundle",
    description:
      "Everything in PRO plus the devices to run it, matched to your budget.",
    features: [
      "Everything in PRO",
      "Thermal & label printers",
      "Barcode scanner",
      "Handheld RFID upgrade available",
      "On-site setup",
    ],
    note: "Sample price. Final bundle depends on devices chosen.",
    cta: { label: "Book a Free Demo", href: "/contact" },
    featured: false,
  },
  {
    name: "Custom",
    subtitle: "Tailored to your operation",
    price: "Let's talk",
    period: "quoted per project",
    description:
      "Need a feature Keep Inv doesn't have yet, or your own domain and branding? We build it for you.",
    features: [
      "Custom feature development",
      "Your own domain",
      "Transparent quoted pricing",
      "Priority support",
    ],
    note: null,
    cta: { label: "Message us on Facebook", href: site.facebook },
    featured: false,
  },
] as const;
