import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border border-gilt/30 bg-gilt-tint px-3 py-1 text-xs font-semibold tracking-wide text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
