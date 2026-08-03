import {
  ShoppingBag,
  UtensilsCrossed,
  Building2,
  Car,
  Briefcase,
  Landmark,
  type LucideIcon,
} from "lucide-react";

// Hub-page data for /solutions. Problem-led + minimal text: every card leads
// with the pain it removes (<=5 words) before naming the solution. Only real,
// shippable solutions are showcased here (Lease Linq, Keep Inv) — no client
// portfolio work without consent.

export const solutionsHero = {
  title: "Systems that run real businesses",
  subtitle:
    "Not demos — software live in Philippine businesses today. Find your problem below.",
} as const;

export type Flagship = {
  problem: string;
  name: string;
  blurb: string;
  status: string;
  href: string;
  logo: string;
  /** Logo has a baked dark background — render on a dark tile. */
  darkLogo: boolean;
  /** Primary gets the larger, leading cell. */
  primary: boolean;
};

export const flagships: Flagship[] = [
  {
    problem: "Property run on spreadsheets",
    name: "Lease Linq",
    blurb: "Property, tenants, leases, parking & revenue in one system.",
    status: "In development",
    href: "/solutions/lease-linq",
    logo: "/assets/leaselinq/brand-logo.png",
    darkLogo: true,
    primary: true,
  },
  {
    problem: "Stock you can't trust",
    name: "Keep Inv",
    blurb: "Inventory & POS with RFID auditing in seconds.",
    status: "Live",
    href: "/solutions/keepinv",
    logo: "/assets/keep-inv-logo.png",
    darkLogo: false,
    primary: false,
  },
];

export type Industry = { icon: LucideIcon; label: string };

export const industries: Industry[] = [
  { icon: ShoppingBag, label: "Retail" },
  { icon: UtensilsCrossed, label: "Food service" },
  { icon: Building2, label: "Real estate" },
  { icon: Car, label: "Automotive" },
  { icon: Briefcase, label: "Professional services" },
  { icon: Landmark, label: "Corporate" },
];
