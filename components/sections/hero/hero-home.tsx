import { CurvedLines } from "@/components/decor/curved-lines";
import { AutumnLeaves } from "@/components/decor/autumn-leaves";
import { SiteImage } from "@/components/ui/site-image";
import { philosophyQuote, siteConfig } from "@/config/site";
import { yandexMetrika } from "@/config/analytics";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function HeroHome() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      <div className="absolute inset-0 -z-10 site-hero-gradient" />
      <CurvedLines variant="hero" className="decor-desktop-only -z-[5] opacity-55" />
      <AutumnLeaves
        variant="hero"
        className="theme-seasonal-decor decor-desktop-only -z-[4] opacity-80"
      />

      <Container className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
        <div className="order-2 min-w-0 lg:order-1">
          <p className="reveal-up mb-4 text-[11px] font-medium uppercase tracking-[0.26em] text-gold md:mb-5">
            Онлайн-практики Нейрографики
          </p>
          <p className="reveal-up reveal-delay-1 mb-3 font-display text-xl italic leading-tight text-accent md:mb-4 md:text-3xl">
            {siteConfig.brand}
          </p>
          <h1 className="reveal-up reveal-delay-1 text-balance text-[1.85rem] leading-[1.12] sm:text-4xl md:text-5xl lg:text-[3.35rem]">
            Нейрографика онлайн — от намерения к действию
          </h1>
          <p className="reveal-up reveal-delay-2 mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg md:text-xl">
            Мастер-классы и программы Галины Оноприенко: ясность, финансовые цели,
            продвижение услуги и первые шаги через практику линии.
          </p>

          <div className="reveal-up reveal-delay-3 mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
            <Button
              href="/masterclasses"
              size="lg"
              className="w-full sm:w-auto"
              metrikaGoal={yandexMetrika.goals.ctaMasterclasses}
            >
              Выбрать мастер-класс
            </Button>
            <Button
              href="/programs"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              metrikaGoal={yandexMetrika.goals.ctaPrograms}
            >
              Посмотреть программы
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted">
            {siteConfig.expert}
            <span className="mx-2 text-gold">·</span>
            17 лет онлайн · 1000+ мастер-классов
          </p>

          <blockquote className="mt-8 hidden max-w-xl border-l border-gold/50 pl-5 text-base italic leading-relaxed text-foreground/75 md:mt-12 md:block">
            {philosophyQuote.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </blockquote>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="premium-card relative mx-auto max-w-sm overflow-hidden rounded-[1.75rem] sm:max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5]">
              <SiteImage
                src="/images/galina/portrait-premium.png"
                alt={`${siteConfig.expert} — инструктор нейрографики, автор практик «От намерения к действию»`}
                fill
                priority
                fetchPriority="high"
                className="object-cover object-[center_20%]"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgb(16_24_32/0.22)_100%)]" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
