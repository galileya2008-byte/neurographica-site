"use client";

import { yandexMetrika } from "@/config/analytics";
import type { Product } from "@/types/product";
import { AiExpertPayButton } from "@/components/ai-expert/pay-button";
import { Button } from "@/components/ui/button";
import { AI_EXPERT_SLUG } from "@/lib/constants/ai-expert-system";
import { getPurchaseAction } from "@/lib/constants/getcourse";
import { cn } from "@/lib/utils";

type JoinButtonProps = {
  product: Product;
  label: string;
  size?: "default" | "sm" | "lg";
  className?: string;
};

export function JoinButton({
  product,
  label,
  size = "lg",
  className,
}: JoinButtonProps) {
  if (product.slug === AI_EXPERT_SLUG) {
    return (
      <AiExpertPayButton
        product={product}
        label={label}
        size={size}
        className={className}
        showPrice={false}
      />
    );
  }

  const action = getPurchaseAction(product);
  const text = action.isCheckout ? label : "Уточнить покупку";

  return (
    <Button
      href={action.href}
      size={size}
      className={cn(
        "max-w-full whitespace-normal text-center sm:whitespace-nowrap",
        className,
      )}
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
