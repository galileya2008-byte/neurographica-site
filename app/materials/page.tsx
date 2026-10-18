import type { Metadata } from "next";
import { Rss } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CurvedLines } from "@/components/decor/curved-lines";
import { MaterialsCatalog } from "@/components/materials/materials-catalog";
import { Button } from "@/components/ui/button";
import { defaultKeywords } from "@/config/seo";
import { getAllMaterials } from "@/lib/content/materials";
import { siteCopy } from "@/lib/content/site-copy";
import { buildPageMetadata } from "@/lib/seo/metadata";

const materialsLead = siteCopy(
  "materials.lead",
  "Практические статьи и подкасты о продвижении, искусственном интеллекте, нейрографике и осознанных изменениях.",
);
const materialsDescription = siteCopy(
  "materials.description",
  "Каждая публикация имеет отдельную страницу, содержательное описание и расшифровку для подкастов — поэтому материал удобно читать, слушать, сохранять и находить через поиск.",
);

export const metadata: Metadata = buildPageMetadata({
  title: "Статьи и подкасты",
  description: `${materialsLead} ${materialsDescription}`,
  path: "/materials",
  keywords: [
    ...defaultKeywords,
    "статьи для экспертов",
    "подкасты для экспертов",
    "ИИ для продвижения",
  ],
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
            { label: "Статьи и подкасты" },
          ]}
        />

        <div className="mb-12 max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            База знаний
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl">Статьи и подкасты</h1>
          <p className="mt-6 text-xl leading-relaxed text-foreground md:text-2xl">
            {materialsLead}
          </p>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {materialsDescription}
          </p>
          <div className="mt-7">
            <Button href="/feed.xml" variant="secondary">
              <Rss className="h-4 w-4" />
              Подписаться через RSS
            </Button>
          </div>
        </div>

        <MaterialsCatalog materials={materials} />
      </Container>
    </section>
  );
}
