import type { Product } from "@/types/product";
import { HeroMedia } from "@/components/ai-expert/hero-media";
import { JoinButton } from "@/components/ai-expert/join-button";
import { CurvedLines } from "@/components/decor/curved-lines";
import { AutumnLeaves } from "@/components/decor/autumn-leaves";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import {
  AI_EXPERT_META,
  AI_EXPERT_PRICE_LABEL,
} from "@/lib/constants/ai-expert-system";
import { aiExpertCopy } from "@/lib/content/ai-expert-system";

type HeroSectionProps = {
  product: Product;
};

export function HeroSection({ product }: HeroSectionProps) {
  const { hero } = aiExpertCopy;

  return (
    <section className="relative overflow-hidden pt-28 md:pt-32">
      <div className="absolute inset-0 -z-10 autumn-hero-gradient" />
      <CurvedLines variant="hero" className="-z-[5] opacity-70" />
      <AutumnLeaves variant="hero" className="-z-[4] opacity-90" />

      <Container>
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Программы", href: "/programs" },
            { label: hero.title },
          ]}
        />

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              {hero.eyebrow}
            </p>
            <h1 className="mt-4 text-balance text-3xl leading-[1.12] sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-xl font-medium leading-snug text-foreground md:text-2xl">
              {hero.subtitle}
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {hero.lead}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {hero.details}
            </p>

            <p className="mt-6 text-sm font-medium tracking-wide text-accent md:text-base">
              {AI_EXPERT_META}
            </p>
            <p className="mt-3 font-display text-4xl tracking-tight text-accent md:text-5xl">
              {AI_EXPERT_PRICE_LABEL}
            </p>

            <div className="mt-8">
              <JoinButton
                product={product}
                label={hero.ctaLabel}
                className="w-full sm:w-auto"
              />
            </div>
            <p className="mt-3 text-sm text-muted">
              Оплата на GetCourse · доступ сразу после оплаты
            </p>
          </div>

          <div className="min-w-0">
            <HeroMedia />
          </div>
        </div>
      </Container>
    </section>
  );
}
