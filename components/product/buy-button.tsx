import { getPurchaseUrl } from "@/lib/constants/getcourse";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BuyButtonProps = {
  product: Product;
  size?: "default" | "sm" | "lg";
  className?: string;
  label?: string;
};

export function BuyButton({
  product,
  size = "lg",
  className,
  label = "Купить",
}: BuyButtonProps) {
  return (
    <Button
      href={getPurchaseUrl(product)}
      size={size}
      className={cn(className)}
    >
      {label} · {formatPrice(product.price, product.currency)}
    </Button>
  );
}
