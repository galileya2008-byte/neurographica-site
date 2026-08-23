import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CurvedLines } from "@/components/decor/curved-lines";
import { MaterialsCatalog } from "@/components/materials/materials-catalog";
import { getAllMaterials } from "@/lib/content/materials";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Исследуем вместе",
  description:
    "Полезные материалы по нейрографике: статьи, практические рекомендации, ответы на вопросы и авторские размышления.",
  path: "/materials",
});

export default function MaterialsPage() {
  const materials = getAllMaterials();

  return (
    <section className="relative overflow-hidden section-padding pt-32">
      <CurvedLines variant="section-left" />
      <Container size="wide" className="relative z-10">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Полезные материалы" },
          ]}
        />

        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Полезные материалы
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl">Исследуем вместе</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Статьи, практические рекомендации, ответы на вопросы и авторские
            размышления — чтобы глубже понять себя, свои цели и метод нейрографики.
          </p>
        </div>

        <MaterialsCatalog materials={materials} />
      </Container>
    </section>
  );
}
