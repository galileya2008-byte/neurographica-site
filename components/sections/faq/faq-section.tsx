import { faqItems } from "@/config/seo";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

const homeFaqItems = faqItems.slice(0, 4);

export function FaqSection() {
  return (
    <Section tone="accent">
      <SectionHeader
        eyebrow="FAQ"
        title="Частые вопросы"
        description="Ответы на запросы, с которых часто начинают: ясность, мотивация, намерение и первые шаги."
      />

      <div className="mx-auto max-w-3xl">
        <FaqAccordion items={homeFaqItems} />
      </div>

      <div className="mt-10 text-center">
        <Button href="/faq" variant="secondary">
          Больше ответов
        </Button>
      </div>
    </Section>
  );
}
