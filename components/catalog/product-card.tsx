import Link from "next/link";
import { formatLabels, levelLabels, type Product } from "@/types/product";
import { getDirectionLabel, getProductHref } from "@/lib/domain/products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";

type ProductCardProps = {
  product: Product;
  variant?: "default" | "compact";
};

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const href = getProductHref(product);
  const primaryDirection = product.directions[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-chocolate/10 bg-card/80 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-card">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden">
        <SiteImage
          src={product.cover}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-muted">
          {product.isPopular ? (
            <>
              <span className="text-gold">Популярное</span>
              <span className="text-gold">·</span>
            </>
          ) : null}
          {product.supplement ? (
            <>
              <span className="text-accent">+ {product.supplement.badge}</span>
              <span className="text-gold">·</span>
            </>
          ) : null}
          <span>{getDirectionLabel(primaryDirection)}</span>
          <span className="text-gold">·</span>
          <span>{formatLabels[product.format]}</span>
        </div>

        <h3 className="text-xl leading-snug">
          <Link href={href} className="transition-colors hover:text-accent">
            {product.title}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {product.shortDescription}
        </p>

        <div className="mt-4 text-xs tracking-wide text-muted">
          {product.duration}
          <span className="mx-2 text-gold">·</span>
          {levelLabels[product.level]}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="font-display text-xl text-accent">
            {formatPrice(product.price, product.currency)}
          </p>
          <Button href={href} variant="secondary" size="sm">
            {variant === "compact" ? "Открыть" : "Подробнее"}
          </Button>
        </div>
      </div>
    </article>
  );
}
