import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
  absoluteTitle?: boolean;
};

export function buildPageMetadata({
  title,
  description = siteConfig.description,
  path = "",
  image = "/images/galina/portrait-premium.png",
  noIndex = false,
  keywords,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle =
    absoluteTitle || path === "" || path === "/"
      ? title
      : `${title} | ${siteConfig.brand}`;
  const imageUrl = image.startsWith("http")
    ? image
    : `${siteConfig.url}${image.startsWith("/") ? image : `/${image}`}`;

  return {
    title: fullTitle,
    description,
    ...(keywords?.length ? { keywords } : {}),
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.brand,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.expert} — ${siteConfig.brand}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
