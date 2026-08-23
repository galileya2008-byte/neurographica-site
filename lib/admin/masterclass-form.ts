import type { DirectionId, Product, ProductFormat, ProductLevel } from "@/types/product";

export type MasterclassFormState = {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  cover: string;
  price: string;
  getcourseUrl: string;
  directions: DirectionId[];
  level: ProductLevel;
  format: ProductFormat;
  duration: string;
  isPopular: boolean;
  isFeatured: boolean;
  audienceText: string;
  agendaText: string;
  faqQuestion: string;
  faqAnswer: string;
};

export function emptyMasterclassForm(cover: string): MasterclassFormState {
  return {
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    cover,
    price: "2990",
    getcourseUrl: "https://getcourse.ru/",
    directions: ["beginners"],
    level: "beginner",
    format: "recorded",
    duration: "2 часа",
    isPopular: false,
    isFeatured: false,
    audienceText: "",
    agendaText: "",
    faqQuestion: "",
    faqAnswer: "",
  };
}

export function productToForm(product: Product): MasterclassFormState {
  const faq = product.faq[0];
  return {
    title: product.title,
    slug: product.slug,
    shortDescription: product.shortDescription,
    description: product.description,
    cover: product.cover,
    price: String(product.price),
    getcourseUrl: product.getcourseUrl,
    directions: product.directions,
    level: product.level,
    format: product.format,
    duration: product.duration,
    isPopular: product.isPopular,
    isFeatured: product.isFeatured,
    audienceText: product.audience.join("\n"),
    agendaText: product.agenda.join("\n"),
    faqQuestion: faq?.question ?? "",
    faqAnswer: faq?.answer ?? "",
  };
}

export function formToProduct(
  form: MasterclassFormState,
  options?: { publishedAt?: string },
): Product {
  const price = Number(form.price.replace(/\s/g, "").replace(",", "."));
  if (!Number.isFinite(price) || price < 0) {
    throw new Error("Укажите корректную стоимость");
  }

  const audience = form.audienceText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const agenda = form.agendaText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (!form.title.trim()) throw new Error("Укажите название");
  if (!form.slug.trim()) throw new Error("Укажите slug (латиницей)");
  if (!form.shortDescription.trim()) throw new Error("Укажите короткое описание");
  if (!form.description.trim()) throw new Error("Укажите полное описание");
  if (!form.getcourseUrl.trim()) throw new Error("Укажите ссылку GetCourse");
  if (!form.directions.length) throw new Error("Выберите хотя бы одно направление");
  if (!audience.length) throw new Error("Добавьте хотя бы один пункт «Для кого»");
  if (!agenda.length) throw new Error("Добавьте хотя бы один пункт программы");

  const faq =
    form.faqQuestion.trim() && form.faqAnswer.trim()
      ? [{ question: form.faqQuestion.trim(), answer: form.faqAnswer.trim() }]
      : [];

  return {
    id: `mc-${form.slug.trim()}`,
    slug: form.slug.trim(),
    type: "masterclass",
    title: form.title.trim(),
    shortDescription: form.shortDescription.trim(),
    description: form.description.trim(),
    cover: form.cover,
    price,
    currency: "RUB",
    getcourseUrl: form.getcourseUrl.trim(),
    directions: form.directions,
    level: form.level,
    format: form.format,
    duration: form.duration.trim() || "2 часа",
    isPopular: form.isPopular,
    isFeatured: form.isFeatured,
    publishedAt: options?.publishedAt ?? new Date().toISOString().slice(0, 10),
    audience,
    agenda,
    faq,
    seo: {
      title: `Мастер-класс «${form.title.trim()}»`,
      description: form.shortDescription.trim(),
    },
  };
}
