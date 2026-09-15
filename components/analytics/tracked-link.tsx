"use client";

import Link from "next/link";
import {
  reachMetrikaGoal,
  resolveMetrikaGoalFromHref,
} from "@/lib/analytics/metrika-client";
import type { MetrikaGoalId } from "@/config/analytics";
import { cn } from "@/lib/utils";

type TrackedLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  metrikaGoal?: MetrikaGoalId;
  metrikaParams?: Record<string, string>;
};

export function TrackedLink({
  href,
  metrikaGoal,
  metrikaParams,
  onClick,
  className,
  children,
  target,
  rel,
  ...rest
}: TrackedLinkProps) {
  const isExternal =
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const goal = metrikaGoal ?? resolveMetrikaGoalFromHref(href);
    if (goal) {
      reachMetrikaGoal(goal, metrikaParams);
    }
    onClick?.(event);
  }

  if (isExternal) {
    return (
      <a
        href={href}
        className={cn(className)}
        target={target ?? (href.startsWith("http") ? "_blank" : undefined)}
        rel={
          rel ??
          (href.startsWith("http") ? "noopener noreferrer" : undefined)
        }
        onClick={handleClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(className)} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
