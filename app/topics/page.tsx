import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CurvedLines } from "@/components/decor/curved-lines";
import { practiceRequests } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Выбери свою тему",
  description:
    "Материалы по запросам: ИИ для экспертов, продвижение и продажи, мотивация, цели, ясность, нейрографика и самопознание.",
  path: "/topics",
  keywords: [
    "ИИ для экспертов",
    "продвижение эксперта",
    "нейрографика",
    "мотивация",
    "работа с целями",
    "самопознание",
  ],
});

export default function TopicsPage() {
  return (
    <main>
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="site-hero-gradient absolute inset-0 -z-10" />
        <CurvedLines variant="hero" className="-z-[5] opacity-60" />
        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Выбери свою тему" },
            ]}
          />
          <div className="max-w-4xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              Навигатор по сайту
            </p>
            <h1 className="mt-4 text-balance text-4xl md:text-6xl">
              Выбери свою тему
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">
              Выберите вопрос, который важен сейчас. Внутри — полезные объяснения,
              статьи, программы и мастер-классы по теме.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding pt-8">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {practiceRequests.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="group flex min-h-56 flex-col rounded-[1.75rem] border border-border bg-card/80 p-6 shadow-soft transition duration-500 hover:-translate-y-1 hover:border-gold/35 hover:shadow-card md:p-7"
              >
                <div className="flex items-start justify-between gap-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
                    Тема
                  </p>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <h2 className="mt-5 text-2xl leading-snug">{topic.seoTitle}</h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  {topic.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
