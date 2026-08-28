import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground shadow-[0_10px_28px_-12px_rgb(31_58_50/0.65),inset_0_1px_0_rgb(255_255_255/0.12)] hover:bg-[#274840] hover:shadow-[0_14px_32px_-12px_rgb(154_123_85/0.35)]",
        secondary:
          "border border-chocolate/20 bg-card/70 text-foreground backdrop-blur-sm hover:border-gold/40 hover:bg-warm/80",
        ghost: "text-foreground hover:bg-warm/70",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-5 text-sm",
        lg: "h-14 px-9 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
    target?: string;
    rel?: string;
  };

export function Button({
  className,
  variant,
  size,
  href,
  target,
  rel,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    const isHash = href.startsWith("#");

    if (isExternal || isHash) {
      return (
        <a
          href={href}
          className={classes}
          target={
            isHash
              ? undefined
              : (target ?? (href.startsWith("http") ? "_blank" : undefined))
          }
          rel={
            isHash
              ? undefined
              : (rel ?? (href.startsWith("http") ? "noopener noreferrer" : undefined))
          }
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export { buttonVariants };
