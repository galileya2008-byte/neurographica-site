import type { Product } from "@/types/product";
import { Section, SectionHeader } from "@/components/layout/section";
import { JoinButton } from "@/components/ai-expert/join-button";
import { AI_EXPERT_META } from "@/lib/constants/ai-expert-system";
import { aiExpertCopy } from "@/lib/content/ai-expert-system";

type PricingSectionProps = {
  product: Product;
};

export function PricingSection({ product }: PricingSectionProps) {
  const { pricing } = aiExpertCopy;

  return (
    <Section tone="accent" id="pricing" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow={pricing.eyebrow}
        title={pricing.title}
        description={pricing.description}
      />

      <article className="mx-auto max-w-xl rounded-[1.75rem] border border-gold/30 bg-card p-7 shadow-[0_18px_40px_-24px_rgb(154_123_85/0.5)] md:p-10">
        <p className="text-center text-sm font-medium text-accent">{AI_EXPERT_META}</p>
        <p className="mt-5 text-center font-display text-5xl tracking-tight text-accent md:text-6xl">
          4 700 ₽
        </p>
        <p className="mt-5 text-center leading-relaxed text-muted">{pricing.note}</p>
        <div className="mt-8">
          <JoinButton
            product={product}
            label={pricing.ctaLabel}
            className="w-full"
          />
        </div>
        <p className="mt-3 text-center text-sm text-muted">
          После оплаты — переход на GetCourse
        </p>
      </article>
    </Section>
  );
}
