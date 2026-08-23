import { Section, SectionHeader } from "@/components/layout/section";
import { MaterialCard } from "@/components/materials/material-card";
import { Button } from "@/components/ui/button";
import { getFeaturedMaterials } from "@/lib/content/materials";

export function MaterialsPreview() {
  const materials = getFeaturedMaterials(3);

  if (!materials.length) return null;

  return (
    <Section tone="warm" lines="left">
      <SectionHeader
        eyebrow="Полезные материалы"
        title="Исследуем вместе"
        description="Статьи, практики, ответы на вопросы и размышления — для тех, кто хочет идти глубже."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {materials.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button href="/materials" variant="secondary">
          Все полезные материалы
        </Button>
      </div>
    </Section>
  );
}
