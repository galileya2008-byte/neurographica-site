import { HeroHome } from "@/components/sections/hero/hero-home";
import { FlagshipProgram } from "@/components/sections/products/flagship-program";
import { DirectionsCards } from "@/components/sections/directions/directions-cards";
import { PopularMasterclasses } from "@/components/sections/products/popular-masterclasses";
import { ProgramsPreview } from "@/components/sections/products/programs-preview";
import { MaterialsPreview } from "@/components/sections/materials/materials-preview";
import { RewardsTeaser } from "@/components/rewards/rewards-teaser";
import { AboutPreview } from "@/components/sections/about/about-preview";
import { FaqSection } from "@/components/sections/faq/faq-section";
import { FinalCta } from "@/components/sections/cta/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { faqItems, faqPageSchema } from "@/config/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqPageSchema(faqItems)} />
      <HeroHome />
      <DirectionsCards />
      <PopularMasterclasses />
      <FlagshipProgram />
      <ProgramsPreview />
      <MaterialsPreview />
      <AboutPreview />
      <RewardsTeaser />
      <FaqSection />
      <FinalCta />
    </>
  );
}
