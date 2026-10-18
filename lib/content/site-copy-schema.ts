export type SiteCopyFieldDef = {
  key: string;
  label: string;
  hint?: string;
  multiline?: boolean;
};

export type SiteCopyGroupDef = {
  id: string;
  label: string;
  description: string;
  fields: SiteCopyFieldDef[];
};

/** Какие поля можно править в админке «Тексты сайта» */
export const siteCopyGroups: SiteCopyGroupDef[] = [
  {
    id: "site",
    label: "Общее",
    description: "Описание сайта для SEO и футера.",
    fields: [
      {
        key: "site.description",
        label: "Описание сайта",
        multiline: true,
      },
    ],
  },
  {
    id: "home-hero",
    label: "Главная — герой",
    description: "Первый экран главной страницы.",
    fields: [
      { key: "home.hero.eyebrow", label: "Надзаголовок" },
      { key: "home.hero.headline", label: "Заголовок H1", multiline: true },
      { key: "home.hero.subtitle", label: "Подзаголовок", multiline: true },
      { key: "home.hero.ctaPrimary", label: "Кнопка 1" },
      { key: "home.hero.ctaSecondary", label: "Кнопка 2" },
      { key: "home.hero.trustLine", label: "Строка доверия" },
      { key: "home.hero.quote1", label: "Цитата, строка 1", multiline: true },
      { key: "home.hero.quote2", label: "Цитата, строка 2", multiline: true },
    ],
  },
  {
    id: "home-flagship",
    label: "Главная — флагман",
    description: "Блок программы «Персональная AI-система».",
    fields: [
      { key: "home.flagship.eyebrow", label: "Надзаголовок" },
      { key: "home.flagship.lead", label: "Лид", multiline: true },
      { key: "home.flagship.description", label: "Описание", multiline: true },
      { key: "home.flagship.ctaPrimary", label: "Кнопка 1" },
      { key: "home.flagship.ctaSecondary", label: "Кнопка 2" },
      { key: "home.flagship.pillar1.title", label: "Карточка 1 — заголовок" },
      {
        key: "home.flagship.pillar1.text",
        label: "Карточка 1 — текст",
        multiline: true,
      },
      { key: "home.flagship.pillar2.title", label: "Карточка 2 — заголовок" },
      {
        key: "home.flagship.pillar2.text",
        label: "Карточка 2 — текст",
        multiline: true,
      },
      { key: "home.flagship.pillar3.title", label: "Карточка 3 — заголовок" },
      {
        key: "home.flagship.pillar3.text",
        label: "Карточка 3 — текст",
        multiline: true,
      },
      { key: "home.flagship.pillar4.title", label: "Карточка 4 — заголовок" },
      {
        key: "home.flagship.pillar4.text",
        label: "Карточка 4 — текст",
        multiline: true,
      },
    ],
  },
  {
    id: "home-cta",
    label: "Главная — финальный CTA",
    description: "Нижний призыв к действию на главной.",
    fields: [
      { key: "home.finalCta.eyebrow", label: "Надзаголовок" },
      { key: "home.finalCta.title", label: "Заголовок", multiline: true },
      {
        key: "home.finalCta.description",
        label: "Описание",
        multiline: true,
      },
      { key: "home.finalCta.ctaPrimary", label: "Кнопка 1" },
      { key: "home.finalCta.ctaSecondary", label: "Кнопка 2" },
      { key: "home.finalCta.sideEyebrow", label: "Подпись у фото" },
    ],
  },
  {
    id: "materials",
    label: "Статьи и подкасты",
    description: "Вводный текст раздела /materials.",
    fields: [
      { key: "materials.lead", label: "Лид", multiline: true },
      { key: "materials.description", label: "Описание", multiline: true },
    ],
  },
];

export const siteCopyKeys = siteCopyGroups.flatMap((group) =>
  group.fields.map((field) => field.key),
);
