import type { CardSettings } from "@/types/card-settings";
import type { DirectionId } from "@/types/product";

export type Topic = CardSettings & {
  id: string;
  slug: string;
  directionId: DirectionId;
  title: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  intro: string;
  description: string;
  featuredProgramSlugs?: string[];
};
