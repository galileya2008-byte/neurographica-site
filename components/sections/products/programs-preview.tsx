import { Section, SectionHeader } from "@/components/layout/section";
import { ProductCard } from "@/components/catalog/product-card";
import { Button } from "@/components/ui/button";
import { getFeaturedPrograms } from "@/lib/content/products";
import { AI_EXPERT_SLUG } from "@/lib/constants/ai-expert-system";
import { hasConfiguredPurchaseUrl } from "@/lib/constants/getcourse";

export function ProgramsPreview() {
  const products = getFeaturedPrograms(Number.MAX_SAFE_INTEGER)
    .filter((product) => product.slug !== AI_EXPERT_SLUG && hasConfiguredPurchaseUrl(product))
    .slice(0, 2);
  if (!products.length) return null;

  return (
    <Section tone="warm" autumnDecor>
      <SectionHeader
        eyebrow="Программы"
        title="Продолжить обучение Нейрографике"
        description="Курсы для развития навыков рисования и самостоятельной практики."
      />

      <div className={products.length === 1 ? "grid gap-5" : "grid gap-5 lg:grid-cols-2"}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant={products.length === 1 ? "feature" : "default"} />
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
