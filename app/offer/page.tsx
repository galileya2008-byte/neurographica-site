import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Публичная оферта",
  description: "Публичная оферта на образовательные услуги.",
  path: "/offer",
});

export default function OfferPage() {
  return (
    <PlaceholderPage
      title="Публичная оферта"
      description="Текст оферты будет добавлен позже."
    />
  );
}
