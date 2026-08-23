import { ProductCard } from "@/components/catalog/product-card";
import type { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-warm/60 px-6 py-16 text-center">
        <p className="text-lg text-foreground">Ничего не найдено</p>
        <p className="mt-2 text-muted">
          Попробуйте изменить поиск или сбросить фильтры.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
