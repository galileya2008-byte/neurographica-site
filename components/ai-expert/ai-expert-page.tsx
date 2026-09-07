import type { Product } from "@/types/product";
import { JsonLd } from "@/components/seo/json-ld";
import { HeroSection } from "@/components/ai-expert/hero-section";
import { NarrativeSection } from "@/components/ai-expert/narrative-section";
import { ProgramSection } from "@/components/ai-expert/program-section";
import { OutcomesSection } from "@/components/ai-expert/outcomes-section";
import { AuthorSection } from "@/components/ai-expert/author-section";
import { PricingSection } from "@/components/ai-expert/pricing-section";
import { FaqSection } from "@/components/ai-expert/faq-section";
import { FinalCta } from "@/components/ai-expert/final-cta";
import { StickyCta } from "@/components/ai-expert/sticky-cta";
import {
  aiExpertCopy,
  aiExpertFaq,
} from "@/lib/content/ai-expert-system";
import {
  breadcrumbSchema,
  faqSchema,
  productSchema,
} from "@/lib/seo/product-schema";

type AiExpertPageProps = {
  product: Product;
};

export function AiExpertPage({ product }: AiExpertPageProps) {
  const faqProduct = { ...product, faq: aiExpertFaq };

  const schemas = [
    productSchema(faqProduct),
    breadcrumbSchema([
      { name: "Главная", path: "/" },
      { name: "Программы", path: "/programs" },
      { name: product.title, path: `/programs/${product.slug}` },
    ]),
    faqSchema(aiExpertFaq),
  ].filter(Boolean);

  return (
    <>
      <JsonLd data={schemas as Record<string, unknown>[]} />
      <HeroSection product={product} />
      <NarrativeSection
        title={aiExpertCopy.pain.title}
        paragraphs={aiExpertCopy.pain.paragraphs}
        tone="warm"
        lines="left"
      />
      <NarrativeSection
        title={aiExpertCopy.method.title}
        paragraphs={aiExpertCopy.method.paragraphs}
      />
      <ProgramSection />
      <OutcomesSection />
      <NarrativeSection
        eyebrow={aiExpertCopy.audience.eyebrow}
        title={aiExpertCopy.audience.title}
        paragraphs={aiExpertCopy.audience.paragraphs}
        tone="accent"
      />
      <NarrativeSection
        eyebrow={aiExpertCopy.format.eyebrow}
        title={aiExpertCopy.format.title}
        paragraphs={[
          ...aiExpertCopy.format.paragraphs,
          aiExpertCopy.format.highlight,
        ]}
        tone="warm"
        lines="right"
      />
      <AuthorSection />
      <PricingSection product={product} />
      <FaqSection items={aiExpertFaq} />
      <FinalCta product={product} />
      <StickyCta product={product} />
    </>
  );
}
