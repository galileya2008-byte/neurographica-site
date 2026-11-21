import Link from "next/link";
import { SiteImage } from "@/components/ui/site-image";
import { siteConfig } from "@/config/site";
import { yandexMetrika } from "@/config/analytics";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { siteCopy } from "@/lib/content/site-copy";

export function HeroHome() {
  return (
    <section className="home-hero pb-8 pt-24 md:pb-12 md:pt-28">
      <Container size="wide">
        <div className="hero-surface relative isolate overflow-hidden rounded-[2rem] lg:rounded-[2.75rem]">
          <div className="hero-orbit" aria-hidden="true" />
          <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16 xl:px-16">
              <p className="mb-7 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-[#dec9a0]">
                <span className="h-px w-8 bg-[#dec9a0]/60" aria-hidden="true" />
                {siteCopy("home.hero.eyebrow", "Практика. Творчество. Развитие.")}
              </p>
              <h1 className="max-w-2xl whitespace-pre-line text-[2.35rem] leading-[1.12] !text-[#f8faf7] sm:text-5xl lg:text-[3.25rem] xl:text-[3.8rem]">
                {siteCopy("home.hero.headline", "Нейрографика для себя.\nИИ для экспертов.")}
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-[#d3e2db] sm:text-lg">
                {siteCopy("home.hero.subtitle", "Прояснить свои желания, сделать шаг к цели или собрать систему продвижения — выберите то, что нужно вам сейчас.")}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="#practice" size="lg" className="!bg-[#e8d6b2] !text-[#183b32] hover:!bg-[#f2e4c8]" metrikaGoal={yandexMetrika.goals.ctaMasterclasses}>
                  {siteCopy("home.hero.ctaPrimary", "Выбрать практику")}
                </Button>
                <Button href="/programs/ai-dlya-ekspertov/" variant="secondary" size="lg" className="!border-white/25 !bg-white/5 !text-white hover:!bg-white/10" metrikaGoal={yandexMetrika.goals.ctaPrograms}>
                  {siteCopy("home.hero.ctaSecondary", "ИИ для моей работы")}
                </Button>
              </div>
              <Link href="/pismo-dedu-morozu/" prefetch={false} className="mt-5 text-sm leading-relaxed text-[#e8d6b2] underline decoration-[#e8d6b2]/40 underline-offset-4 hover:decoration-[#e8d6b2]">
                Новогодний интерактив: письмо Деду Морозу
              </Link>
              <p className="mt-8 max-w-md border-t border-white/15 pt-5 text-sm leading-relaxed text-[#bdd0c6]">
                {siteCopy("home.hero.trustLine", "Инструктор Нейрографики · маркетолог · промпт-инженер")}
              </p>
            </div>
            <div className="relative mx-5 mb-5 min-h-[320px] overflow-hidden rounded-[1.5rem] sm:mx-8 sm:mb-8 sm:min-h-[400px] lg:my-5 lg:ml-0 lg:mr-5 lg:min-h-[560px] lg:rounded-[2rem]">
              <SiteImage src="/images/galina/at-work.png" alt={`${siteConfig.expert} — инструктор Нейрографики`} fill priority fetchPriority="high" className="object-cover object-[center_35%]" sizes="(max-width: 1024px) 100vw, 520px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2c24]/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.16em] text-[#e8d6b2]">Автор и преподаватель</p>
                <p className="mt-2 font-display text-2xl text-white sm:text-3xl">{siteConfig.expert}</p>
                <p className="mt-2 text-sm text-white/80">Учу думать, а не повторять</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
