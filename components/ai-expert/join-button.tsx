import { yandexMetrika } from "@/config/analytics";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
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
