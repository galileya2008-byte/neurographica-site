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
    label: "Голубая",
    description: "Светлые синие и голубые тона — свежий, современный вид.",
    colors: {
      background: "#f3f8fc",
      foreground: "#141c24",
      muted: "#5a6775",
      accent: "#1e4a6f",
      accentForeground: "#f5faff",
      accentLight: "#dceaf8",
      border: "#d0e1ef",
      card: "#fafcfe",
      warm: "#e3eef8",
      gold: "#4a8bb8",
      chocolate: "#3d5568",
    },
    bodyBackground:
      "radial-gradient(ellipse 80% 50% at 100% -10%, rgb(186 220 245 / 0.65), transparent 50%), radial-gradient(ellipse 60% 40% at 0% 100%, rgb(140 190 230 / 0.28), transparent 45%)",
    heroGradient:
      "radial-gradient(ellipse 70% 55% at 88% -8%, rgb(200 230 250 / 0.9) 0%, transparent 58%), radial-gradient(ellipse 55% 45% at 0% 100%, rgb(100 160 210 / 0.16) 0%, transparent 48%), linear-gradient(180deg, rgb(243 248 252) 0%, transparent 70%)",
    sectionWarm:
      "radial-gradient(ellipse at top left, rgb(240 248 255 / 0.85), transparent 55%), linear-gradient(180deg, rgb(220 235 248 / 0.95), rgb(220 235 248 / 0.72))",
    sectionAccent:
      "radial-gradient(ellipse at bottom right, rgb(120 170 220 / 0.12), transparent 50%), linear-gradient(180deg, rgb(210 230 248 / 0.58), rgb(205 225 245 / 0.3))",
    seasonalDecor: false,
  },
};

export const themePresetList = Object.values(themePresets);
