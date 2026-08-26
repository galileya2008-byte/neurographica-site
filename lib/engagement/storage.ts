import { engagementConfig } from "@/config/engagement";
import type { IntentionId } from "@/config/engagement";

const GAME_KEY = "ng_intention_game_v1";
const BOOKMARK_KEY = "ng_bookmark_hint_dismissed";
const LAUNCHER_KEY = "ng_engagement_launcher_seen";
const PROMO_COOKIE = "ng_promo_claimed_v1";
const PROMO_COOKIE_MAX_AGE = 60 * 60 * 24 * 730; // 2 года

export type GameCompletion = {
  completed: true;
  completedAt: string;
  intentionId: IntentionId;
  anchorWord: string;
  promoCode: string;
};

function readPromoCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((part) => part === `${PROMO_COOKIE}=1`);
}

function writePromoCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${PROMO_COOKIE}=1; max-age=${PROMO_COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

export function getGameCompletion(): GameCompletion | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(GAME_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameCompletion;
    return parsed.completed ? parsed : null;
  } catch {
    return null;
  }
}

/** Промокод уже был получен на этом устройстве */
export function isPromoAlreadyClaimed(): boolean {
  return Boolean(getGameCompletion()) || readPromoCookie();
}

/** Блокировка есть, но данные о прохождении потеряны (очистка браузера) */
export function isPromoLockedWithoutData(): boolean {
  return !getGameCompletion() && readPromoCookie();
}

export function saveGameCompletion(
  data: Omit<GameCompletion, "completed" | "promoCode">,
): boolean {
  if (typeof window === "undefined") return false;
  if (isPromoAlreadyClaimed()) return false;

  const payload: GameCompletion = {
    completed: true,
    promoCode: engagementConfig.course.promoCode,
    ...data,
  };

  window.localStorage.setItem(GAME_KEY, JSON.stringify(payload));
  writePromoCookie();
  return true;
}

export function isBookmarkHintDismissed(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(BOOKMARK_KEY) === "1";
}

export function dismissBookmarkHint() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BOOKMARK_KEY, "1");
}

export function hasSeenLauncher(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(LAUNCHER_KEY) === "1";
}

export function markLauncherSeen() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LAUNCHER_KEY, "1");
}
