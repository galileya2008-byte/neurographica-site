import type { CardSettings } from "@/types/card-settings";

export const materialTypeIds = [
  "news",
  "article",
  "podcast",
  "practice",
  "answers",
  "reflection",
] as const;

export type MaterialType = (typeof materialTypeIds)[number];

export const materialTypeLabels: Record<MaterialType, string> = {
  news: "Новость",
  article: "Статья",
  podcast: "Подкаст",
  practice: "Практические рекомендации",
  answers: "Ответы на вопросы",
  reflection: "Авторские размышления",
};

export type Material = CardSettings & {
  id: string;
  slug: string;
  type: MaterialType;
  title: string;
  excerpt: string;
  /** Markdown: заголовки, курсив, ссылки, цитаты, списки */
  content: string;
  cover?: string;
  /** Ссылка на аудиофайл или страницу выпуска на внешней платформе */
  mediaUrl?: string;
  publishedAt: string;
  readingMinutes: number;
  seo?: {
    title?: string;
    description?: string;
  };
};
