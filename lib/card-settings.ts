import type { CardColorId, CardSettings } from "@/types/card-settings";

export const cardColorClasses: Record<CardColorId, string> = {
  default: "bg-card/80",
  warm: "bg-[#f5e8d8]",
  sky: "bg-[#e5f2fb]",
  sage: "bg-[#e5eee6]",
  rose: "bg-[#f6e7e7]",
  sand: "bg-[#efe3cf]",
};

export function getCardColorClass(cardColor?: CardColorId): string {
  return cardColorClasses[cardColor ?? "default"];
}

export function compareCardOrder<T extends CardSettings>(
  a: T,
  b: T,
): number {
  const orderDifference = (a.sortOrder ?? 1000) - (b.sortOrder ?? 1000);
  return orderDifference;
}
