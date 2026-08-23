import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Политика конфиденциальности",
  description: "Политика конфиденциальности сайта.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PlaceholderPage
      title="Политика конфиденциальности"
      description="Юридический текст будет добавлен позже."
    />
  );
}
