"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { rewardsConfig } from "@/lib/content/rewards";
import { loadRewardsProgress } from "@/lib/rewards/progress";

export function RewardsTeaser() {
  const [bonuses, setBonuses] = useState<number | null>(null);

  useEffect(() => {
    setBonuses(loadRewardsProgress().bonuses);
  }, []);

  return (
    <Section tone="accent" lines="left">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            Колесо активностей
          </p>
          <h2 className="mt-4 text-balance text-3xl md:text-4xl lg:text-5xl">
            Пять дней линии — и скидка на мастер-класс
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Каждый день соберите парные знаки сайта. За круг — {rewardsConfig.dailyBonus}{" "}
            бонусов. На {rewardsConfig.rewardThreshold} бонусах открывается скидка{" "}
            {rewardsConfig.discountPercent}% на любой мастер-класс.
          </p>
          <div className="mt-8">
            <Button href={rewardsConfig.path} size="lg">
              {bonuses ? `Продолжить круг · ${bonuses} бонусов` : "Открыть колесо подарков"}
            </Button>
          </div>
        </div>
        <p className="font-display text-6xl leading-none text-accent/20 md:text-7xl lg:text-8xl">
          10 → 50
        </p>
      </div>
    </Section>
  );
}
