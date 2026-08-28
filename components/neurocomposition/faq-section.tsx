import type { FaqItem } from "@/types/product";
import { Section, SectionHeader } from "@/components/layout/section";
import { ProductFaq } from "@/components/product/product-faq";

type FaqSectionProps = {
  items: FaqItem[];
};

export function FaqSection({ items }: FaqSectionProps) {
  if (!items.length) return null;

  return (
    <Section>
      <SectionHeader
        align="center"
        eyebrow="FAQ"
        title="Частые вопросы"
      />
      <div className="mx-auto max-w-3xl">
        <ProductFaq items={items} />
      </div>
    </Section>
  );
}
