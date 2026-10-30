import {
  AI_EXPERT_OLD_PRICE_LABEL,
  AI_EXPERT_PRICE_LABEL,
} from "@/lib/constants/ai-expert-system";
import { cn } from "@/lib/utils";

type PriceDisplayProps = {
  className?: string;
  priceClassName?: string;
  oldPriceClassName?: string;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  inverted?: boolean;
};

const sizeClasses = {
  sm: {
    row: "gap-2",
    price: "text-lg",
    old: "text-sm",
  },
  md: {
    row: "gap-3",
    price: "text-4xl",
    old: "text-xl",
  },
  lg: {
    row: "gap-3",
    price: "text-5xl md:text-6xl",
    old: "text-2xl md:text-3xl",
  },
} as const;

export function PriceDisplay({
  className,
  priceClassName,
  oldPriceClassName,
  align = "left",
  size = "md",
  inverted = false,
}: PriceDisplayProps) {
  const sizes = sizeClasses[size];

  return (
    <div
      className={cn(
        align === "center" && "flex flex-col items-center text-center",
        className,
      )}
    >
      <p
        className={cn(
          "flex flex-wrap items-baseline font-display tracking-tight",
          sizes.row,
          align === "center" && "justify-center",
        )}
      >
        <span
          className={cn(
            sizes.old,
            "line-through decoration-2",
            inverted ? "text-white/55" : "text-muted",
            oldPriceClassName,
          )}
        >
          {AI_EXPERT_OLD_PRICE_LABEL}
        </span>
        <span
          className={cn(
            sizes.price,
            inverted ? "text-white" : "text-accent",
            priceClassName,
          )}
        >
          {AI_EXPERT_PRICE_LABEL}
        </span>
      </p>
    </div>
  );
}
