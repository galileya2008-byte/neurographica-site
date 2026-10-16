import {
  AI_EXPERT_OLD_PRICE_LABEL,
  AI_EXPERT_PRICE_LABEL,
  AI_EXPERT_PRICE_RISE_NOTICE,
} from "@/lib/constants/ai-expert-system";
import { cn } from "@/lib/utils";

type PriceDisplayProps = {
  className?: string;
  priceClassName?: string;
  oldPriceClassName?: string;
  noticeClassName?: string;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  inverted?: boolean;
  /** Показывать анонс повышения цены с 24 октября */
  showRiseNotice?: boolean;
};

const sizeClasses = {
  sm: {
    row: "gap-2",
    price: "text-lg",
    old: "text-sm",
    notice: "text-[11px] leading-snug",
  },
  md: {
    row: "gap-3",
    price: "text-4xl",
    old: "text-xl",
    notice: "text-sm leading-snug",
  },
  lg: {
    row: "gap-3",
    price: "text-5xl md:text-6xl",
    old: "text-2xl md:text-3xl",
    notice: "text-sm leading-snug md:text-base",
  },
} as const;

export function PriceDisplay({
  className,
  priceClassName,
  oldPriceClassName,
  noticeClassName,
  align = "left",
  size = "md",
  inverted = false,
  showRiseNotice = true,
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
      {showRiseNotice ? (
        <p
          className={cn(
            "mt-2 font-medium",
            sizes.notice,
            inverted ? "text-white/85" : "text-chocolate",
            noticeClassName,
          )}
        >
          {AI_EXPERT_PRICE_RISE_NOTICE}
        </p>
      ) : null}
    </div>
  );
}
