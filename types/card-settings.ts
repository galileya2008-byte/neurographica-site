export const cardColorIds = [
  "default",
  "warm",
  "sky",
  "sage",
  "rose",
  "sand",
] as const;

export type CardColorId = (typeof cardColorIds)[number];

export type CardSettings = {
  /** Меньшее число показывается раньше */
  sortOrder?: number;
  cardColor?: CardColorId;
  /** Короткий текст стикера: «Хит», «Новинка», «Выбор автора» */
  badge?: string;
};

export const cardColorLabels: Record<CardColorId, string> = {
  default: "Цвет темы сайта",
  warm: "Тёплый",
  sky: "Голубой",
  sage: "Шалфейный",
  rose: "Розовый",
  sand: "Песочный",
};
