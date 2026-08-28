import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { getPurchaseUrl } from "@/lib/constants/getcourse";
import { cn } from "@/lib/utils";

type JoinButtonProps = {
  product: Product;
  label?: string;
  size?: "default" | "sm" | "lg";
  className?: string;
};

export function JoinButton({
  product,
  label = "Присоединиться к курсу",
  size = "lg",
  className,
}: JoinButtonProps) {
  return (
    <Button
      href={getPurchaseUrl(product)}
      size={size}
      className={cn("max-w-full whitespace-normal text-center sm:whitespace-nowrap", className)}
    >
      {label}
    </Button>
  );
}
