import {
  Building2,
  Users,
  FileSignature,
  SquareParking,
  Wallet,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

// Lease Linq is a real-estate operations system. The app is still in
// development and every deployment is customised to the client, so there is
// intentionally NO public pricing and NO live/demo URL — the only CTA is to
// book a demo. Logo is a raster with a baked dark background: always render it
// on a dark (bg-ink) surface so the background reads as deliberate.
export const leaselinq = {
  name: "Lease Linq",
  slug: "lease-linq",
  logo: "/assets/leaselinq/brand-logo.png",
  status: "In development",
  oneLiner:
    "Property, tenants, leases, parking, and revenue, run from one system.",
  description:
    "A single system for real-estate operations. Everything a property team juggles across spreadsheets and apps, unified and shaped to how you actually run.",
} as const;

type Module = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const leaselinqModules: Module[] = [
  {
    icon: Building2,
    title: "Property",
    description: "Units, blocks, and occupancy in one live map.",
  },
  {
    icon: Users,
    title: "Tenants",
    description: "Every tenant, contact, and record on file.",
  },
  {
    icon: FileSignature,
    title: "Leases",
    description: "Terms, renewals, and expiries tracked automatically.",
  },
  {
    icon: SquareParking,
    title: "Parking",
    description: "Slots, assignments, and availability at a glance.",
  },
  {
    icon: Wallet,
    title: "Revenue",
    description: "Billing, collections, and dues in real time.",
  },
  {
    icon: ClipboardList,
    title: "Operations",
    description: "Requests, tasks, and day-to-day work in one queue.",
  },
];

// Short positioning points — Lease Linq is fitted per client, not sold as a
// fixed package. Kept deliberately sparse (minimal-text principle).
export const leaselinqPoints = [
  "One system, shaped to your portfolio",
  "Built around your operation, not a template",
  "Onboarding and setup handled for you",
] as const;
