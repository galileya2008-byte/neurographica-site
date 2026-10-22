import { BuyButton } from "@/components/product/buy-button";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";
import { yandexMetrika } from "@/config/analytics";
import { PriceDisplay } from "@/components/ai-expert/price-display";
import {
  AI_EXPERT_META,
  AI_EXPERT_PROMO_IMAGE,
  AI_EXPERT_SLUG,
  AI_EXPERT_TIMELESS_OFFER,
} from "@/lib/constants/ai-expert-system";
import { getProductBySlug } from "@/lib/content/products";
import { siteCopy } from "@/lib/content/site-copy";
import { getProductHref } from "@/lib/domain/products";

export function FlagshipProgram() {
  const product = getProductBySlug("program", AI_EXPERT_SLUG);
  if (!product) return null;

  const href = getProductHref(product);
  const pillars = [
    {
      title: siteCopy(
        "home.flagship.pillar1.title",
        "Одна услуга — вся система",
      ),
      text: siteCopy(
        "home.flagship.pillar1.text",
        "Не разрозненные уроки, а последовательная работа над вашим предложением, аудиторией и материалами продвижения.",
      ),
    },
    {
      title: siteCopy(
        "home.flagship.pillar2.title",
        "Готовые материалы, а не только теория",
      ),
      text: siteCopy(
        "home.flagship.pillar2.text",
        "Профиль, контент-план, публикации, карусель и визуалы — то, что можно сразу использовать в работе.",
      ),
    },
    {
      title: siteCopy(
        "home.flagship.pillar3.title",
        "Свой AI-плагин под практику",
      ),
      text: siteCopy(
        "home.flagship.pillar3.text",
        "Создадите помощника, который знает ваш проект и помогает готовить контент без повторных объяснений с нуля.",
      ),
    },
    {
      title: siteCopy(
        "home.flagship.pillar4.title",
        "Бонусы под карусели и воронку",
      ),
      text: siteCopy(
        "home.flagship.pillar4.text",
        "Дополнительно — плагины для личных каруселей под вашу аудиторию и для проектирования пути клиента.",
      ),
    },
  ];

  return (
    <Section tone="accent" lines="right" autumnDecor>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-10 xl:grid-cols-[minmax(0,30rem)_1.1fr] xl:gap-12">
        <div className="order-1 min-w-0 lg:order-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            {siteCopy("home.flagship.eyebrow", "Программа-флагман")}
          </p>
          <h2 className="mt-3 text-balance text-3xl leading-tight md:text-4xl lg:text-[2.75rem]">
            {product.title}
          </h2>
          <p className="mt-4 max-w-xl text-lg font-medium leading-snug text-foreground md:text-xl">
            {siteCopy(
              "home.flagship.lead",
              "Если вы развиваете свои услуги — эта программа для вас",
            )}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {siteCopy(
              "home.flagship.description",
              "Не ещё одно обучение «про нейросети», а практическая система: вы работаете на своём проекте и собираете материалы, которые помогут продвигать одну выбранную услугу.",
            )}
          </p>

          <p className="mt-5 text-sm font-medium tracking-wide text-accent">
            {AI_EXPERT_META}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-chocolate">
            {AI_EXPERT_TIMELESS_OFFER}
          </p>
          <PriceDisplay className="mt-2" size="md" />

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BuyButton
              product={product}
              label={siteCopy("home.flagship.ctaPrimary", "Начать обучение")}
              className="w-full sm:w-auto"
            />
            <Button
              href={href}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              metrikaGoal={yandexMetrika.goals.ctaPrograms}
            >
              {siteCopy("home.flagship.ctaSecondary", "Смотреть программу")}
            </Button>
          </div>
        </div>

        <div className="order-2 min-w-0 lg:order-1">
          <div className="premium-card overflow-hidden rounded-[1.75rem] bg-[#0b1a2e]">
            <SiteImage
              src={AI_EXPERT_PROMO_IMAGE}
              alt={`${product.title} — 10 990 ₽, три личных плагина, Сплит и рассрочка`}
              width={1024}
              height={682}
              loading="lazy"
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {pillars.map((item) => (
          <article
            key={item.title}
            className="premium-card rounded-[1.35rem] px-5 py-5 md:px-6 md:py-6"
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
