import type { Product } from "@/types/product";
import { Section, SectionHeader } from "@/components/layout/section";
import { JoinButton } from "@/components/neurocomposition/join-button";
import { COURSE_PRICE_LATER } from "@/lib/constants/neurocomposition";
import { pricingIncludes } from "@/lib/content/neurocomposition";
import { formatPrice } from "@/lib/utils";

type PricingSectionProps = {
  product: Product;
};

export function PricingSection({ product }: PricingSectionProps) {
  return (
    <Section tone="accent" id="pricing" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow="Стоимость"
        title="Участие в курсе"
        description="Цена предварительной записи. Позже стоимость вырастет."
      />

      <article className="mx-auto max-w-xl rounded-[1.75rem] border border-chocolate/10 bg-card p-7 shadow-card md:p-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
          Предварительная запись
        </p>
        <p className="mt-4 font-display text-5xl tracking-tight text-accent md:text-6xl">
          {formatPrice(product.price, product.currency)}
        </p>
        <p className="mt-3 text-muted">Цена предварительной записи.</p>
        <p className="mt-2 text-sm text-muted">
          Позже стоимость —{" "}
          <span className="text-foreground">
            {formatPrice(COURSE_PRICE_LATER, product.currency)}
          </span>
        </p>

        <h3 className="mt-8 text-lg">В цену входят</h3>
        <ul className="mt-4 space-y-3">
          {pricingIncludes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 border-b border-border/60 py-2 text-muted last:border-b-0"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <JoinButton product={product} label="Присоединиться" className="w-full" />
        </div>
      </article>
    </Section>
  );
}
