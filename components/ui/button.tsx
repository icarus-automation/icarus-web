import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueprint-deep active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // blueprint-deep fill: white label passes AA (4.9:1); bright blueprint does not
        primary: "bg-blueprint-deep text-white hover:bg-blueprint-pressed",
        secondary:
          "border border-ruling bg-white text-ink hover:border-ink/40",
        ghost: "text-ink-mid hover:text-blueprint-deep",
        inverse: "bg-white text-ink hover:bg-gilt-tint",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
} & (
    | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href">)
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  );

export function Button({ variant, size, className, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (props.href !== undefined) {
    const { href, ...rest } = props;
    const external = typeof href === "string" && href.startsWith("http");
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      />
    );
  }

  return <button className={classes} {...props} />;
}
