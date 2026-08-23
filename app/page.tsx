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

export default function HomePage() {
  return (
    <>
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
