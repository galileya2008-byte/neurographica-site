import { HeroHome } from "@/components/sections/hero/hero-home";
import { BenefitsGrid } from "@/components/sections/benefits/benefits-grid";
import { DirectionsCards } from "@/components/sections/directions/directions-cards";
import { PopularMasterclasses } from "@/components/sections/products/popular-masterclasses";
import { ProgramsPreview } from "@/components/sections/products/programs-preview";
import { MaterialsPreview } from "@/components/sections/materials/materials-preview";
import { AboutPreview } from "@/components/sections/about/about-preview";
import { ReviewsSection } from "@/components/sections/reviews/reviews-section";
import { FaqSection } from "@/components/sections/faq/faq-section";
import { FinalCta } from "@/components/sections/cta/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { faqItems, faqPageSchema } from "@/config/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqPageSchema(faqItems.slice(0, 4))} />
      <HeroHome />
      <BenefitsGrid />
      <DirectionsCards />
      <PopularMasterclasses />
      <ProgramsPreview />
      <MaterialsPreview />
      <AboutPreview />
      <ReviewsSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
