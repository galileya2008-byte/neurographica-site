"use client";

import { yandexMetrika } from "@/config/analytics";
import { AiExpertPayButton } from "@/components/ai-expert/pay-button";
import { Button } from "@/components/ui/button";
import { AI_EXPERT_SLUG } from "@/lib/constants/ai-expert-system";
import { getPurchaseAction } from "@/lib/constants/getcourse";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types/product";

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
  if (product.slug === AI_EXPERT_SLUG) {
    return (
      <AiExpertPayButton
        product={product}
        label={label}
        size={size}
        className={className}
        showPrice
      />
    );
  }

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
