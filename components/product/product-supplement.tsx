import { Lock, Sparkles } from "lucide-react";
import type { ProductSupplement } from "@/types/product";
import { Section } from "@/components/layout/section";

type ProductSupplementSectionProps = {
  supplement: ProductSupplement;
};

export function ProductSupplementSection({ supplement }: ProductSupplementSectionProps) {
  return (
    <Section tone="accent">
      <div className="overflow-hidden rounded-[1.75rem] border border-gold/30 bg-[linear-gradient(135deg,_rgb(228_238_232/0.65),_rgb(252_250_246/0.95))] px-6 py-8 shadow-card md:px-10 md:py-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-accent-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          {supplement.badge}
        </span>

        <h2 className="mt-5 text-3xl md:text-4xl">{supplement.title}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground/90">
          {supplement.lead}
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">{supplement.description}</p>

        {supplement.highlights?.length ? (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {supplement.highlights.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-chocolate/10 bg-card/80 px-5 py-4 text-sm leading-relaxed text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        {supplement.note ? (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gold/25 bg-card/70 px-5 py-4">
            <Lock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <p className="text-sm leading-relaxed text-muted">{supplement.note}</p>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
