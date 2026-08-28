import type { Product } from "@/types/product";
import { Section, SectionHeader } from "@/components/layout/section";
import { JoinButton } from "@/components/neurocomposition/join-button";
import { OfferTrustLine } from "@/components/neurocomposition/offer-trust-line";
import { PriceStack } from "@/components/neurocomposition/price-stack";
import {
  pricingCopy,
  pricingIncludes,
} from "@/lib/content/neurocomposition";
import { cn } from "@/lib/utils";

type PricingSectionProps = {
  product: Product;
};

export function PricingSection({ product }: PricingSectionProps) {
  return (
    <Section tone="accent" id="pricing" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow="Стоимость"
        title={pricingCopy.title}
        description={pricingCopy.description}
      />

      <article className="mx-auto max-w-xl rounded-[1.75rem] border border-gold/30 bg-card p-7 shadow-[0_18px_40px_-24px_rgb(154_123_85/0.5)] md:p-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
          {pricingCopy.eyebrow}
        </p>
        <PriceStack product={product} size="block" className="mt-5" />
        <p className="mt-4 text-muted">{pricingCopy.note}</p>

        <h3 className="mt-8 text-lg">{pricingCopy.includesHeading}</h3>
        <ul className="mt-4 space-y-1">
          {pricingIncludes.map((item) => {
            const featured = "featured" in item && item.featured;

            return (
              <li
                key={item.text}
                className={cn(
                  "flex items-start gap-3 border-b border-border/60 py-2.5 last:border-b-0",
                  featured ? "text-foreground" : "text-muted",
                )}
              >
                <span
                  className={cn(
                    "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                    featured ? "bg-gold" : "bg-gold/50",
                  )}
                  aria-hidden
                />
                <span className={cn(featured && "font-medium")}>{item.text}</span>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-sm leading-relaxed text-muted">
          {pricingCopy.afterList}
        </p>

        <div className="mt-8">
          <JoinButton product={product} label="Присоединиться" className="w-full" />
        </div>
        <OfferTrustLine className="mt-3 text-center" />
      </article>
    </Section>
  );
}
