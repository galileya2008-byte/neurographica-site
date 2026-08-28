import type { Product } from "@/types/product";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CurvedLines } from "@/components/decor/curved-lines";
import { SiteImage } from "@/components/ui/site-image";
import { JoinButton } from "@/components/neurocomposition/join-button";
import { CompositionArtwork } from "@/components/neurocomposition/composition-artwork";
import { OfferTrustLine } from "@/components/neurocomposition/offer-trust-line";
import { PriceStack } from "@/components/neurocomposition/price-stack";
import { COURSE_HERO_IMAGE } from "@/lib/constants/neurocomposition";
import { neurocompositionCopy } from "@/lib/content/neurocomposition";

type HeroSectionProps = {
  product: Product;
};

export function HeroSection({ product }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_90%_-8%,_rgb(228_238_232/0.9)_0%,_transparent_56%),radial-gradient(ellipse_50%_40%_at_0%_80%,_rgb(154_123_85/0.1)_0%,_transparent_46%)]" />
      <CurvedLines variant="hero" className="-z-[5] opacity-80" />

      <Container>
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Программы", href: "/programs" },
            { label: product.title },
          ]}
        />

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              {neurocompositionCopy.eyebrow}
            </p>
            <h1 className="mt-4 break-words text-balance text-3xl leading-[1.12] sm:text-4xl md:text-5xl lg:text-[3.5rem]">
              {neurocompositionCopy.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground md:text-xl">
              {neurocompositionCopy.subtitle}
            </p>
            <p className="mt-4 max-w-xl font-display text-xl italic leading-snug text-accent md:text-2xl">
              {neurocompositionCopy.idea}
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {neurocompositionCopy.heroLead}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <JoinButton product={product} className="w-full sm:w-auto" />
            </div>
            <OfferTrustLine className="mt-3" />
            <PriceStack product={product} className="mt-7" />
          </div>

          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-chocolate/10 bg-card shadow-card">
              <div className="relative aspect-[4/5]">
                {COURSE_HERO_IMAGE ? (
                  <SiteImage
                    src={COURSE_HERO_IMAGE}
                    alt="Обложка курса «Нейрокомпозиция»"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 520px"
                  />
                ) : (
                  <CompositionArtwork className="absolute inset-0" />
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
