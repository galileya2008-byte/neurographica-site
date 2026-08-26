import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { Topic } from "@/lib/content/topics";
import { getAllTopics } from "@/lib/content/topics";
import { getAllMasterclasses, getAllPrograms } from "@/lib/content/products";
import { filterProducts } from "@/lib/domain/products";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CurvedLines } from "@/components/decor/curved-lines";
import { ProductCard } from "@/components/catalog/product-card";
import { Button } from "@/components/ui/button";

type TopicPageViewProps = {
  topic: Topic;
};

export function TopicPageView({ topic }: TopicPageViewProps) {
  const masterclasses = filterProducts(getAllMasterclasses(), {
    direction: topic.directionId,
  }).slice(0, 6);

  const programs = filterProducts(getAllPrograms(), {
    direction: topic.directionId,
  }).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden section-padding pt-32">
        <CurvedLines variant="hero" className="opacity-60" />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Практика по запросу", href: "/#practice" },
              { label: topic.seoTitle },
            ]}
          />

          <div className="max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              Практика по запросу
            </p>
            <h1 className="mt-4 text-balance text-4xl md:text-5xl leading-[1.15]">
              {topic.seoTitle}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">{topic.intro}</p>
            <p className="mt-4 text-base leading-relaxed text-muted">{topic.description}</p>
          </div>
        </Container>
      </section>

      {masterclasses.length > 0 ? (
        <section className="section-padding">
          <Container>
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl">Мастер-классы по теме</h2>
                <p className="mt-3 max-w-2xl text-muted leading-relaxed">
                  Короткие форматы, где можно поработать с запросом через практику — с
                  использованием нейрографики.
                </p>
              </div>
              <Button
                href={`/masterclasses?direction=${topic.directionId}`}
                variant="secondary"
              >
                Весь каталог
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {masterclasses.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {programs.length > 0 ? (
        <section className="section-padding bg-[linear-gradient(180deg,_rgb(235_228_216/0.5),_transparent)]">
          <Container>
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl">Программы по теме</h2>
                <p className="mt-3 max-w-2xl text-muted leading-relaxed">
                  Более глубокие форматы с пошаговым сопровождением.
                </p>
              </div>
              <Button
                href={`/programs?direction=${topic.directionId}`}
                variant="secondary"
              >
                Все программы
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {programs.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="relative overflow-hidden section-padding">
        <CurvedLines variant="cta" />
        <Container className="relative z-10 max-w-3xl text-center">
          <h2 className="text-balance text-3xl md:text-4xl">
            Начните с того, что откликается
          </h2>
          <p className="mx-auto mt-5 text-lg leading-relaxed text-muted">
            {siteConfig.expert} — инструктор нейрографики с 17-летним опытом
            онлайн-продвижения. Оплата и доступ к занятиям — на GetCourse.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={`/masterclasses?direction=${topic.directionId}`} size="lg">
              Выбрать мастер-класс
            </Button>
            <Button href="/materials" variant="secondary" size="lg">
              Полезные материалы
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted">
            Другие запросы:{" "}
            {getAllTopics()
              .filter((item) => item.slug !== topic.slug)
              .slice(0, 4)
              .map((item, index, arr) => (
              <span key={item.slug}>
                <Link href={`/topics/${item.slug}`} className="text-accent hover:opacity-80">
                  {item.seoTitle}
                </Link>
                {index < arr.length - 1 ? " · " : null}
              </span>
            ))}
          </p>
        </Container>
      </section>
    </>
  );
}
