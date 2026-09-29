"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ActivityWheel } from "@/components/rewards/activity-wheel";
import { MemoryGame } from "@/components/rewards/memory-game";
import { Button } from "@/components/ui/button";
import { yandexMetrika } from "@/config/analytics";
import { siteConfig } from "@/config/site";
import { rewardsConfig, telegramClaimUrl } from "@/lib/content/rewards";
import { reachMetrikaGoal } from "@/lib/analytics/metrika-client";
import {
  applyDailyWin,
  hasAwardForToday,
  loadRewardsProgress,
  saveRewardsProgress,
  type RewardsProgress,
} from "@/lib/rewards/progress";

function daysLabel(count: number): string {
  const n10 = count % 10;
  const n100 = count % 100;
  if (n10 === 1 && n100 !== 11) return `${count} день`;
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return `${count} дня`;
  return `${count} дней`;
}

export function RewardsHub() {
  const [progress, setProgress] = useState<RewardsProgress | null>(null);

  useEffect(() => {
    setProgress(loadRewardsProgress());
  }, []);

  if (!progress) {
    return (
      <div className="min-h-[24rem] rounded-[1.75rem] border border-chocolate/10 bg-card/70" />
    );
  }

  const awardedToday = hasAwardForToday(progress);
  const unlocked = progress.bonuses >= rewardsConfig.rewardThreshold;
  const daysLeft = Math.max(
    0,
    Math.ceil(
      (rewardsConfig.rewardThreshold - progress.bonuses) / rewardsConfig.dailyBonus,
    ),
  );

  function completeGame() {
    setProgress((current) => {
      if (!current) return current;
      if (hasAwardForToday(current)) return current;
      const next = applyDailyWin(current);
      saveRewardsProgress(next);
      reachMetrikaGoal(yandexMetrika.goals.rewardsDaily);
      if (
        next.bonuses >= rewardsConfig.rewardThreshold &&
        current.bonuses < rewardsConfig.rewardThreshold
      ) {
        reachMetrikaGoal(yandexMetrika.goals.rewardsUnlock);
      }
      return next;
    });
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div className="rounded-[1.75rem] border border-chocolate/10 bg-[linear-gradient(180deg,_rgb(252_250_246)_0%,_rgb(235_228_216/0.55)_100%)] p-6 shadow-soft md:p-8">
        <ActivityWheel bonuses={progress.bonuses} />
        <ul className="mt-8 space-y-3 text-sm leading-relaxed text-muted">
          <li>Зайти сегодня и собрать пары — {rewardsConfig.dailyBonus} бонусов.</li>
          <li>
            {rewardsConfig.rewardThreshold} бонусов — скидка {rewardsConfig.discountPercent}% на
            любой мастер-класс.
          </li>
          <li>
            {unlocked
              ? "Подарок открыт."
              : daysLeft === 1
                ? "Остался один день круга."
                : `Ещё ${daysLabel(daysLeft)} при ежедневном заходе.`}
          </li>
        </ul>
      </div>

      <div className="space-y-8">
        {unlocked ? (
          <div className="rounded-[1.75rem] border border-gold/35 bg-card p-6 shadow-card md:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
              Подарок
            </p>
            <h2 className="mt-3 text-3xl">Скидка {rewardsConfig.discountPercent}% на мастер-класс</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Круг из пяти дней собран. Выберите занятие в каталоге и примените подарок при
              оплате.
            </p>
            {rewardsConfig.promoCode ? (
              <p className="mt-5 rounded-2xl bg-warm/70 px-4 py-3 font-display text-2xl tracking-[0.08em] text-accent">
                {rewardsConfig.promoCode}
              </p>
            ) : (
              <p className="mt-5 text-base leading-relaxed text-muted">
                Напишите {siteConfig.expert.split(" ")[0]} в Telegram — откроем скидку на выбранный
                мастер-класс.
              </p>
            )}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/masterclasses" metrikaGoal={yandexMetrika.goals.ctaMasterclasses}>
                Выбрать мастер-класс
              </Button>
              {!rewardsConfig.promoCode ? (
                <Button
                  href={telegramClaimUrl()}
                  variant="secondary"
                  metrikaGoal={yandexMetrika.goals.telegram}
                >
                  Получить скидку в Telegram
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="rounded-[1.75rem] border border-chocolate/10 bg-card/80 p-6 shadow-soft md:p-8">
          <MemoryGame alreadyAwarded={awardedToday} onComplete={completeGame} />
        </div>

        <p className="text-sm leading-relaxed text-muted">
          Прогресс хранится в этом браузере. Если зайдёте с другого устройства, круг начнётся
          заново. Подробнее — в{" "}
          <Link href="/privacy" className="text-accent hover:opacity-80">
            политике конфиденциальности
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
