import type { Product } from "@/types/product";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CurvedLines } from "@/components/decor/curved-lines";
import { SiteImage } from "@/components/ui/site-image";
import { JoinButton } from "@/components/ai-expert/join-button";
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
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_55%_at_100%_0%,_rgb(228_238_232/0.95)_0%,_transparent_58%),radial-gradient(ellipse_45%_40%_at_0%_100%,_rgb(154_123_85/0.12)_0%,_transparent_50%)]" />
      <CurvedLines variant="hero" className="-z-[5] opacity-70" />

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
            <div className="relative overflow-hidden rounded-[1.75rem] border border-chocolate/10 bg-card shadow-card">
              <div className="relative aspect-[4/5]">
                <SiteImage
                  src={product.cover}
                  alt={hero.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_40%,_rgb(26_22_18/0.35)_100%)]" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
