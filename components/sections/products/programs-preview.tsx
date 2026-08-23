import { Section, SectionHeader } from "@/components/layout/section";
import { ProductCard } from "@/components/catalog/product-card";
import { Button } from "@/components/ui/button";
import { getFeaturedPrograms } from "@/lib/content/products";

export function ProgramsPreview() {
  const products = getFeaturedPrograms(2);

  return (
    <Section tone="warm">
      <SectionHeader
        eyebrow="Программы"
        title="Глубокое погружение с поддержкой"
        description="Структурированные маршруты для тех, кто хочет системно работать с целями и изменениями."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button href="/programs" variant="secondary">
          Смотреть все программы
        </Button>
      </div>
    </Section>
  );
}
