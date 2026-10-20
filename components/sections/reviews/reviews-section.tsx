import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { yandexMetrika } from "@/config/analytics";

export function ReviewsSection() {
  return (
    <Section lines="left" autumnDecor>
      <SectionHeader
        eyebrow="Доверие"
        title="Что важно знать перед записью"
        description="Отзывы участников добавляю на сайт постепенно. Пока опирайтесь на опыт работы и прямой контакт."
        align="center"
      />

      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
        {[
          {
            value: "1000+",
            label: "мастер-классов",
            text: "Живые и записанные занятия с 2008 года.",
          },
          {
            value: "с 2008",
            label: "онлайн",
            text: "В онлайн-продвижении с 2008 года — образовательные проекты в интернете.",
          },
          {
            value: "Без обещаний",
            label: "волшебства",
            text: "Фокус на практике и действиях, которые зависят от вас.",
          },
        ].map((item) => (
          <article
            key={item.label}
            className="rounded-[1.5rem] border border-chocolate/10 bg-card/80 px-5 py-6 text-center shadow-card"
          >
            <p className="font-display text-3xl text-accent">{item.value}</p>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
              {item.label}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button href="/about" variant="secondary">
          Обо мне
        </Button>
        <Button
          href={siteConfig.social.telegram}
          metrikaGoal={yandexMetrika.goals.telegram}
        >
          Написать в Telegram
        </Button>
      </div>
    </Section>
  );
}
