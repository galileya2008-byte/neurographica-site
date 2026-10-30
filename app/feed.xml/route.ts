import fs from "node:fs";
import path from "node:path";
import { siteConfig } from "@/config/site";
import { getAllMaterials } from "@/lib/content/materials";
import {
  absoluteMediaUrl,
  audioMimeType,
  isDirectAudioUrl,
} from "@/lib/media";
import { materialTypeLabels } from "@/types/material";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

function toRfc822Date(value: string): string {
  return new Date(`${value}T12:00:00Z`).toUTCString();
}

function coverEnclosure(coverUrl: string): string {
  const url = new URL(coverUrl);
  if (url.origin !== new URL(siteConfig.url).origin) return "";
  const publicDir = path.resolve(process.cwd(), "public");
  const filePath = path.resolve(publicDir, `.${decodeURIComponent(url.pathname)}`);
  if (!filePath.startsWith(`${publicDir}${path.sep}`)) return "";
  const mimeTypes: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
  };
  const type = mimeTypes[path.extname(filePath).toLowerCase()];
  if (!type || !fs.existsSync(filePath)) return "";
  return `\n      <enclosure url="${escapeXml(coverUrl)}" length="${fs.statSync(filePath).size}" type="${type}" />`;
}

export async function GET() {
  const publications = getAllMaterials();
  const feedUrl = absoluteUrl("/feed.xml");
  const latestDate = publications[0]?.publishedAt ?? "2026-01-01";

  const items = publications
    .map((material) => {
      const url = absoluteUrl(`/materials/${material.slug}/`);
      // Match the article's Open Graph fallback when no custom cover is set.
      const coverUrl = absoluteMediaUrl(
        siteConfig.url,
        material.cover || "/images/galina/at-work.png",
      );
      const listenUrl =
        material.type === "podcast" && material.mediaUrl
          ? isDirectAudioUrl(material.mediaUrl)
            ? absoluteMediaUrl(siteConfig.url, material.mediaUrl)
            : material.mediaUrl
          : "";
      const platformLink = listenUrl ? ` Слушать выпуск: ${listenUrl}` : "";

      // RSS descriptions accept entity-encoded HTML. Keep full articles on the
      // website, and include an explicit link for readers that show only text.
      const description =
        `<p><img src="${escapeXml(coverUrl)}" alt="${escapeXml(material.title)}" /></p>` +
        `<p>${escapeXml(`${material.excerpt}${platformLink}`)}</p>` +
        `<p><a href="${escapeXml(url)}">Читать далее на сайте →</a></p>`;

      const enclosure =
        material.type === "podcast" &&
        material.mediaUrl &&
        isDirectAudioUrl(material.mediaUrl)
          ? `
      <enclosure url="${escapeXml(absoluteMediaUrl(siteConfig.url, material.mediaUrl))}" type="${audioMimeType(material.mediaUrl)}" />`
          : coverEnclosure(coverUrl);

      return `
    <item>
      <title>${escapeXml(material.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${toRfc822Date(material.publishedAt)}</pubDate>
      <category>${escapeXml(materialTypeLabels[material.type])}</category>
      <description>${escapeXml(description)}</description>
      <media:content url="${escapeXml(coverUrl)}" medium="image" />
      <media:thumbnail url="${escapeXml(coverUrl)}" />${enclosure}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(`${siteConfig.brand} — статьи, подкасты и новости`)}</title>
    <link>${escapeXml(siteConfig.url)}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>ru-RU</language>
    <lastBuildDate>${toRfc822Date(latestDate)}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
