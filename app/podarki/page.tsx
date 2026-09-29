import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CurvedLines } from "@/components/decor/curved-lines";
import { RewardsHub } from "@/components/rewards/rewards-hub";
import { rewardsConfig } from "@/lib/content/rewards";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Колесо подарков",
  description:
    "Ежедневная игра на сайте: соберите парные знаки нейрографики, копите бонусы и откройте скидку 50% на мастер-класс.",
  path: rewardsConfig.path,
  keywords: [
    "подарки нейрографика",
    "скидка на мастер-класс",
    "игра на сайте",
    "бонусы Галина Оноприенко",
  ],
});

export default function RewardsPage() {
  return (
    <section className="relative overflow-hidden section-padding pt-32">
      <CurvedLines variant="hero" className="opacity-55" />
      <Container className="relative z-10">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Подарки" },
          ]}
        />
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
          Колесо активностей
        </p>
        <h1 className="mt-4 max-w-3xl text-balance text-4xl md:text-5xl">
          Пять дней внимания — подарок на практику
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Зайдите, найдите парные карточки со знаками сайта и получите{" "}
          {rewardsConfig.dailyBonus} бонусов. Когда на круге будет{" "}
          {rewardsConfig.rewardThreshold} бонусов, откроется скидка{" "}
          {rewardsConfig.discountPercent}% на любой мастер-класс.
        </p>
        <div className="mt-14">
          <RewardsHub />
        </div>
      </Container>
    </section>
  );
}
