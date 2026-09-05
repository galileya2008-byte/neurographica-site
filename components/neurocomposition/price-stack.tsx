import type { Product } from "@/types/product";
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
  const isBlock = size === "block";

  return (
    <div className={cn("flex flex-wrap items-end gap-x-6 gap-y-2", className)}>
      <p
        className={cn(
          "font-display tracking-tight text-accent",
          isBlock ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl",
        )}
      >
        {current}
      </p>
    </div>
  );
}
