import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { yandexMetrika } from "@/config/analytics";

const pathways = [
  {
    id: "neuro",
    eyebrow: "Для себя",
    title: "Нейрографика для себя",
    description:
      "Практики для работы со своими целями, приоритетами и намерениями. Выберите занятие под свой запрос.",
    href: "/topics/",
    cta: "Выбрать практику",
    metrikaGoal: yandexMetrika.goals.ctaMasterclasses,
  },
  {
    id: "ai",
    eyebrow: "Для работы",
    title: "ИИ для работы эксперта",
    description:
      "Обучение работе с ИИ для подготовки предложения услуги, контента и собственных AI-помощников.",
    href: "/programs/ai-dlya-ekspertov/",
    cta: "Посмотреть AI-программу",
    metrikaGoal: yandexMetrika.goals.ctaPrograms,
  },
] as const;

export function AudiencePathways() {
  return (
    <Section tone="warm" className="!pt-12 md:!pt-16">
      <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-gold">
          Куда дальше
        </p>
        <h2 className="mt-3 text-balance text-2xl md:text-3xl lg:text-[2.15rem]">
          Выберите направление
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">
          На сайте два маршрута: практика нейрографики для личных запросов и AI-программа
          для продвижения экспертной услуги.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {pathways.map((item) => (
          <article
            key={item.id}
            className="premium-card flex h-full flex-col rounded-[1.5rem] p-6 md:p-8"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
              {item.eyebrow}
            </p>
            <h3 className="mt-3 text-2xl leading-snug md:text-[1.65rem]">{item.title}</h3>
            <p className="mt-4 flex-1 text-base leading-relaxed text-muted">
              {item.description}
            </p>
            <div className="mt-7">
              <Button
                href={item.href}
                size="lg"
                className="w-full sm:w-auto"
                metrikaGoal={item.metrikaGoal}
              >
                {item.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
