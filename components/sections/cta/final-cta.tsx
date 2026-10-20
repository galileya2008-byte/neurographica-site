import { SiteImage } from "@/components/ui/site-image";
import { siteConfig } from "@/config/site";
import { yandexMetrika } from "@/config/analytics";
import { Button } from "@/components/ui/button";
import { CurvedLines } from "@/components/decor/curved-lines";
import { Section } from "@/components/layout/section";
import { siteCopy } from "@/lib/content/site-copy";

export function FinalCta() {
  return (
    <Section tone="warm" lines="right" autumnDecor>
      <div className="premium-panel relative overflow-hidden rounded-[1.75rem]">
        <CurvedLines variant="cta" className="decor-desktop-only opacity-45" />
        <div className="relative grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 lg:p-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-gold">
              {siteCopy("home.finalCta.eyebrow", "Следующий шаг")}
            </p>
            <h2 className="mt-4 text-balance text-[1.85rem] leading-[1.15] md:text-4xl lg:text-[2.75rem]">
              {siteCopy(
                "home.finalCta.title",
                "Выберите направление и сделайте первый шаг",
              )}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {siteCopy(
                "home.finalCta.description",
                "Практика нейрографики для себя или AI-программа для экспертов. Оплата и доступ — на GetCourse; срок доступа — на странице продукта.",
              )}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/topics/"
                size="lg"
                className="w-full sm:w-auto"
                metrikaGoal={yandexMetrika.goals.ctaMasterclasses}
              >
                {siteCopy("home.finalCta.ctaPrimary", "Выбрать практику")}
              </Button>
              <Button
                href="/contacts"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                metrikaGoal={yandexMetrika.goals.ctaContacts}
              >
                {siteCopy("home.finalCta.ctaSecondary", "Задать вопрос")}
              </Button>
            </div>
          </div>

          <div className="relative min-h-[280px] lg:min-h-full">
            <SiteImage
              src="/images/galina/with-pavel-piskarev.png"
              alt={`${siteConfig.expert} с Павлом Пискарёвым, создателем метода нейрографики`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgb(23_20_17/0.62)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-accent-foreground md:p-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gold">
                {siteCopy("home.finalCta.sideEyebrow", "Профессиональное обучение")}
              </p>
              <p className="mt-2 font-display text-xl leading-snug">
                Создатель метода —{" "}
                <a
                  href={siteConfig.methodAuthor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-gold/60 underline-offset-4 transition hover:decoration-gold"
                >
                  {siteConfig.methodAuthor.name}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
