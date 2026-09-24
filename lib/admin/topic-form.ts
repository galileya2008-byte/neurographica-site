import type { CardColorId } from "@/types/card-settings";
import type { DirectionId } from "@/types/product";
import type { Topic } from "@/types/topic";

export type TopicFormState = {
  title: string;
  slug: string;
  directionId: DirectionId;
  seoTitle: string;
  seoDescription: string;
  keywordsText: string;
  intro: string;
  description: string;
  featuredProgramSlugsText: string;
  sortOrder: string;
  cardColor: CardColorId;
  badge: string;
};

export function emptyTopicForm(): TopicFormState {
  return {
    title: "",
    slug: "",
    directionId: "self-realization",
    seoTitle: "",
    seoDescription: "",
    keywordsText: "",
    intro: "",
    description: "",
    featuredProgramSlugsText: "",
    sortOrder: "100",
    cardColor: "default",
    badge: "",
  };
}

export function topicToForm(topic: Topic): TopicFormState {
  return {
    title: topic.title,
    slug: topic.slug,
    directionId: topic.directionId,
    seoTitle: topic.seoTitle,
    seoDescription: topic.seoDescription,
    keywordsText: topic.keywords.join("\n"),
    intro: topic.intro,
    description: topic.description,
    featuredProgramSlugsText: (topic.featuredProgramSlugs ?? []).join("\n"),
    sortOrder: String(topic.sortOrder ?? 100),
    cardColor: topic.cardColor ?? "default",
    badge: topic.badge ?? "",
  };
}

export function formToTopic(
  form: TopicFormState,
  existingId?: string,
): Topic {
  const keywords = form.keywordsText
    .split("\n")
    .map((value) => value.trim())
    .filter(Boolean);
  const featuredProgramSlugs = form.featuredProgramSlugsText
    .split("\n")
    .map((value) => value.trim())
    .filter(Boolean);
  const sortOrder = Number(form.sortOrder);

  if (!form.title.trim()) throw new Error("Укажите название карточки");
  if (!form.slug.trim()) throw new Error("Укажите slug");
  if (!form.seoTitle.trim()) throw new Error("Укажите заголовок страницы");
  if (!form.seoDescription.trim()) throw new Error("Укажите SEO-описание");
  if (!form.intro.trim()) throw new Error("Добавьте вступление");
  if (!form.description.trim()) throw new Error("Добавьте описание карточки");
  if (!keywords.length) throw new Error("Добавьте хотя бы одну ключевую фразу");
  if (!Number.isInteger(sortOrder) || sortOrder < 0) {
    throw new Error("Порядок должен быть целым числом от 0");
  }

  const slug = form.slug.trim();
  return {
    id: existingId ?? `topic-${slug}`,
    slug,
    directionId: form.directionId,
    title: form.title.trim(),
    seoTitle: form.seoTitle.trim(),
    seoDescription: form.seoDescription.trim(),
    keywords,
    intro: form.intro.trim(),
    description: form.description.trim(),
    ...(featuredProgramSlugs.length ? { featuredProgramSlugs } : {}),
    sortOrder,
    cardColor: form.cardColor,
    ...(form.badge.trim() ? { badge: form.badge.trim() } : {}),
  };
}
