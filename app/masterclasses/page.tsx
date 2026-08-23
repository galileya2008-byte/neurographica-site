import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CatalogClient } from "@/components/catalog/catalog-client";
import { getAllMasterclasses } from "@/lib/content/products";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Мастер-классы",
  description:
    "Каталог мастер-классов по нейрографике: поиск, фильтры по направлениям и форматам.",
  path: "/masterclasses",
});

export default function MasterclassesPage() {
  const products = getAllMasterclasses();

  return (
    <section className="section-padding pt-32">
      <Container size="wide">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Мастер-классы" },
          ]}
        />

        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Каталог
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl">Мастер-классы</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Короткие форматы для знакомства с методом и работы с конкретным запросом.
            Выберите направление — и перейдите к оплате на GetCourse.
          </p>
        </div>

        <Suspense fallback={<CatalogFallback />}>
          <CatalogClient products={products} typeLabel="мастер-класс" />
        </Suspense>
      </Container>
    </section>
  );
}

function CatalogFallback() {
  return (
    <div className="rounded-3xl border border-border/70 bg-warm/50 px-6 py-16 text-center text-muted">
      Загрузка каталога…
    </div>
  );
}
