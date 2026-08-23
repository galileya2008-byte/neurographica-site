import {
  type Material,
  type MaterialType,
} from "@/types/material";

export type MaterialFormState = {
  title: string;
  slug: string;
  type: MaterialType;
  excerpt: string;
  contentText: string;
  cover: string;
  readingMinutes: string;
};

export function emptyMaterialForm(cover = ""): MaterialFormState {
  return {
    title: "",
    slug: "",
    type: "article",
    excerpt: "",
    contentText: "",
    cover,
    readingMinutes: "5",
  };
}

export function materialToForm(material: Material): MaterialFormState {
  return {
    title: material.title,
    slug: material.slug,
    type: material.type,
    excerpt: material.excerpt,
    contentText: material.content.join("\n\n"),
    cover: material.cover ?? "",
    readingMinutes: String(material.readingMinutes),
  };
}

export function formToMaterial(
  form: MaterialFormState,
  options?: { publishedAt?: string },
): Material {
  if (!form.title.trim()) throw new Error("Укажите название");
  if (!form.slug.trim()) throw new Error("Укажите slug (латиницей)");
  if (!form.excerpt.trim()) throw new Error("Укажите краткое описание");

  const content = form.contentText
    .split(/\n\s*\n/)
    .map((block) => block.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  if (!content.length) {
    throw new Error("Добавьте хотя бы один абзац текста");
  }

  const readingMinutes = Number(form.readingMinutes.replace(",", "."));
  if (!Number.isFinite(readingMinutes) || readingMinutes < 1) {
    throw new Error("Укажите время чтения (минуты)");
  }

  const slug = form.slug.trim();
  const title = form.title.trim();
  const excerpt = form.excerpt.trim();
  const cover = form.cover.trim() || undefined;

  return {
    id: `mat-${slug}`,
    slug,
    type: form.type,
    title,
    excerpt,
    content,
    ...(cover ? { cover } : {}),
    publishedAt: options?.publishedAt ?? new Date().toISOString().slice(0, 10),
    readingMinutes: Math.round(readingMinutes),
    seo: {
      title,
      description: excerpt,
    },
  };
}
