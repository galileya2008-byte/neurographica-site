import type { Metadata } from "next";
import { Mail, Send } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CurvedLines } from "@/components/decor/curved-lines";
import { Button } from "@/components/ui/button";
import { yandexMetrika } from "@/config/analytics";
import { siteConfig } from "@/config/site";
import {
  NEUROGRAPHICS_BEGINNERS_SLUG,
  neurographicsFormatsCopy,
} from "@/lib/content/neurographics-formats";
import { buildPageMetadata } from "@/lib/seo/metadata";

const { sessionPage } = neurographicsFormatsCopy;

export const metadata: Metadata = buildPageMetadata({
  title: sessionPage.title,
  description: sessionPage.description,
  path: "/sessions/individualnaya",
  keywords: [
    "индивидуальная сессия нейрографика",
    "нейрографика онлайн",
    "запись к Галине Оноприенко",
  ],
});

export default function IndividualSessionPage() {
  return (
    <section className="relative overflow-hidden section-padding pt-32">
      <CurvedLines variant="hero" className="opacity-60" />
      <Container size="narrow" className="relative z-10">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            {
              label: "Нейрографика для начинающих",
              href: `/topics/${NEUROGRAPHICS_BEGINNERS_SLUG}`,
            },
            { label: sessionPage.title },
          ]}
        />

        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
          Нейрографика
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">{sessionPage.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          {sessionPage.description}
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted">
          {sessionPage.lead}
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <TrackedLink
            href={siteConfig.social.telegram}
            metrikaGoal={yandexMetrika.goals.telegram}
            className="group flex flex-col rounded-[1.5rem] border border-chocolate/10 bg-card/80 p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-card"
          >
            <Send className="h-6 w-6 text-accent" />
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.14em] text-muted">
              Telegram
            </p>
            <p className="mt-2 text-lg text-foreground group-hover:text-accent">
              {siteConfig.social.telegramHandle}
            </p>
          </TrackedLink>

          <TrackedLink
            href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Индивидуальная сессия")}`}
            metrikaGoal={yandexMetrika.goals.email}
            className="group flex flex-col rounded-[1.5rem] border border-chocolate/10 bg-card/80 p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-card"
          >
            <Mail className="h-6 w-6 text-accent" />
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.14em] text-muted">
              Email
            </p>
            <p className="mt-2 text-lg text-foreground group-hover:text-accent">
              {siteConfig.email}
            </p>
          </TrackedLink>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            href={siteConfig.social.telegram}
            size="lg"
            metrikaGoal={yandexMetrika.goals.telegram}
          >
            {sessionPage.telegramLabel}
          </Button>
          <Button
            href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Индивидуальная сессия")}`}
            variant="secondary"
            size="lg"
            metrikaGoal={yandexMetrika.goals.email}
          >
            {sessionPage.emailLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
