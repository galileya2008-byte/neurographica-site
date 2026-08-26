import type { Metadata } from "next";
import { defaultKeywords, faqItems, faqPageSchema } from "@/config/seo";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CurvedLines } from "@/components/decor/curved-lines";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Частые вопросы",
  description:
    "Ответы на частые запросы: как навести порядок в мыслях, вернуть мотивацию, понять свои желания и перейти от намерения к действию.",
  path: "/faq",
  keywords: [...defaultKeywords],
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(faqItems)} />
      <section className="relative overflow-hidden section-padding pt-32">
        <CurvedLines variant="section-left" />
        <Container className="relative z-10 max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "FAQ" },
            ]}
          />

          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            FAQ
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl">Частые вопросы</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Здесь собраны ответы на запросы, которые чаще всего приводят людей к
            практике: ясность, мотивация, намерение, самопознание и знакомство с
            нейрографикой.
          </p>

          <div className="mt-12">
            <FaqAccordion items={faqItems} defaultOpenIndex={0} />
          </div>
        </Container>
      </section>
    </>
  );
}
