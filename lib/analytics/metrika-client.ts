import { yandexMetrika, type MetrikaGoalId } from "@/config/analytics";

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

export function reachMetrikaGoal(
  goal: MetrikaGoalId,
  params?: Record<string, string>,
) {
  if (typeof window === "undefined" || typeof window.ym !== "function") {
    return;
  }

  if (params && Object.keys(params).length > 0) {
    window.ym(yandexMetrika.counterId, "reachGoal", goal, params);
    return;
  }

  window.ym(yandexMetrika.counterId, "reachGoal", goal);
}

export function resolveMetrikaGoalFromHref(href: string): MetrikaGoalId | undefined {
  const lower = href.toLowerCase();

  if (lower.startsWith("mailto:")) {
    return yandexMetrika.goals.email;
  }

  if (lower.includes("t.me/") || lower.includes("telegram.")) {
    return yandexMetrika.goals.telegram;
  }

  if (
    lower.includes("getcourse") ||
    lower.includes("get-course") ||
    lower.includes("neirogalina.ru")
  ) {
    return yandexMetrika.goals.purchase;
  }

  return undefined;
}
