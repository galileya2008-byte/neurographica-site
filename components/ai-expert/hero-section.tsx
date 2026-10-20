import type { Product } from "@/types/product";
import { HeroMedia } from "@/components/ai-expert/hero-media";
import { JoinButton } from "@/components/ai-expert/join-button";
import { CurvedLines } from "@/components/decor/curved-lines";
import { AutumnLeaves } from "@/components/decor/autumn-leaves";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { PriceDisplay } from "@/components/ai-expert/price-display";
import {
  AI_EXPERT_META,
  AI_EXPERT_PAYMENT_NOTE,
  AI_EXPERT_TIMELESS_OFFER,
} from "@/lib/constants/ai-expert-system";
import { aiExpertCopy } from "@/lib/content/ai-expert-system";
import { yandexMetrika } from "@/config/analytics";
import { siteConfig } from "@/config/site";

type HeroSectionProps = {
  product: Product;
};

export function HeroSection({ product }: HeroSectionProps) {
  const { hero } = aiExpertCopy;

  return (
    <section className="relative overflow-hidden pt-28 md:pt-32">
      <div className="absolute inset-0 -z-10 site-hero-gradient" />
      <CurvedLines variant="hero" className="decor-desktop-only -z-[5] opacity-55" />
      <AutumnLeaves
        variant="hero"
        className="theme-seasonal-decor decor-desktop-only -z-[4] opacity-80"
      />

      <Container>
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Программы", href: "/programs" },
            { label: hero.programName },
          ]}
        />

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="order-2 min-w-0 lg:order-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              {hero.eyebrow}
            </p>
            <p className="mt-3 text-base font-medium text-accent md:text-lg">
              {hero.programName}
            </p>
            <h1 className="mt-3 text-balance text-[1.75rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-[3.1rem]">
              {hero.headline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {hero.subtitle}
            </p>

            <ul className="mt-6 space-y-3">
              {hero.highlights.map((item) => (
                <li
                  key={item}
                  className="premium-card flex items-start gap-3 rounded-2xl px-4 py-3 text-sm leading-relaxed text-foreground md:text-base"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm font-medium tracking-wide text-accent md:text-base">
              {AI_EXPERT_META}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-chocolate md:text-base">
              {AI_EXPERT_TIMELESS_OFFER}
            </p>
            <PriceDisplay
              className="mt-2"
              size="md"
              priceClassName="md:text-5xl"
              showStages
            />

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <JoinButton
                product={product}
                label={hero.ctaLabel}
                className="w-full sm:w-auto"
              />
              <Button
                href={hero.secondaryCtaHref}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {hero.secondaryCtaLabel}
              </Button>
              <Button
                href={siteConfig.social.telegram}
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto"
                metrikaGoal={yandexMetrika.goals.telegram}
              >
                {hero.askLabel}
              </Button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Обучение и оплата на GetCourse · доступ 12 месяцев. {AI_EXPERT_PAYMENT_NOTE}{" "}
              Есть вопросы — напишите в Telegram.
            </p>
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            <HeroMedia />
          </div>
        </div>
      </Container>
    </section>
  );
}
