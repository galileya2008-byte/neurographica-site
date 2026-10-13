import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { yandexMetrika } from "@/config/analytics";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Отзывы участников",
  description:
    "Отзывы о мастер-классах и программах по нейрографике Галины Оноприенко. Пока собираю подборку — можно написать лично в Telegram.",
  path: "/reviews",
  keywords: ["отзывы нейрографика", "Галина Оноприенко отзывы", "мастер-классы отзывы"],
});

export default function ReviewsPage() {
  return (
    <section className="section-padding pt-32">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Отзывы" },
          ]}
        />

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            Отзывы
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl">Отзывы участников</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Подборку отзывов на сайт добавляю постепенно. Если хотите узнать о
            формате до оплаты — напишите мне в Telegram, отвечу лично.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button
              href={siteConfig.social.telegram}
              size="lg"
              className="w-full sm:w-auto"
              metrikaGoal={yandexMetrika.goals.telegram}
            >
              Написать в Telegram
            </Button>
            <Button href="/masterclasses" variant="secondary" size="lg" className="w-full sm:w-auto">
              Смотреть мастер-классы
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
