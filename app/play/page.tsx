import type { Metadata } from "next";
import { engagementConfig } from "@/config/engagement";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CurvedLines } from "@/components/decor/curved-lines";
import { IntentionLineGame } from "@/components/engagement/intention-line-game";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: engagementConfig.game.title,
  description: engagementConfig.game.subtitle,
  path: "/play",
  keywords: [
    "нейрографика практика",
    "интерактив",
    "НейроКомпозиция 2026",
    "промокод",
    engagementConfig.course.promoCode,
  ],
});

export default function PlayPage() {
  return (
    <>
      <section className="relative overflow-hidden section-padding pt-32">
        <CurvedLines variant="hero" className="opacity-50" />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: engagementConfig.game.title },
            ]}
          />

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              Мини-практика
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl">{engagementConfig.game.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {engagementConfig.game.subtitle}
            </p>
            <p className="mt-3 text-sm text-muted">
              Курс «{engagementConfig.course.name}» · скидка{" "}
              {engagementConfig.course.discountLabel} · промокод выдаётся один раз
            </p>
          </div>

          <IntentionLineGame />
        </Container>
      </section>
    </>
  );
}
