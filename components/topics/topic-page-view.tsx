import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { Topic } from "@/lib/content/topics";
import { getAllTopics } from "@/lib/content/topics";
import {
  getAllProducts,
} from "@/lib/content/products";
import { getTopicProducts } from "@/lib/domain/topic-products";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CurvedLines } from "@/components/decor/curved-lines";
import { ProductCard } from "@/components/catalog/product-card";
import { NeurographicsFormatsCta } from "@/components/topics/neurographics-formats-cta";
import { Button } from "@/components/ui/button";
import { NEUROGRAPHICS_BEGINNERS_SLUG } from "@/lib/content/neurographics-formats";

type TopicPageViewProps = {
  topic: Topic;
};

export function TopicPageView({ topic }: TopicPageViewProps) {
  const { masterclasses, programs } = getTopicProducts(topic, getAllProducts());
  const hasProducts = masterclasses.length > 0 || programs.length > 0;
  const primaryHref = masterclasses.length > 0
    ? `/masterclasses/${masterclasses[0].slug}`
    : programs.length > 0
      ? `/programs/${programs[0].slug}`
      : "/contacts";

  return (
    <>
      <section className="relative overflow-hidden section-padding pt-32">
        <CurvedLines variant="hero" className="opacity-60" />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Выбери свою тему", href: "/topics" },
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
            {topic.slug === NEUROGRAPHICS_BEGINNERS_SLUG ? (
              <NeurographicsFormatsCta />
            ) : null}
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
                  Программы для последовательной работы с этим запросом.
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
            {hasProducts ? "Выберите формат под свой запрос" : "Уточните подходящий формат"}
          </h2>
          <p className="mx-auto mt-5 text-lg leading-relaxed text-muted">
            {hasProducts
              ? `${siteConfig.expert} — инструктор нейрографики. Оплата — на GetCourse; формат и срок доступа указаны на странице выбранного занятия.`
              : "Отдельное занятие по этой теме сейчас не опубликовано в каталоге. Напишите Галине, чтобы уточнить возможность работы с вашим запросом и подходящий формат."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={primaryHref} size="lg">
              {hasProducts ? "Посмотреть подходящее занятие" : "Уточнить формат у Галины"}
            </Button>
            <Button href="/materials" variant="secondary" size="lg">
              Статьи и подкасты
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted">
            Другие запросы:{" "}
            {getAllTopics()
              .filter((item) => item.slug !== topic.slug &&
                (item.directionId === "expert-marketing") === (topic.directionId === "expert-marketing"))
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
