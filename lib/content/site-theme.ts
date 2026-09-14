import "server-only";

import fs from "fs";
import path from "path";
import { themePresets } from "@/config/theme-presets";
import { siteThemeSchema } from "@/lib/content/schemas";
import type { ResolvedSiteTheme, SiteThemePresetId } from "@/types/site-theme";

const themePath = path.join(process.cwd(), "content", "site-theme.json");

export function getSiteTheme(): ResolvedSiteTheme {
  let presetId: SiteThemePresetId = "autumn";

  if (fs.existsSync(themePath)) {
    try {
      const raw = fs.readFileSync(themePath, "utf-8");
      const parsed = siteThemeSchema.parse(JSON.parse(raw));
      presetId = parsed.presetId;
    } catch {
      presetId = "autumn";
    }
  }

  return themePresets[presetId] ?? themePresets.autumn;
}
