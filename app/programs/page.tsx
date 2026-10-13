import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CatalogClient } from "@/components/catalog/catalog-client";
import { getAllPrograms } from "@/lib/content/products";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Программы по нейрографике и развитию эксперта",
  description:
    "Онлайн-программы: нейрокомпозиция, персональная AI-система для эксперта и системная работа с намерением. Доступ на GetCourse.",
  path: "/programs",
  keywords: [
    "программы нейрографика",
    "нейрокомпозиция",
    "ИИ для экспертов",
    "продвижение услуги",
    "намерение",
    "планирование",
  ],
});

export default function ProgramsPage() {
  const products = getAllPrograms();

  return (
    <section className="section-padding pt-32">
      <Container size="wide">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Программы" },
          ]}
        />

        <div className="mb-10 max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            Каталог
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl">
            Программы по нейрографике и развитию эксперта
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Структурированные маршруты: нейрокомпозиция, продвижение услуги с ИИ
            и системная работа с намерением.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="rounded-[1.5rem] border border-chocolate/10 bg-warm/50 px-6 py-16 text-center text-muted">
              Загрузка каталога…
            </div>
          }
        >
          <CatalogClient products={products} typeLabel="программу" />
        </Suspense>
      </Container>
    </section>
  );
}
