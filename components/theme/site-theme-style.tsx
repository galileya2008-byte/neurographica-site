import { buildThemeCss } from "@/lib/theme/build-theme-css";
import type { ResolvedSiteTheme } from "@/types/site-theme";

type SiteThemeStyleProps = {
  theme: ResolvedSiteTheme;
};

export function SiteThemeStyle({ theme }: SiteThemeStyleProps) {
  return <style dangerouslySetInnerHTML={{ __html: buildThemeCss(theme) }} />;
}
