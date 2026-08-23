import { SiteImage } from "@/components/ui/site-image";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/layout/section";

export function AboutPreview() {
  return (
    <Section tone="accent">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card">
          <SiteImage
            src="/images/galina/at-work.png"
            alt={`${siteConfig.expert} проводит занятие по нейрографике`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
        </div>

        <div>
          <SectionHeader
            eyebrow="Обо мне"
            title={siteConfig.expert}
            description="Я верю, что изменения начинаются с намерения и подкрепляются осознанными действиями. Моя задача — дать вам структурированный, профессиональный и бережный инструмент для этой работы."
            className="mb-8"
          />

          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Более 17 лет я работаю в онлайн-формате и провела более 1000
              мастер-классов. Главная ценность этого формата — сделать качественные
              знания доступными людям независимо от их города или страны.
            </p>
            <p>
              Я — дипломированный инструктор нейрографики, регулярно прохожу
              дополнительное обучение и обновляю профессиональные знания.
            </p>
          </div>

          <div className="mt-8">
            <Button href="/about" variant="secondary">
              Подробнее обо мне
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
