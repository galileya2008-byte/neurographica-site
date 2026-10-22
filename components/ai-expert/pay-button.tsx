"use client";

import { yandexMetrika } from "@/config/analytics";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  AI_EXPERT_CHECKOUT_URL,
} from "@/lib/constants/ai-expert-system";
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

/**
 * Кнопка оплаты AI-программы: сразу открывает форму GetCourse
 * (виджет id=1672623) в новой вкладке — без тяжёлого iframe на странице.
 */
export function AiExpertPayButton({
  product,
  label = "Купить",
  size = "lg",
  className,
  showPrice = true,
}: PayButtonProps) {
  const text = showPrice
    ? `${label} · ${formatPrice(product.price, product.currency)}`
    : label;

  return (
    <Button
      href={AI_EXPERT_CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      size={size}
      className={cn(
        "max-w-full whitespace-normal text-center sm:whitespace-nowrap",
        className,
      )}
      metrikaGoal={yandexMetrika.goals.purchase}
      metrikaParams={{ product: product.slug, checkout: "widget" }}
    >
      {text}
    </Button>
  );
}
