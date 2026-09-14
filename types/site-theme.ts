export const siteThemePresetIds = ["autumn", "classic", "blue"] as const;

export type SiteThemePresetId = (typeof siteThemePresetIds)[number];

export type SiteThemeConfig = {
  presetId: SiteThemePresetId;
};

export type SiteThemeColors = {
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  accentForeground: string;
  accentLight: string;
  border: string;
  card: string;
  warm: string;
  gold: string;
  chocolate: string;
};

export type SiteThemePreset = {
  id: SiteThemePresetId;
  label: string;
  description: string;
  colors: SiteThemeColors;
  bodyBackground: string;
  heroGradient: string;
  sectionWarm: string;
  sectionAccent: string;
  seasonalDecor: boolean;
};

export type ResolvedSiteTheme = SiteThemePreset;
