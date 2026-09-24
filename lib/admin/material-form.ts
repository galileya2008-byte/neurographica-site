import {
  type Material,
  type MaterialType,
} from "@/types/material";
import type { CardColorId } from "@/types/card-settings";

export type MaterialFormState = {
  title: string;
  slug: string;
  type: MaterialType;
  excerpt: string;
  contentText: string;
  cover: string;
  mediaUrl: string;
  readingMinutes: string;
  sortOrder: string;
  cardColor: CardColorId;
  badge: string;
};

export function emptyMaterialForm(cover = ""): MaterialFormState {
  return {
    title: "",
    slug: "",
    type: "article",
    excerpt: "",
    contentText: "",
    cover,
    mediaUrl: "",
    readingMinutes: "5",
    sortOrder: "100",
    cardColor: "default",
    badge: "",
  };
}

export function materialToForm(material: Material): MaterialFormState {
  return {
    title: material.title,
    slug: material.slug,
    type: material.type,
    excerpt: material.excerpt,
    contentText: material.content,
    cover: material.cover ?? "",
    mediaUrl: material.mediaUrl ?? "",
    readingMinutes: String(material.readingMinutes),
    sortOrder: String(material.sortOrder ?? 100),
    cardColor: material.cardColor ?? "default",
    badge: material.badge ?? "",
  };
}

export function formToMaterial(
  form: MaterialFormState,
  options?: { publishedAt?: string },
): Material {
  if (!form.title.trim()) throw new Error("Укажите название");
  if (!form.slug.trim()) throw new Error("Укажите slug (латиницей)");
  if (!form.excerpt.trim()) throw new Error("Укажите краткое описание");

  const content = form.contentText.trim();
  if (!content) {
    throw new Error("Добавьте текст материала");
  }

  const readingMinutes = Number(form.readingMinutes.replace(",", "."));
  if (!Number.isFinite(readingMinutes) || readingMinutes < 1) {
    throw new Error("Укажите время чтения (минуты)");
  }
  const sortOrder = Number(form.sortOrder);
  if (!Number.isInteger(sortOrder) || sortOrder < 0) {
    throw new Error("Порядок должен быть целым числом от 0");
  }

  const slug = form.slug.trim();
  const title = form.title.trim();
  const excerpt = form.excerpt.trim();
  const cover = form.cover.trim() || undefined;
  const mediaUrl = form.mediaUrl.trim() || undefined;

  if (form.type === "podcast" && !mediaUrl) {
    throw new Error("Для подкаста добавьте ссылку на аудио или выпуск");
  }
  if (mediaUrl) {
    try {
      new URL(mediaUrl);
    } catch {
      throw new Error("Укажите полную ссылку на выпуск, начиная с https://");
    }
  }

  return {
    id: `mat-${slug}`,
    slug,
    type: form.type,
    title,
    excerpt,
    content,
    ...(cover ? { cover } : {}),
    ...(mediaUrl ? { mediaUrl } : {}),
    sortOrder,
    cardColor: form.cardColor,
    ...(form.badge.trim() ? { badge: form.badge.trim() } : {}),
    publishedAt: options?.publishedAt ?? new Date().toISOString().slice(0, 10),
    readingMinutes: Math.round(readingMinutes),
    seo: {
      title,
      description: excerpt,
    },
  };
}
