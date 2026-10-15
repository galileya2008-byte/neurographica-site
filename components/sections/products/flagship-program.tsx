import { BuyButton } from "@/components/product/buy-button";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";
import { yandexMetrika } from "@/config/analytics";
import {
  AI_EXPERT_HERO_POSTER,
  AI_EXPERT_META,
  AI_EXPERT_PRICE_LABEL,
  AI_EXPERT_SLUG,
} from "@/lib/constants/ai-expert-system";
import { getProductBySlug } from "@/lib/content/products";
import { getProductHref } from "@/lib/domain/products";

const pillars = [
  {
    title: "Одна услуга — вся система",
    text: "Не разрозненные уроки, а последовательная работа над вашим предложением, аудиторией и материалами продвижения.",
  },
  {
    title: "Готовые материалы, а не только теория",
    text: "Профиль, контент-план, публикации, карусель и визуалы — то, что можно сразу использовать в работе.",
  },
  {
    title: "Свой AI-плагин под практику",
    text: "Создадите помощника, который знает ваш проект и помогает готовить контент без повторных объяснений с нуля.",
  },
  {
    title: "Бонусы под карусели и воронку",
    text: "Дополнительно — плагины для личных каруселей под вашу аудиторию и для проектирования пути клиента.",
  },
] as const;

export function FlagshipProgram() {
  const product = getProductBySlug("program", AI_EXPERT_SLUG);
  if (!product) return null;

  const href = getProductHref(product);

  return (
    <Section tone="accent" lines="right" autumnDecor>
      <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="order-1 min-w-0 lg:order-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            Программа-флагман
          </p>
          <h2 className="mt-3 text-balance text-3xl leading-tight md:text-4xl lg:text-[2.75rem]">
            {product.title}
          </h2>
          <p className="mt-4 max-w-xl text-lg font-medium leading-snug text-foreground md:text-xl">
            Если вы развиваете свои услуги — эта программа для вас
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Не ещё одно обучение «про нейросети», а практическая система: вы
            работаете на своём проекте и собираете материалы, которые помогут
            продвигать одну выбранную услугу.
          </p>

          <p className="mt-5 text-sm font-medium tracking-wide text-accent">
            {AI_EXPERT_META}
          </p>
          <p className="mt-2 font-display text-4xl tracking-tight text-accent">
            {AI_EXPERT_PRICE_LABEL}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BuyButton
              product={product}
              label="Начать обучение"
              className="w-full sm:w-auto"
            />
            <Button
              href={href}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              metrikaGoal={yandexMetrika.goals.ctaPrograms}
            >
              Смотреть программу
            </Button>
          </div>
        </div>

        <div className="order-2 min-w-0 lg:order-1">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-chocolate/10 bg-card shadow-card">
            <div className="relative aspect-[4/5] sm:aspect-[5/6]">
              <SiteImage
                src={AI_EXPERT_HERO_POSTER}
                alt={`${product.title} — программа-флагман`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(26_22_18/0.55)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
                  Практический результат
                </p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white md:text-base">
                  Предложение, контент и собственный AI-плагин для вашей услуги
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {pillars.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.35rem] border border-chocolate/10 bg-card/90 px-5 py-5 md:px-6 md:py-6"
          >
            <h3 className="text-lg leading-snug md:text-xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
