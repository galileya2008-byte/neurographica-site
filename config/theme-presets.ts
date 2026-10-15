import type { SiteThemePreset, SiteThemePresetId } from "@/types/site-theme";

export const themePresets: Record<SiteThemePresetId, SiteThemePreset> = {
  autumn: {
    id: "autumn",
    label: "Осенняя",
    description: "Тёплые янтарные и терракотовые оттенки с лёгким декором листьев.",
    colors: {
      background: "#f7f2ea",
      foreground: "#171411",
      muted: "#6a6258",
      accent: "#1f3a32",
      accentForeground: "#f7f4ef",
      accentLight: "#ede4d4",
      border: "#e5dbd0",
      card: "#fcfaf6",
      warm: "#e9dfd0",
      gold: "#9a7b55",
      chocolate: "#5c4033",
    },
    bodyBackground:
      "radial-gradient(ellipse 80% 50% at 100% -10%, rgb(237 220 198 / 0.62), transparent 50%), radial-gradient(ellipse 60% 40% at 0% 100%, rgb(210 180 140 / 0.32), transparent 45%)",
    heroGradient:
      "radial-gradient(ellipse 70% 55% at 88% -8%, rgb(237 220 198 / 0.88) 0%, transparent 58%), radial-gradient(ellipse 55% 45% at 0% 100%, rgb(180 130 90 / 0.14) 0%, transparent 48%), linear-gradient(180deg, rgb(247 242 234) 0%, transparent 70%)",
    sectionWarm:
      "radial-gradient(ellipse at top left, rgb(252 246 238 / 0.82), transparent 55%), linear-gradient(180deg, rgb(233 223 208 / 0.95), rgb(233 223 208 / 0.72))",
    sectionAccent:
      "radial-gradient(ellipse at bottom right, rgb(180 130 90 / 0.1), transparent 50%), linear-gradient(180deg, rgb(237 228 214 / 0.58), rgb(232 222 206 / 0.3))",
    seasonalDecor: true,
  },
  classic: {
    id: "classic",
    label: "Классическая",
    description: "Спокойная палитра бренда: тёплый фон и глубокий зелёный акцент.",
    colors: {
      background: "#f6f3ee",
      foreground: "#171411",
      muted: "#6a6258",
      accent: "#1f3a32",
      accentForeground: "#f7f4ef",
      accentLight: "#e4eee8",
      border: "#e2dbd0",
      card: "#fcfaf6",
      warm: "#ebe4d8",
      gold: "#9a7b55",
      chocolate: "#5c4033",
    },
    bodyBackground:
      "radial-gradient(ellipse 80% 50% at 100% -10%, rgb(228 238 232 / 0.7), transparent 50%), radial-gradient(ellipse 60% 40% at 0% 100%, rgb(235 228 216 / 0.55), transparent 45%)",
    heroGradient:
      "radial-gradient(ellipse 70% 55% at 88% -8%, rgb(228 238 232 / 0.95) 0%, transparent 58%), radial-gradient(ellipse 55% 45% at 0% 100%, rgb(154 123 85 / 0.12) 0%, transparent 48%), linear-gradient(180deg, rgb(246 243 238) 0%, transparent 70%)",
    sectionWarm:
      "radial-gradient(ellipse at top left, rgb(252 250 246 / 0.7), transparent 55%), linear-gradient(180deg, rgb(235 228 216 / 0.92), rgb(235 228 216 / 0.7))",
    sectionAccent:
      "radial-gradient(ellipse at bottom right, rgb(154 123 85 / 0.08), transparent 50%), linear-gradient(180deg, rgb(228 238 232 / 0.55), rgb(228 238 232 / 0.28))",
    seasonalDecor: false,
  },
  blue: {
    id: "blue",
    label: "Жемчужная",
    description:
      "Премиальная палитра 2026: жемчужный фон, глубокий чернильно-зелёный акцент и шампань.",
    colors: {
      background: "#f3f5f7",
      foreground: "#101820",
      muted: "#5a6570",
      accent: "#163a36",
      accentForeground: "#f4f8f6",
      accentLight: "#e4eeeb",
      border: "#d7e0e4",
      card: "#fbfcfd",
      warm: "#e8eef1",
      gold: "#a6895f",
      chocolate: "#3a4650",
    },
    bodyBackground:
      "radial-gradient(ellipse 90% 55% at 100% -12%, rgb(196 220 214 / 0.45), transparent 52%), radial-gradient(ellipse 70% 45% at -5% 105%, rgb(180 198 210 / 0.28), transparent 48%), radial-gradient(ellipse 40% 30% at 70% 60%, rgb(214 196 160 / 0.12), transparent 55%)",
    heroGradient:
      "radial-gradient(ellipse 65% 50% at 92% -6%, rgb(210 230 224 / 0.85) 0%, transparent 56%), radial-gradient(ellipse 50% 40% at 8% 100%, rgb(166 137 95 / 0.12) 0%, transparent 50%), radial-gradient(ellipse 35% 28% at 55% 18%, rgb(190 210 220 / 0.35) 0%, transparent 60%), linear-gradient(180deg, rgb(243 245 247) 0%, transparent 72%)",
    sectionWarm:
      "radial-gradient(ellipse at top left, rgb(250 252 253 / 0.9), transparent 55%), linear-gradient(180deg, rgb(232 238 241 / 0.95), rgb(232 238 241 / 0.7))",
    sectionAccent:
      "radial-gradient(ellipse at bottom right, rgb(22 58 54 / 0.06), transparent 52%), linear-gradient(180deg, rgb(228 238 235 / 0.65), rgb(220 232 236 / 0.28))",
    seasonalDecor: false,
  },
};

export const themePresetList = Object.values(themePresets);
