import type { ResolvedSiteTheme } from "@/types/site-theme";

export function buildThemeCss(theme: ResolvedSiteTheme): string {
  const c = theme.colors;

  return `
:root {
  --color-background: ${c.background};
  --color-foreground: ${c.foreground};
  --color-muted: ${c.muted};
  --color-muted-foreground: ${c.muted};
  --color-accent: ${c.accent};
  --color-accent-foreground: ${c.accentForeground};
  --color-accent-light: ${c.accentLight};
  --color-border: ${c.border};
  --color-card: ${c.card};
  --color-warm: ${c.warm};
  --color-gold: ${c.gold};
  --color-chocolate: ${c.chocolate};
}

body {
  background-color: ${c.background};
  background-image: ${theme.bodyBackground};
}

.site-hero-gradient {
  background: ${theme.heroGradient};
}

.tone-section-warm {
  background: ${theme.sectionWarm};
}

.tone-section-accent {
  background: ${theme.sectionAccent};
}

html[data-seasonal-decor="off"] .theme-seasonal-decor {
  display: none !important;
}
`.trim();
}
