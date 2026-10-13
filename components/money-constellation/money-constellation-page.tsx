import type { Product } from "@/types/product";
import { NarrativeSection } from "@/components/ai-expert/narrative-section";
import { StickyCta } from "@/components/money-constellation/sticky-cta";
import { BuyButton } from "@/components/product/buy-button";
import { ProductFaq } from "@/components/product/product-faq";
import { AutumnLeaves } from "@/components/decor/autumn-leaves";
import { CurvedLines } from "@/components/decor/curved-lines";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteImage } from "@/components/ui/site-image";
import {
  MONEY_CONSTELLATION_META,
  MONEY_CONSTELLATION_PRICE_LABEL,
} from "@/lib/constants/money-constellation";
import {
  moneyConstellationCopy,
  moneyConstellationFaq,
} from "@/lib/content/money-constellation";
import {
  breadcrumbSchema,
  faqSchema,
  productSchema,
} from "@/lib/seo/product-schema";

type MoneyConstellationPageProps = {
  product: Product;
};

export function MoneyConstellationPage({ product }: MoneyConstellationPageProps) {
  const faqProduct = { ...product, faq: moneyConstellationFaq };
  const { hero, about, stars, process, actions, chatgpt, audience, join, author } =
    moneyConstellationCopy;

  const schemas = [
    productSchema(faqProduct),
    breadcrumbSchema([
      { name: "Главная", path: "/" },
      { name: "Мастер-классы", path: "/masterclasses" },
      { name: product.title, path: `/masterclasses/${product.slug}` },
    ]),
    faqSchema(moneyConstellationFaq),
  ].filter(Boolean);

  return (
    <>
      <JsonLd data={schemas as Record<string, unknown>[]} />

      <section className="relative overflow-hidden pt-28 md:pt-32">
        <div className="absolute inset-0 -z-10 site-hero-gradient" />
        <CurvedLines variant="hero" className="-z-[5] opacity-70" />
        <AutumnLeaves variant="hero" className="theme-seasonal-decor -z-[4] opacity-90" />

        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Мастер-классы", href: "/masterclasses" },
              { label: hero.title },
            ]}
          />

          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="order-2 min-w-0 lg:order-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
                {hero.eyebrow}
              </p>
              <h1 className="mt-3 text-balance text-[1.85rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                {hero.title}
              </h1>
              <p className="mt-4 max-w-xl text-lg font-medium leading-snug text-foreground md:text-2xl">
                {hero.subtitle}
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:mt-5 md:text-lg">
                {hero.lead}
              </p>
              <p className="mt-3 hidden max-w-xl text-base leading-relaxed text-muted md:mt-4 md:block md:text-lg">
                {hero.details}
              </p>

              <p className="mt-5 text-sm font-medium tracking-wide text-accent md:mt-6 md:text-base">
                {MONEY_CONSTELLATION_META}
              </p>
              <p className="mt-2 font-display text-4xl tracking-tight text-accent md:mt-3 md:text-5xl">
                {MONEY_CONSTELLATION_PRICE_LABEL}
              </p>

              <div className="mt-6 md:mt-8">
                <BuyButton
                  product={product}
                  label="Посмотреть занятие"
                  className="w-full sm:w-auto"
                />
              </div>
              <p className="mt-3 text-sm text-muted">
                Оплата на GetCourse · доступ в Telegram бессрочно
              </p>
            </div>

            <div className="order-1 min-w-0 lg:order-2">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-chocolate/10 bg-card shadow-card sm:rounded-[1.75rem]">
                <div className="relative aspect-[4/3]">
                  <SiteImage
                    src={product.cover}
                    alt="Рисунок «Моё денежное созвездие» — пример нейрографической практики на деньги"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 560px"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <NarrativeSection
        eyebrow={about.eyebrow}
        title={about.title}
        paragraphs={[...about.paragraphs]}
        tone="warm"
        lines="left"
      />

      <Section tone="accent" id="stars" className="scroll-mt-28">
        <SectionHeader
          eyebrow={stars.eyebrow}
          title={stars.title}
          description={stars.intro}
        />
        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stars.items.map((star) => (
            <li key={star.number}>
              <article className="flex h-full flex-col rounded-[1.5rem] border border-chocolate/10 bg-card/90 p-6">
                <span className="font-display text-2xl text-gold/80">
                  {String(star.number).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl leading-snug">{star.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted md:text-base">
                  {star.question}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </Section>

      <NarrativeSection
        eyebrow={process.eyebrow}
        title={process.title}
        paragraphs={[...process.paragraphs]}
      />

      <Section tone="warm">
        <SectionHeader
          eyebrow={actions.eyebrow}
          title={actions.title}
          description={actions.intro}
        />
        <ul className="mx-auto max-w-3xl space-y-3">
          {actions.items.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-border/70 bg-card px-5 py-4 text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
          {actions.note}
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-base font-medium leading-relaxed text-foreground md:text-lg">
          {actions.principle}
        </p>
      </Section>

      <NarrativeSection
        eyebrow={chatgpt.eyebrow}
        title={chatgpt.title}
        paragraphs={[...chatgpt.paragraphs]}
        tone="accent"
        lines="right"
      />

      <NarrativeSection
        eyebrow={audience.eyebrow}
        title={audience.title}
        paragraphs={[...audience.paragraphs]}
        tone="warm"
      />

      <Section id="join" className="scroll-mt-28">
        <div className="rounded-[1.75rem] border border-chocolate/10 bg-card/80 p-8 shadow-card md:p-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            {join.eyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl md:text-4xl">{join.title}</h2>
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted md:text-lg">
            {join.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-base font-medium leading-relaxed text-foreground md:text-lg">
            {join.closing}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BuyButton product={product} label="Посмотреть занятие" />
            <p className="text-sm text-muted">
              {MONEY_CONSTELLATION_PRICE_LABEL} · {MONEY_CONSTELLATION_META}
            </p>
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
            <span className="font-medium text-foreground">{author.title}</span>
            {" — "}
            {author.text}
          </p>
        </div>
      </Section>

      <Section tone="accent">
        <SectionHeader eyebrow="FAQ" title="Частые вопросы" />
        <div className="mx-auto max-w-3xl">
          <ProductFaq items={moneyConstellationFaq} />
        </div>
      </Section>

      <StickyCta product={product} />
    </>
  );
}
