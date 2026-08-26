export const engagementConfig = {
  course: {
    name: "НейроКомпозиция 2026",
    discountLabel: "−15%",
    /** Промокод для GetCourse — смените здесь при необходимости */
    promoCode: "NEUROCOMP2026",
    getcourseUrl: "https://neirogalina.ru/page276",
  },
  game: {
    slug: "liniya-namereniya",
    title: "Линия намерения",
    subtitle:
      "Короткая интерактивная практика: соберите свой узор и получите промокод на новый курс. Промокод выдаётся один раз.",
    minPoints: 4,
    maxPoints: 6,
  },
  intentions: [
    { id: "clarity", label: "Ясность", hint: "навести порядок в мыслях" },
    { id: "intention", label: "Намерение", hint: "сформулировать направление" },
    { id: "motivation", label: "Мотивация", hint: "найти опору для действия" },
    { id: "self", label: "Себя", hint: "лучше понять свой запрос" },
  ],
  anchorWords: [
    "Спокойствие",
    "Движение",
    "Ясность",
    "Опора",
    "Смелость",
    "Доверие",
  ],
} as const;

export type IntentionId = (typeof engagementConfig.intentions)[number]["id"];
