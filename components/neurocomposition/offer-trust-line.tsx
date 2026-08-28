import { neurocompositionCopy } from "@/lib/content/neurocomposition";
import { cn } from "@/lib/utils";

type OfferTrustLineProps = {
  className?: string;
};

export function OfferTrustLine({ className }: OfferTrustLineProps) {
  return (
    <p className={cn("max-w-xl text-sm leading-relaxed text-muted", className)}>
      {neurocompositionCopy.trustLine}
    </p>
  );
}
