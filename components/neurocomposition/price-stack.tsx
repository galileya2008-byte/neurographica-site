import type { Product } from "@/types/product";
import { COURSE_PRICE_LATER } from "@/lib/constants/neurocomposition";
import { neurocompositionCopy } from "@/lib/content/neurocomposition";
import { cn, formatPrice } from "@/lib/utils";

type PriceStackProps = {
  product: Product;
  size?: "hero" | "block";
  className?: string;
};

export function PriceStack({
  product,
  size = "hero",
  className,
}: PriceStackProps) {
  const current = formatPrice(product.price, product.currency);
  const later = formatPrice(COURSE_PRICE_LATER, product.currency);
  const isBlock = size === "block";

  return (
    <div className={cn("flex flex-wrap items-end gap-x-6 gap-y-2", className)}>
      <div>
        <p className="text-sm text-muted line-through decoration-chocolate/40">
          {later}
        </p>
        <p
          className={cn(
            "font-display tracking-tight text-accent",
            isBlock ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl",
          )}
        >
          {current}
        </p>
      </div>
      <div className={cn("text-sm leading-relaxed md:text-base", isBlock && "pb-1")}>
        <p className="font-medium text-foreground">
          {neurocompositionCopy.preSaleUntil}
        </p>
        <p className="text-muted">
          {neurocompositionCopy.laterFrom}{" "}
          <span className="text-foreground">{later}</span>
        </p>
      </div>
    </div>
  );
}
