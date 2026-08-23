export const directionIds = [
  "intention",
  "planning",
  "motivation",
  "self-realization",
  "relationships",
  "finance",
  "beginners",
] as const;

export type DirectionId = (typeof directionIds)[number];

export type ProductType = "masterclass" | "program";
export type ProductLevel = "beginner" | "intermediate" | "advanced";
export type ProductFormat = "online" | "recorded" | "live";

export type FaqItem = {
  question: string;
  answer: string;
};

export type Product = {
  id: string;
  slug: string;
  type: ProductType;
  title: string;
  shortDescription: string;
  description: string;
  cover: string;
  price: number;
  currency: "RUB";
  getcourseUrl: string;
  directions: DirectionId[];
  level: ProductLevel;
  format: ProductFormat;
  duration: string;
  isPopular: boolean;
  isFeatured: boolean;
  publishedAt: string;
  audience: string[];
  agenda: string[];
  faq: FaqItem[];
  seo?: {
    title?: string;
    description?: string;
  };
};

export type CatalogFilters = {
  q?: string;
  direction?: DirectionId | "all";
  level?: ProductLevel | "all";
  format?: ProductFormat | "all";
  popularOnly?: boolean;
  sort?: "popular" | "newest" | "price-asc" | "price-desc";
};

export const levelLabels: Record<ProductLevel, string> = {
  beginner: "Для начинающих",
  intermediate: "Средний уровень",
  advanced: "Продвинутый",
};

export const formatLabels: Record<ProductFormat, string> = {
  online: "Онлайн",
  recorded: "В записи",
  live: "Живой эфир",
};
