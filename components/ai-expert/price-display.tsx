import {
  AI_EXPERT_OLD_PRICE_LABEL,
  AI_EXPERT_PRICE_LABEL,
  AI_EXPERT_PRICE_RISE_NOTICE,
  AI_EXPERT_PRICE_STAGES,
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
  /** Показывать анонс двухэтапного повышения */
  showRiseNotice?: boolean;
  /** Показывать шкалу этапов повышения */
  showStages?: boolean;
};

const sizeClasses = {
  sm: {
    row: "gap-2",
    price: "text-lg",
    old: "text-sm",
    notice: "text-[11px] leading-snug",
    stage: "text-[10px]",
  },
  md: {
    row: "gap-3",
    price: "text-4xl",
    old: "text-xl",
    notice: "text-sm leading-snug",
    stage: "text-xs",
  },
  lg: {
    row: "gap-3",
    price: "text-5xl md:text-6xl",
    old: "text-2xl md:text-3xl",
    notice: "text-sm leading-snug md:text-base",
    stage: "text-xs md:text-sm",
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
  showStages = false,
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
      {showStages ? (
        <ol
          className={cn(
            "mt-4 grid w-full gap-2 sm:grid-cols-3",
            align === "center" && "mx-auto max-w-lg",
          )}
        >
          {AI_EXPERT_PRICE_STAGES.map((stage, index) => (
            <li
              key={stage.dateLabel}
              className={cn(
                "rounded-2xl border px-3 py-3",
                index === 0
                  ? inverted
                    ? "border-gold/50 bg-white/10"
                    : "border-gold/40 bg-accent-light/60"
                  : inverted
                    ? "border-white/15 bg-white/5"
                    : "border-border/70 bg-card/70",
              )}
            >
              <p
                className={cn(
                  "uppercase tracking-[0.14em]",
                  sizes.stage,
                  inverted ? "text-white/65" : "text-muted",
                )}
              >
                {stage.dateLabel}
              </p>
              <p
                className={cn(
                  "mt-1 font-display text-lg leading-none md:text-xl",
                  inverted ? "text-white" : "text-foreground",
                )}
              >
                {stage.priceLabel}
              </p>
              <p
                className={cn(
                  "mt-1",
                  sizes.stage,
                  inverted ? "text-white/55" : "text-muted",
                )}
              >
                {stage.note}
              </p>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
