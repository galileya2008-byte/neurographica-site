import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { ProductCard } from "@/components/catalog/product-card";
import { BuyButton } from "@/components/product/buy-button";
import { ProductFaq } from "@/components/product/product-faq";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteImage } from "@/components/ui/site-image";
import { getCatalogHref } from "@/lib/domain/products";
import { getDirectionLabel } from "@/lib/domain/products";
import {
  breadcrumbSchema,
  faqSchema,
  productSchema,
} from "@/lib/seo/product-schema";
import { formatPrice } from "@/lib/utils";
import {
  formatLabels,
  levelLabels,
  type Product,
} from "@/types/product";

type ProductPageViewProps = {
  product: Product;
  related: Product[];
};

export function ProductPageView({ product, related }: ProductPageViewProps) {
  const catalogHref = getCatalogHref(product.type);
  const catalogLabel =
    product.type === "masterclass" ? "Мастер-классы" : "Программы";

  const crumbs = [
    { label: "Главная", href: "/" },
    { label: catalogLabel, href: catalogHref },
    { label: product.title },
  ];

  const schemas = [
    productSchema(product),
    breadcrumbSchema([
      { name: "Главная", path: "/" },
      { name: catalogLabel, path: catalogHref },
      {
        name: product.title,
        path: `${catalogHref}/${product.slug}`,
      },
    ]),
    faqSchema(product.faq),
  ].filter(Boolean);

  return (
    <>
      <JsonLd data={schemas as Record<string, unknown>[]} />

      <section className="section-padding pt-32">
        <Container>
          <Breadcrumbs items={crumbs} />

          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-card">
              <SiteImage
                src={product.cover}
                alt={product.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
                {catalogLabel.slice(0, -1)}
              </p>
              <h1 className="mt-3 text-balance text-4xl md:text-5xl">
                {product.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                {product.shortDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {product.directions.map((direction) => (
                  <span
                    key={direction}
                    className="rounded-full bg-accent-light px-3 py-1 text-xs text-accent"
                  >
                    {getDirectionLabel(direction)}
                  </span>
                ))}
              </div>

              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                <MetaItem label="Формат" value={formatLabels[product.format]} />
                <MetaItem label="Длительность" value={product.duration} />
                <MetaItem label="Уровень" value={levelLabels[product.level]} />
                <MetaItem
                  label="Стоимость"
                  value={formatPrice(product.price, product.currency)}
                />
              </dl>

              <div className="mt-8 space-y-3">
                <BuyButton product={product} />
                <p className="text-sm text-muted">
                  После нажатия вы перейдёте на платформу GetCourse для оплаты и
                  получения доступа.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="warm">
        <SectionHeader eyebrow="Описание" title="О занятии" />
        <p className="max-w-3xl text-lg leading-relaxed text-muted">
          {product.description}
        </p>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Для кого" title="Кому подойдёт" className="mb-6" />
            <ul className="space-y-3">
              {product.audience.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-border/70 bg-card px-5 py-4 text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader
              eyebrow="Программа"
              title="Что будет на занятии"
              className="mb-6"
            />
            <ol className="space-y-3">
              {product.agenda.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-2xl border border-border/70 bg-card px-5 py-4"
                >
                  <span className="font-display text-xl text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-muted">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {product.faq.length ? (
        <Section tone="accent">
          <SectionHeader eyebrow="FAQ" title="Частые вопросы" />
          <div className="mx-auto max-w-3xl">
            <ProductFaq items={product.faq} />
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="rounded-[1.75rem] border border-chocolate/10 bg-card/80 p-8 text-center shadow-card md:p-12">
          <h2 className="text-3xl md:text-4xl">Готовы начать?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Оплата и доступ к материалам — на GetCourse. Сайт помогает выбрать
            подходящий формат.
          </p>
          <div className="mt-8 flex justify-center">
            <BuyButton product={product} label="Перейти к оплате" />
          </div>
        </div>
      </Section>

      {related.length ? (
        <Section tone="warm">
          <SectionHeader
            eyebrow="Смотрите также"
            title="Похожие предложения"
            description="Другие форматы в близких направлениях."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} variant="compact" />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card px-4 py-3">
      <dt className="text-xs uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}
