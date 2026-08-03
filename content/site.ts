export const site = {
  // "Icarus Automation" was taken in DTI BNRS; registered name is "Icarus.Automation"
  name: "Icarus.Automation",
  shortName: "Icarus",
  // Canonical origin. Everything SEO-facing derives from this: metadataBase,
  // canonicals, og:url, sitemap.xml and robots.txt. It must match the property
  // verified in Google Search Console exactly, including the missing www —
  // Vercel redirects www to the apex, and a canonical that points at a redirect
  // wastes crawl budget.
  url: "https://icarusautomation.tech",
  // Bare host, for display in social cards and the footer.
  domain: "icarusautomation.tech",
  tagline: "Automation, custom systems & IoT for Philippine businesses",
  description:
    "Icarus.Automation builds n8n automations, custom web systems, IoT solutions, and affordable POS & inventory software for small businesses, startups, and corporations across the Philippines.",
  email: "acegabriel0809@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=61582103931111",
  // E.164 for schema.org and tel: links; the spaced form is for display.
  phone: "+639917897907",
  phoneDisplay: "+63 991 789 7907",
  location: "Philippines",
  city: "Manila",
  region: "Metro Manila",
  country: "PH",
  bookingUrl:
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1tQxMU1vnxWf0ul9KSINyIZPw6TUURTds81TlWiROjVV2TAW1htKXVemctPRqZi5XszwlQiv1b?gv=true",
  cta: {
    label: "Book a Free Demo",
    href: "/contact",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const services = [
  {
    icon: "workflow",
    title: "Workflow Automation",
    description:
      "n8n-powered automations that run your repeatable work: daily marketing posts with AI-generated content and images, lead routing, and reports.",
    points: ["AI content pipelines", "Marketing on autopilot", "Zero missed tasks"],
  },
  {
    icon: "globe",
    title: "Web & System Integration",
    description:
      "Custom websites and internal systems built around how your business actually works, connected to the tools you already use.",
    points: ["Custom web apps", "Internal workflow tools", "Third-party integrations"],
  },
  {
    icon: "cpu",
    title: "IoT & Embedded",
    description:
      "Hardware that talks to your software. Sensors, embedded devices, and the firmware and dashboards that make them useful.",
    points: ["Sensor networks", "Embedded firmware", "Live dashboards"],
  },
  {
    icon: "digitize",
    title: "Business Digitization",
    description:
      "Turn spreadsheets, paper records, and manual processes into organized digital workflows built for your business.",
    points: ["Process assessment", "Data migration and setup", "Staff onboarding and training"],
  },
] as const;

export const processSteps = [
  {
    numeral: "I",
    title: "Discover",
    headline: "Find the updraft",
    image: "/assets/icarus-step/icarus-1.png",
    alt: "Daedalus fitting Icarus with hand-built wings — the blueprint drawn before the flight",
    description:
      "A free demo and consultation. We map the repetitive work, bottlenecks, and systems slowing you down.",
  },
  {
    numeral: "II",
    title: "Build",
    headline: "Forge the wings",
    image: "/assets/icarus-step/icarus-2.png",
    alt: "Icarus poised at the cliff's edge, wings fully spread, in the moment before launch",
    description:
      "We design and build your automation, system, or device, with your feedback in the loop at every step.",
  },
  {
    numeral: "III",
    title: "Launch",
    headline: "Take to the sky",
    image: "/assets/icarus-step/icarus-3.png",
    alt: "Icarus in open flight, wings caught full in the updraft",
    description:
      "We deploy, integrate hardware, migrate data, and train your team until everything runs on its own.",
  },
  {
    numeral: "IV",
    title: "Support",
    headline: "Sustain the flight",
    image: "/assets/icarus-step/icarus-4.png",
    alt: "Icarus climbing steadily skyward, wings holding a sustained ascent",
    description:
      "We stay with you: monitoring, changes, and new requests as your business grows.",
  },
] as const;

// Logos are pre-normalized and this list is generated — edit scripts/logos.json
// and run `npm run logos`, not the output. See scripts/normalize-logos.mjs.
export { clients } from "./clients.generated";

export const faqs = [
  {
    question: "How much does it cost?",
    answer:
      "It depends on what you need — but we build for real budgets, not enterprise ones. Keep Inv, our ready-made POS and inventory app, is ₱1,299 for lifetime access. Custom work is priced around the manual tasks it takes off your plate, and every free demo ends with a clear quote and no obligation.",
  },
  {
    question: "How soon can it go live?",
    answer:
      "Simple automations can be up and running in a few days. Bigger custom systems usually take a few weeks, depending on how much is involved. We’ll set a realistic timeline together on the first call — no vague “soon.”",
  },
  {
    question: "Do you supply the hardware too?",
    answer:
      "Yes. Receipt and label printers, barcode scanners, handheld RFID readers — we source the right kit for your budget and set it all up so it works from day one.",
  },
  {
    question: "Where do you work?",
    answer:
      "We’re based in the Philippines and take on businesses anywhere in the country. For hardware setups we come on-site; everything else we handle remotely, so distance is rarely a problem.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We stick around. Monitoring, fixes, small tweaks, and new requests as you grow — support isn’t a separate contract you have to chase, it’s just part of how we work.",
  },
] as const;

export const philosophy = {
  kicker: "Licensed, not subscribed",
  title: "Our Philosophy",
  lead: "Businesses shouldn't have to subscribe forever to use great software.",
  body: "Great automation shouldn't require endless monthly payments. We keep pricing simple with a one-time license and no recurring subscription fees.",
  contrast:
    "Every subscription is a bill that never ends. A one-time license is a line that goes flat. The longer you run, the wider the gap, and it always falls in your favor.",
  legend: [
    {
      tone: "muted",
      label: "Subscription",
      note: "Pay every month. Stop paying, lose access.",
    },
    {
      tone: "brand",
      label: "One-time license",
      note: "Pay once. It's yours to keep.",
    },
  ],
} as const;
