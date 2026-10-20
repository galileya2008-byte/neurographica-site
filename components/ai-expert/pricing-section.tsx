import type { Product } from "@/types/product";
import { Section, SectionHeader } from "@/components/layout/section";
import { JoinButton } from "@/components/ai-expert/join-button";
import { PriceDisplay } from "@/components/ai-expert/price-display";
import { Button } from "@/components/ui/button";
import {
  AI_EXPERT_META,
  AI_EXPERT_PAYMENT_NOTE,
  AI_EXPERT_TIMELESS_OFFER,
} from "@/lib/constants/ai-expert-system";
import { aiExpertCopy } from "@/lib/content/ai-expert-system";
import { yandexMetrika } from "@/config/analytics";
import { siteConfig } from "@/config/site";

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
        <p className="mt-3 text-center text-sm leading-relaxed text-chocolate">
          {AI_EXPERT_TIMELESS_OFFER}
        </p>
        <ul className="mt-5 space-y-2 text-center text-sm leading-relaxed text-muted">
          {pricing.results.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <PriceDisplay
          className="mt-6"
          align="center"
          size="lg"
          showStages
        />
        <p className="mt-5 text-center text-sm leading-relaxed text-chocolate md:text-base">
          {AI_EXPERT_PAYMENT_NOTE}
        </p>
        <p className="mt-3 text-center leading-relaxed text-muted">{pricing.note}</p>
        <div className="mt-8 space-y-3">
          <JoinButton
            product={product}
            label={pricing.ctaLabel}
            className="w-full"
          />
          <Button
            href={siteConfig.social.telegram}
            variant="secondary"
            size="lg"
            className="w-full"
            metrikaGoal={yandexMetrika.goals.telegram}
          >
            {pricing.askLabel}
          </Button>
        </div>
        <p className="mt-3 text-center text-sm text-muted">
          После оплаты — переход на GetCourse. Вопросы — в Telegram{" "}
          {siteConfig.social.telegramHandle}
        </p>
      </article>
    </Section>
  );
}
