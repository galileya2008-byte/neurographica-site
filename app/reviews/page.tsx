import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Отзывы",
  description: "Отзывы участников мастер-классов и программ Галины Оноприенко.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <PlaceholderPage
      title="Отзывы"
      description="Раздел с отзывами участников будет добавлен вместе с контентом."
    />
  );
}
