import type { Product } from "@/types/product";
import { Section, SectionHeader } from "@/components/layout/section";
import { JoinButton } from "@/components/ai-expert/join-button";
import { GetcourseLiteWidget } from "@/components/ai-expert/getcourse-lite-widget";
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

      <article className="mx-auto max-w-xl rounded-[1.5rem] border border-gold/30 bg-card p-5 shadow-[0_18px_40px_-24px_rgb(154_123_85/0.5)] sm:rounded-[1.75rem] sm:p-7 md:p-10">
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
          priceClassName="text-4xl md:text-6xl"
          showStages
        />
        <p className="mt-5 text-center text-sm leading-relaxed text-chocolate md:text-base">
          <span className="sm:hidden">Сплит · рассрочка без % · карты и СБП</span>
          <span className="hidden sm:inline">{AI_EXPERT_PAYMENT_NOTE}</span>
        </p>
        <p className="mt-3 text-center text-sm leading-relaxed text-muted md:text-base">
          {pricing.note}
        </p>
        <div className="mt-6 space-y-3">
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
        <div className="mt-8 overflow-hidden rounded-[1.25rem] border border-border/80 bg-background/70 p-2 sm:p-3">
          <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
            Форма оплаты на странице
          </p>
          <GetcourseLiteWidget />
        </div>
        <p className="mt-3 text-center text-sm text-muted">
          Кнопка выше открывает оплату сразу. Вопросы — в Telegram{" "}
          {siteConfig.social.telegramHandle}
        </p>
      </article>
    </Section>
  );
}
