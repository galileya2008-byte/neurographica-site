import type { Product } from "@/types/product";
import { CurvedLines } from "@/components/decor/curved-lines";
import { Section } from "@/components/layout/section";
import { JoinButton } from "@/components/ai-expert/join-button";
import { AI_EXPERT_META } from "@/lib/constants/ai-expert-system";
import { aiExpertCopy } from "@/lib/content/ai-expert-system";

type FinalCtaProps = {
  product: Product;
};

export function FinalCta({ product }: FinalCtaProps) {
  const { finalCta } = aiExpertCopy;

  return (
    <Section tone="warm">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-chocolate/10 bg-[linear-gradient(135deg,_rgb(252_250_246)_0%,_rgb(235_228_216/0.5)_100%)] px-6 py-12 text-center shadow-card md:px-12 md:py-16">
        <CurvedLines variant="cta" className="opacity-60" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
            {finalCta.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {finalCta.description}
          </p>
          <p className="mt-8 font-display text-2xl text-foreground md:text-3xl">
            {finalCta.priceTitle}
          </p>
          <p className="mt-3 text-sm font-medium text-accent md:text-base">
            {AI_EXPERT_META}
          </p>
          <div className="mt-8 flex justify-center">
            <JoinButton
              product={product}
              label={finalCta.ctaLabel}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
