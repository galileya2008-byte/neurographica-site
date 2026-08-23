import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ",
  description: "Ответы на частые вопросы о нейрографике, форматах обучения и оплате.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <PlaceholderPage
      title="Частые вопросы"
      description="Полная версия FAQ будет добавлена на следующем этапе."
    />
  );
}
