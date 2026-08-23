import { Section, SectionHeader } from "@/components/layout/section";
import { ProductCard } from "@/components/catalog/product-card";
import { Button } from "@/components/ui/button";
import { getPopularMasterclasses } from "@/lib/content/products";

export function PopularMasterclasses() {
  const products = getPopularMasterclasses(3);

  return (
    <Section>
      <SectionHeader
        eyebrow="Мастер-классы"
        title="Популярные форматы для старта"
        description="Короткие и ёмкие занятия, чтобы познакомиться с методом или проработать конкретный запрос."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button href="/masterclasses" variant="secondary">
          Смотреть все мастер-классы
        </Button>
      </div>
    </Section>
  );
}
