import type { Product } from "@/types/product";
import { JsonLd } from "@/components/seo/json-ld";
import { HeroSection } from "@/components/neurocomposition/hero-section";
import { AudienceSection } from "@/components/neurocomposition/audience-section";
import { TransformationSection } from "@/components/neurocomposition/transformation-section";
import { ProgramSection } from "@/components/neurocomposition/program-section";
import { CourseFormatSection } from "@/components/neurocomposition/course-format-section";
import { ReviewSection } from "@/components/neurocomposition/review-section";
import { ResultsSection } from "@/components/neurocomposition/results-section";
import { PricingSection } from "@/components/neurocomposition/pricing-section";
import { FaqSection } from "@/components/neurocomposition/faq-section";
import { FinalCta } from "@/components/neurocomposition/final-cta";
import { StickyCta } from "@/components/neurocomposition/sticky-cta";
import {
  breadcrumbSchema,
  faqSchema,
  productSchema,
} from "@/lib/seo/product-schema";

type NeurocompositionPageProps = {
  product: Product;
};

export function NeurocompositionPage({ product }: NeurocompositionPageProps) {
  const schemas = [
    productSchema(product),
    breadcrumbSchema([
      { name: "Главная", path: "/" },
      { name: "Программы", path: "/programs" },
      { name: product.title, path: `/programs/${product.slug}` },
    ]),
    faqSchema(product.faq),
  ].filter(Boolean);

  return (
    <>
      <JsonLd data={schemas as Record<string, unknown>[]} />
      <HeroSection product={product} />
      <AudienceSection />
      <TransformationSection />
      <ProgramSection product={product} />
      <CourseFormatSection />
      <ReviewSection />
      <ResultsSection />
      <PricingSection product={product} />
      <FaqSection items={product.faq} />
      <FinalCta product={product} />
      <StickyCta product={product} />
    </>
  );
}
