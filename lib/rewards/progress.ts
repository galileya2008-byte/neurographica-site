import { moscowDateKey, rewardsConfig } from "@/lib/content/rewards";

const STORAGE_KEY = "ng_activity_wheel";

export type RewardsProgress = {
  bonuses: number;
  lastAwardDate: string | null;
  daysPlayed: number;
  unlockedAt: string | null;
};

const emptyProgress: RewardsProgress = {
  bonuses: 0,
  lastAwardDate: null,
  daysPlayed: 0,
  unlockedAt: null,
};

export function loadRewardsProgress(): RewardsProgress {
  if (typeof window === "undefined") return emptyProgress;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress;
    const parsed = JSON.parse(raw) as Partial<RewardsProgress>;
    return {
      bonuses: Math.max(0, Number(parsed.bonuses) || 0),
      lastAwardDate:
        typeof parsed.lastAwardDate === "string" ? parsed.lastAwardDate : null,
      daysPlayed: Math.max(0, Number(parsed.daysPlayed) || 0),
      unlockedAt: typeof parsed.unlockedAt === "string" ? parsed.unlockedAt : null,
    };
  } catch {
    return emptyProgress;
  }
}

export function saveRewardsProgress(progress: RewardsProgress) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function hasAwardForToday(progress: RewardsProgress): boolean {
  return progress.lastAwardDate === moscowDateKey();
}

export function applyDailyWin(progress: RewardsProgress): RewardsProgress {
  const today = moscowDateKey();
  if (progress.lastAwardDate === today) return progress;

  const bonuses = Math.min(
    rewardsConfig.rewardThreshold,
    progress.bonuses + rewardsConfig.dailyBonus,
  );
  const unlockedAt =
    bonuses >= rewardsConfig.rewardThreshold
      ? (progress.unlockedAt ?? today)
      : progress.unlockedAt;

  return {
    bonuses,
    lastAwardDate: today,
    daysPlayed: progress.daysPlayed + 1,
    unlockedAt,
  };
}
