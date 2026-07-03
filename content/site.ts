export const site = {
  // "Icarus Automation" was taken in DTI BNRS; registered name is "Icarus.Automation"
  name: "Icarus.Automation",
  shortName: "Icarus",
  url: "https://icarusautomation.com",
  tagline: "Automation, custom systems & IoT for Philippine businesses",
  description:
    "Icarus.Automation builds n8n automations, custom web systems, IoT solutions, and affordable POS & inventory software for small businesses, startups, and corporations across the Philippines.",
  email: "acegabriel0809@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=61582103931111",
  location: "Philippines",
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
  { label: "Success Stories", href: "/success-stories" },
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
    icon: "scan",
    title: "POS & Inventory Systems",
    description:
      "Keep Inv, our POS and inventory platform, complete with receipt printers, label printers, barcode scanners, and handheld RFID.",
    points: ["Lifetime access from ₱1,299", "RFID audits in seconds", "Hardware included options"],
  },
] as const;

export const processSteps = [
  {
    numeral: "I",
    title: "Discover",
    description:
      "A free demo and consultation. We map the repetitive work, bottlenecks, and systems slowing you down.",
  },
  {
    numeral: "II",
    title: "Build",
    description:
      "We design and build your automation, system, or device, with your feedback in the loop at every step.",
  },
  {
    numeral: "III",
    title: "Launch",
    description:
      "We deploy, integrate hardware, migrate data, and train your team until everything runs on its own.",
  },
  {
    numeral: "IV",
    title: "Support",
    description:
      "We stay with you: monitoring, changes, and new requests as your business grows.",
  },
] as const;

export const clients = [
  {
    name: "LTHMI",
    logo: "/assets/trusted-by/lthmi.png",
  },
  {
    name: "Rapido Motorsiklo Garage",
    logo: "/assets/trusted-by/rapido-motorsiklo-garage.png",
  },
  { name: "Richmond Square", logo: null },
  { name: "Chu Gas Corp.", logo: null },
] as const;

// Weight over volume (PRODUCT.md principle 4): named, verifiable facts — no generic counters
export const proofPoints = [
  {
    fact: "12+ systems shipped",
    detail:
      "Automations, web systems, and devices — built, launched, and still running for the businesses that ordered them.",
    certificate: null,
  },
  {
    fact: "Keep Inv is live in the market",
    detail:
      "Our POS & inventory platform rings up real sales and audits real stockrooms in Philippine businesses today.",
    certificate: null,
  },
  {
    fact: "DTI-registered business",
    detail:
      "Icarus.Automation is registered with the Department of Trade and Industry.",
    certificate: "/BNRS_Certificate.pdf",
  },
] as const;

export const faqs = [
  {
    question: "How much does a project cost?",
    answer:
      "It depends on scope, but we build for tight budgets. Keep Inv starts at ₱1,299 for lifetime access, and automations are priced by the workflows we replace. The free demo includes a clear quote with no obligation.",
  },
  {
    question: "How long does it take to launch?",
    answer:
      "Simple automations ship in days. Custom systems and integrations typically take a few weeks depending on complexity. We set a timeline together during the discovery call.",
  },
  {
    question: "Do you provide the hardware too?",
    answer:
      "Yes. Receipt printers, label printers, barcode scanners, and handheld RFID readers. We supply device packages matched to your budget and set everything up.",
  },
  {
    question: "Where do you operate?",
    answer:
      "We're based in the Philippines and serve businesses nationwide. On-site setup is available for hardware deployments, and everything else we handle remotely.",
  },
  {
    question: "Do you support us after launch?",
    answer:
      "Always. Support is part of our process: monitoring, fixes, and improvements continue after deployment so your systems never fall behind.",
  },
  {
    question: "We're a small business. Is this really for us?",
    answer:
      "That's exactly who we build for. We put the systems big companies run within reach of small businesses, without cutting corners.",
  },
] as const;
