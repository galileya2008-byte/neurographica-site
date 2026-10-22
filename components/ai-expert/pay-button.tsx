"use client";

import { useState } from "react";
import { yandexMetrika } from "@/config/analytics";
import { PaymentModal } from "@/components/ai-expert/payment-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import type { Product } from "@/types/product";

type PayButtonProps = {
  product: Product;
  label?: string;
  size?: VariantProps<typeof buttonVariants>["size"];
  className?: string;
  /** Показывать цену в подписи кнопки */
  showPrice?: boolean;
};

export function AiExpertPayButton({
  product,
  label = "Купить",
  size = "lg",
  className,
  showPrice = true,
}: PayButtonProps) {
  const [open, setOpen] = useState(false);
  const text = showPrice
    ? `${label} · ${formatPrice(product.price, product.currency)}`
    : label;

  return (
    <>
      <Button
        type="button"
        size={size}
        className={cn(
          "max-w-full whitespace-normal text-center sm:whitespace-nowrap",
          className,
        )}
        metrikaGoal={yandexMetrika.goals.purchase}
        metrikaParams={{ product: product.slug, checkout: "widget" }}
        onClick={() => setOpen(true)}
      >
        {text}
      </Button>
      <PaymentModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
