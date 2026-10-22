export const AI_EXPERT_SLUG = "ai-dlya-ekspertov";

export const AI_EXPERT_HERO_VIDEO = "/media/ai-expert/hero.mp4";
export const AI_EXPERT_HERO_POSTER = "/media/ai-expert/hero-poster.jpg";
/** Актуальный промо-баннер программы (цена и условия на изображении) */
export const AI_EXPERT_PROMO_IMAGE = "/media/ai-expert/promo-10990.jpg";

export const AI_EXPERT_PRICE_LABEL = "10 990 ₽";
export const AI_EXPERT_OLD_PRICE_LABEL = "25 000 ₽";
export const AI_EXPERT_NEXT_PRICE_LABEL = "15 000 ₽";
export const AI_EXPERT_PRICE_RISE_DATE_LABEL = "30 октября";

/** Анонс следующего повышения цены */
export const AI_EXPERT_PRICE_RISE_NOTICE =
  "С 30 октября стоимость программы будет 15 000 ₽";

export const AI_EXPERT_PRICE_STAGES = [
  {
    dateLabel: "сейчас",
    priceLabel: AI_EXPERT_PRICE_LABEL,
    note: "текущая стоимость",
  },
  {
    dateLabel: `с ${AI_EXPERT_PRICE_RISE_DATE_LABEL}`,
    priceLabel: AI_EXPERT_NEXT_PRICE_LABEL,
    note: "следующий этап",
  },
] as const;

export const AI_EXPERT_PAYMENT_NOTE =
  "Сплит · беспроцентная рассрочка · карты и СБП. Условия оплаты — при оформлении на GetCourse (Долями, Сплит, СБП, Яндекс, Т-Банк, Альфа Pay и другие доступные способы).";

export const AI_EXPERT_ACCESS_LABEL = "доступ 12 месяцев";

export const AI_EXPERT_META =
  "16 практических уроков · Самостоятельное обучение · Доступ 12 месяцев";

export const AI_EXPERT_STICKY_META = "16 уроков · доступ 12 месяцев";

export const AI_EXPERT_TIMELESS_OFFER =
  "Вы осваиваете работу с аудиторией, предложением и контекстом своего проекта. Инструкции по конкретным сервисам могут обновляться — навык проверки и адаптации ответов ИИ остаётся с вами.";

/** Пример премиум-карусели из плагина для личных каруселей */
export const AI_EXPERT_CAROUSEL_EXAMPLE = {
  eyebrow: "Пример результата",
  title: "Личная карусель премиум-уровня под современный визуал",
  description:
    "Так выглядит карусель, собранная с опорой на вашу экспертность, аудиторию и визуальный стиль. В программе вы создаёте плагин, который помогает готовить сценарий, тексты и структуру таких слайдов — а финальную проверку и правку оставляете за собой.",
  slides: [
    {
      src: "/media/ai-expert/carousel/01.jpg",
      alt: "Слайд карусели: красиво написано — а в чём смысл для клиента",
      caption: "Крючок: красивый текст без задачи читателя",
    },
    {
      src: "/media/ai-expert/carousel/02.jpg",
      alt: "Слайд карусели: что общего у исторического романа и текста, написанного ИИ",
      caption: "Аналогия: язык есть, смысла может не быть",
    },
    {
      src: "/media/ai-expert/carousel/03.jpg",
      alt: "Слайд карусели: с нейросетью похожая история",
      caption: "Проблема: ИИ не знает вашу аудиторию и услугу",
    },
    {
      src: "/media/ai-expert/carousel/04.jpg",
      alt: "Слайд карусели: сначала — главная мысль",
      caption: "Метод: начать с предложения и аудитории",
    },
    {
      src: "/media/ai-expert/carousel/05.jpg",
      alt: "Слайд карусели: а затем — персональный ИИ",
      caption: "Решение: настройка плагина под ваш проект",
    },
    {
      src: "/media/ai-expert/carousel/06.jpg",
      alt: "Слайд карусели: Галина Оноприенко о текстах со смыслом",
      caption: "Итог: тексты со смыслом и вашим голосом",
    },
  ],
} as const;
