import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CurvedLines } from "@/components/decor/curved-lines";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { aiSalesTopic } from "@/lib/content/ai-sales-topic";
import { faqSchema } from "@/lib/seo/product-schema";

const programPath = "/programs/ai-dlya-ekspertov";

export function AiSalesTopicPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: aiSalesTopic.title,
    description: aiSalesTopic.description,
    datePublished: aiSalesTopic.updatedAt,
    dateModified: aiSalesTopic.updatedAt,
    inLanguage: "ru-RU",
    mainEntityOfPage: `${siteConfig.url}/topics/${aiSalesTopic.slug}/`,
    author: {
      "@type": "Person",
      name: siteConfig.expert,
      url: `${siteConfig.url}/about/`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.brand,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <JsonLd
        data={[
          articleSchema,
          faqSchema([...aiSalesTopic.faq]),
        ].filter(Boolean) as Record<string, unknown>[]}
      />

      <article>
        <header className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="site-hero-gradient absolute inset-0 -z-10" />
          <CurvedLines variant="hero" className="-z-[5] opacity-65" />
          <Container className="relative z-10">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Темы", href: "/topics" },
                { label: "ИИ для экспертов" },
              ]}
            />

            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="max-w-4xl">
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
                  Практическое руководство для экспертов
                </p>
                <h1 className="mt-5 text-balance text-4xl leading-[1.08] md:text-6xl">
                  {aiSalesTopic.title}
                </h1>
                <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">
                  {aiSalesTopic.description}
                </p>
              </div>

              <aside className="rounded-[1.75rem] border border-border bg-card/85 p-6 shadow-soft backdrop-blur-sm">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                  Главное
                </p>
                <p className="mt-3 leading-relaxed text-foreground/85">
                  ИИ не заменяет продажи. Он сокращает путь от знаний эксперта до
                  понятного предложения, полезного контента и обоснованных решений.
                </p>
                <p className="mt-5 text-xs text-muted">
                  Обновлено: 24 сентября 2026
                </p>
              </aside>
            </div>
          </Container>
        </header>

        <section className="section-padding">
          <Container size="narrow">
            <p className="text-xl leading-relaxed text-foreground/85">
              Чтобы увеличить продажи с помощью ИИ, эксперту важно автоматизировать не
              случайные действия, а последовательную систему: понять клиента,
              сформулировать предложение, показать компетентность, привести человека к
              обращению и оценить результат.
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              Ниже — шесть этапов, которые можно пройти на примере одной конкретной
              услуги. На каждом этапе нейросеть выступает помощником, а исходные данные,
              профессиональная проверка и окончательные решения остаются за вами.
            </p>
          </Container>
        </section>

        <section className="tone-section-accent section-padding">
          <Container>
            <div className="mb-12 max-w-3xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
                Система продаж
              </p>
              <h2 className="mt-4 text-balance text-3xl md:text-5xl">
                6 способов применить ИИ в продвижении экспертной услуги
              </h2>
            </div>

            <ol className="grid gap-5 lg:grid-cols-2">
              {aiSalesTopic.steps.map((step) => (
                <li
                  key={step.number}
                  className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card/90 p-6 shadow-soft md:p-8"
                >
                  <span className="font-display text-4xl text-gold/55">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-2xl leading-snug">{step.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{step.text}</p>
                  <div className="mt-6 flex gap-3 border-t border-border pt-5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <p className="text-sm leading-relaxed">
                      <span className="font-medium">Результат:</span> {step.result}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className="section-padding">
          <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
                Важно
              </p>
              <h2 className="mt-4 text-balance text-3xl md:text-4xl">
                Что мешает ИИ приносить пользу продажам
              </h2>
              <p className="mt-5 leading-relaxed text-muted">
                Большинство ошибок связано не с моделью, а с плохими исходными данными,
                отсутствием проверки и попыткой заменить стратегию массовой генерацией.
              </p>
            </div>

            <ul className="space-y-4">
              {aiSalesTopic.mistakes.map((mistake) => (
                <li
                  key={mistake}
                  className="flex gap-4 rounded-2xl border border-border bg-card/70 p-5"
                >
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="leading-relaxed">{mistake}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="tone-section-warm section-padding">
          <Container size="narrow">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              Практический маршрут
            </p>
            <h2 className="mt-4 text-balance text-3xl md:text-5xl">
              Соберите систему под свою услугу
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              В программе «Персональная AI-система для эксперта» эти задачи разобраны
              в 12 практических уроках: от маркетингового брифа и анализа конкурентов
              до переписки с клиентом и плана продвижения на 30 дней.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={programPath} size="lg">
                Посмотреть программу
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={`${programPath}#program`} variant="secondary" size="lg">
                Все 12 уроков
              </Button>
            </div>
          </Container>
        </section>

        <section className="section-padding">
          <Container size="narrow">
            <h2 className="text-3xl md:text-4xl">Частые вопросы</h2>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {aiSalesTopic.faq.map((item) => (
                <section key={item.question} className="py-6">
                  <h3 className="text-xl">{item.question}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{item.answer}</p>
                </section>
              ))}
            </div>
            <p className="mt-8 text-sm leading-relaxed text-muted">
              Автор материала —{" "}
              <Link href="/about" className="text-accent hover:underline">
                {siteConfig.expert}
              </Link>
              , маркетолог, SMM-специалист и промпт-инженер с 17-летним опытом
              онлайн-продвижения.
            </p>
          </Container>
        </section>
      </article>
    </>
  );
}
