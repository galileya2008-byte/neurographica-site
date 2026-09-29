import { siteConfig } from "@/config/site";
import rewardsJson from "@/content/rewards.json";

export const rewardsConfig = {
  dailyBonus: rewardsJson.dailyBonus,
  rewardThreshold: rewardsJson.rewardThreshold,
  discountPercent: rewardsJson.discountPercent,
  promoCode: rewardsJson.promoCode.trim(),
  telegramClaimText: rewardsJson.telegramClaimText,
  path: "/podarki",
} as const;

export function moscowDateKey(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Moscow",
  }).format(date);
}

export function telegramClaimUrl(): string {
  const handle = siteConfig.social.telegramHandle.replace(/^@/, "");
  const text = encodeURIComponent(rewardsConfig.telegramClaimText);
  return `https://t.me/${handle}?text=${text}`;
}
