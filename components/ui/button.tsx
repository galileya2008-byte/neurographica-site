"use client";

import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { MetrikaGoalId } from "@/config/analytics";
import {
  reachMetrikaGoal,
  resolveMetrikaGoalFromHref,
} from "@/lib/analytics/metrika-client";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-[0.01em] transition-[transform,background-color,box-shadow,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground shadow-[0_12px_30px_-14px_rgb(22_58_54/0.7),inset_0_1px_0_rgb(255_255_255/0.14)] hover:bg-[#1d4a45] hover:shadow-[0_16px_34px_-14px_rgb(166_137_95/0.35)]",
        secondary:
          "border border-chocolate/15 bg-card/80 text-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.5)] hover:border-gold/35 hover:bg-warm/70",
        ghost: "text-foreground hover:bg-warm/70",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-5 text-sm",
        lg: "min-h-14 px-8 text-base md:px-9",
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
    metrikaGoal?: MetrikaGoalId;
    metrikaParams?: Record<string, string>;
  };

function fireMetrika(
  href: string | undefined,
  metrikaGoal: MetrikaGoalId | undefined,
  metrikaParams: Record<string, string> | undefined,
) {
  const goal = metrikaGoal ?? (href ? resolveMetrikaGoalFromHref(href) : undefined);
  if (goal) {
    reachMetrikaGoal(goal, metrikaParams);
  }
}

export function Button({
  className,
  variant,
  size,
  href,
  target,
  rel,
  metrikaGoal,
  metrikaParams,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    const isHash = href.startsWith("#");

    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      fireMetrika(href, metrikaGoal, metrikaParams);
      onClick?.(event as unknown as React.MouseEvent<HTMLButtonElement>);
    };

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
          onClick={handleLinkClick}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} onClick={handleLinkClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={(event) => {
        if (metrikaGoal) {
          reachMetrikaGoal(metrikaGoal, metrikaParams);
        }
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export { buttonVariants };
