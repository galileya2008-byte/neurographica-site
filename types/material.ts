export const materialTypeIds = [
  "article",
  "practice",
  "answers",
  "reflection",
] as const;

export type MaterialType = (typeof materialTypeIds)[number];

export const materialTypeLabels: Record<MaterialType, string> = {
  article: "Статьи",
  practice: "Практические рекомендации",
  answers: "Ответы на вопросы",
  reflection: "Авторские размышления",
};

export type Material = {
  id: string;
  slug: string;
  type: MaterialType;
  title: string;
  excerpt: string;
  /** Markdown: заголовки, курсив, ссылки, цитаты, списки */
  content: string;
  cover?: string;
  publishedAt: string;
  readingMinutes: number;
  seo?: {
    title?: string;
    description?: string;
  };
};
