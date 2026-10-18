import { Section, SectionHeader } from "@/components/layout/section";
import { MaterialCard } from "@/components/materials/material-card";
import { Button } from "@/components/ui/button";
import { getFeaturedMaterials } from "@/lib/content/materials";
import { siteCopy } from "@/lib/content/site-copy";

export function MaterialsPreview() {
  const materials = getFeaturedMaterials(3);

  if (!materials.length) return null;

  return (
    <Section tone="warm" lines="left" autumnDecor>
      <SectionHeader
        eyebrow="База знаний"
        title="Статьи и подкасты"
        className="mb-6"
      />

      <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
        <p className="text-lg leading-relaxed text-foreground md:text-xl">
          {siteCopy(
            "materials.lead",
            "Практические статьи и подкасты о продвижении, искусственном интеллекте, нейрографике и осознанных изменениях.",
          )}
        </p>
        <p className="text-base leading-relaxed text-muted md:text-lg">
          {siteCopy(
            "materials.description",
            "Каждая публикация имеет отдельную страницу, содержательное описание и расшифровку для подкастов — поэтому материал удобно читать, слушать, сохранять и находить через поиск.",
          )}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {materials.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button href="/materials" variant="secondary">
          Все статьи и подкасты
        </Button>
      </div>
    </Section>
  );
}
