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
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-card">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden">
        <SiteImage
          src={product.cover}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.isPopular ? (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-accent backdrop-blur-sm">
            Популярное
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-accent-light px-3 py-1 text-xs text-accent">
            {getDirectionLabel(primaryDirection)}
          </span>
          <span className="rounded-full bg-warm px-3 py-1 text-xs text-muted">
            {formatLabels[product.format]}
          </span>
        </div>

        <h3 className="text-xl leading-snug">
          <Link href={href} className="transition-colors hover:text-accent">
            {product.title}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {product.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
          <span>{product.duration}</span>
          <span>{levelLabels[product.level]}</span>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="font-medium text-accent">
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
