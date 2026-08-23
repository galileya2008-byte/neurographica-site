import { z } from "zod";
import { directionIds } from "@/types/product";

export const productSchema = z.object({
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
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
});
