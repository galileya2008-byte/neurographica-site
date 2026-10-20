import type { Product } from "@/types/product";
import { CurvedLines } from "@/components/decor/curved-lines";
import { Section } from "@/components/layout/section";
import { JoinButton } from "@/components/ai-expert/join-button";
import { Button } from "@/components/ui/button";
import {
  AI_EXPERT_META,
  AI_EXPERT_PAYMENT_NOTE,
} from "@/lib/constants/ai-expert-system";
import { aiExpertCopy } from "@/lib/content/ai-expert-system";
import { yandexMetrika } from "@/config/analytics";
import { siteConfig } from "@/config/site";

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
          <p className="mt-2 text-sm font-medium text-chocolate md:text-base">
            {finalCta.priceNote}
          </p>
          <p className="mt-3 text-sm font-medium text-accent md:text-base">
            {AI_EXPERT_META}
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <JoinButton
              product={product}
              label={finalCta.ctaLabel}
              className="w-full sm:w-auto"
            />
            <Button
              href={siteConfig.social.telegram}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              metrikaGoal={yandexMetrika.goals.telegram}
            >
              {finalCta.askLabel}
            </Button>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {AI_EXPERT_PAYMENT_NOTE}
          </p>
          <p className="mt-2 text-sm text-muted">
            Есть вопросы по программе? Напишите в Telegram{" "}
            {siteConfig.social.telegramHandle}
          </p>
        </div>
      </div>
    </Section>
  );
}
