import type { Product } from "@/types/product";
import { CurvedLines } from "@/components/decor/curved-lines";
import { Section } from "@/components/layout/section";
import { JoinButton } from "@/components/neurocomposition/join-button";
import { formatPrice } from "@/lib/utils";

type FinalCtaProps = {
  product: Product;
};

export function FinalCta({ product }: FinalCtaProps) {
  return (
    <Section tone="warm">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-chocolate/10 bg-[linear-gradient(135deg,_rgb(252_250_246)_0%,_rgb(235_228_216/0.5)_100%)] px-6 py-12 text-center shadow-card md:px-12 md:py-16">
        <CurvedLines variant="cta" className="opacity-60" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
            Начните не просто рисовать — начните создавать
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Изучите язык фигур, композиционные принципы и создайте собственную
            авторскую работу.
          </p>
          <p className="mt-6 font-display text-3xl text-accent">
            {formatPrice(product.price, product.currency)}
          </p>
          <div className="mt-8 flex justify-center">
            <JoinButton product={product} className="w-full sm:w-auto" />
          </div>
        </div>
      </div>
    </Section>
  );
}
