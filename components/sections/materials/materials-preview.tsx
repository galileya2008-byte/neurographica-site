import { Section, SectionHeader } from "@/components/layout/section";
import { MaterialCard } from "@/components/materials/material-card";
import { Button } from "@/components/ui/button";
import { materialsIntro } from "@/config/site";
import { getFeaturedMaterials } from "@/lib/content/materials";

export function MaterialsPreview() {
  const materials = getFeaturedMaterials(3);

  if (!materials.length) return null;

  return (
    <Section tone="warm" lines="left">
      <SectionHeader
        eyebrow="Полезные материалы"
        title="Исследуем вместе"
        className="mb-6"
      />

      <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
        <p className="text-lg leading-relaxed text-foreground md:text-xl">
          {materialsIntro.lead}
        </p>
        <p className="text-base leading-relaxed text-muted md:text-lg">
          {materialsIntro.description}
        </p>
      </div>

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
