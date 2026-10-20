import { yandexMetrika } from "@/config/analytics";
import { getPurchaseAction } from "@/lib/constants/getcourse";
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
  const action = getPurchaseAction(product);
  const text = action.isCheckout
    ? `${label} · ${formatPrice(product.price, product.currency)}`
    : "Уточнить покупку";

  return (
    <Button
      href={action.href}
      size={size}
      className={cn(className)}
      metrikaGoal={
        action.isCheckout
          ? yandexMetrika.goals.purchase
          : yandexMetrika.goals.telegram
      }
      metrikaParams={{ product: product.slug }}
    >
      {text}
    </Button>
  );
}
