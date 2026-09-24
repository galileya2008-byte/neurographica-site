import { z } from "zod";
import { cardColorIds } from "@/types/card-settings";
import { materialTypeIds } from "@/types/material";
import { directionIds } from "@/types/product";
import { siteThemePresetIds } from "@/types/site-theme";

const cardSettingsSchema = {
  sortOrder: z.number().int().nonnegative().optional(),
  cardColor: z.enum(cardColorIds).optional(),
  badge: z.string().max(30).optional(),
};

export const productSchema = z.object({
  ...cardSettingsSchema,
  id: z.string().min(1),
  slug: z.string().min(1),
  type: z.enum(["masterclass", "program"]),
  title: z.string().min(1),
  shortDescription: z.string().min(1),
  description: z.string().min(1),
  cover: z.string().min(1),
  price: z.number().nonnegative(),
  currency: z.literal("RUB"),
  getcourseUrl: z.string().url(),
  directions: z.array(z.enum(directionIds)).min(1),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  format: z.enum(["online", "recorded", "live"]),
  duration: z.string().min(1),
  isPopular: z.boolean(),
  isFeatured: z.boolean(),
  publishedAt: z.string().min(1),
  audience: z.array(z.string()).min(1),
  agenda: z.array(z.string()).min(1),
  faq: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    }),
  ),
  supplement: z
    .object({
      badge: z.string().min(1),
      title: z.string().min(1),
      lead: z.string().min(1),
      description: z.string().min(1),
      note: z.string().optional(),
      highlights: z.array(z.string()).optional(),
    })
    .optional(),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
});

export const siteThemeSchema = z.object({
  presetId: z.enum(siteThemePresetIds),
});

export const materialSchema = z.object({
  ...cardSettingsSchema,
  id: z.string().min(1),
  slug: z.string().min(1),
  type: z.enum(materialTypeIds),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z
    .union([z.string().min(1), z.array(z.string()).min(1)])
    .transform((value) =>
      typeof value === "string" ? value.trim() : value.join("\n\n").trim(),
    ),
  cover: z.string().optional(),
  mediaUrl: z.string().url().optional(),
  publishedAt: z.string().min(1),
  readingMinutes: z.number().positive(),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
});

export const topicSchema = z.object({
  ...cardSettingsSchema,
  id: z.string().min(1),
  slug: z.string().min(1),
  directionId: z.enum(directionIds),
  title: z.string().min(1),
  seoTitle: z.string().min(1),
  seoDescription: z.string().min(1),
  keywords: z.array(z.string()).min(1),
  intro: z.string().min(1),
  description: z.string().min(1),
  featuredProgramSlugs: z.array(z.string()).optional(),
});

export const topicsSchema = z.array(topicSchema);
