import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { YandexMetrika } from "@/components/analytics/yandex-metrika";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { defaultKeywords } from "@/config/seo";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { getSiteTheme } from "@/lib/content/site-theme";
import { SiteThemeStyle } from "@/components/theme/site-theme-style";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["cyrillic", "latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: siteConfig.title,
    description: siteConfig.description,
    path: "/",
    keywords: [...defaultKeywords],
  }),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  verification: {
    yandex: "acc732c6b2dd5433",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = getSiteTheme();

  return (
    <html
      lang="ru"
      data-seasonal-decor={theme.seasonalDecor ? "on" : "off"}
      className={`${playfair.variable} ${manrope.variable}`}
    >
      <head>
        <SiteThemeStyle theme={theme} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${siteConfig.brand} — новые публикации`}
          href={`${siteConfig.url}/feed.xml`}
        />
        <link rel="preload" as="image" href="/images/galina/portrait-premium.png" />
      </head>
      <body className="relative min-h-screen font-body antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Header />
        <main className="relative z-[1]">{children}</main>
        <div className="relative z-[1]">
          <Footer />
        </div>
        <CookieBanner />
        <YandexMetrika />
      </body>
    </html>
  );
}
