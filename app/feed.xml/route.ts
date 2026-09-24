import { siteConfig } from "@/config/site";
import { getAllMaterials } from "@/lib/content/materials";
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

export async function GET() {
  const publications = getAllMaterials();
  const feedUrl = absoluteUrl("/feed.xml");
  const latestDate = publications[0]?.publishedAt ?? "2026-01-01";

  const items = publications
    .map((material) => {
      const url = absoluteUrl(`/materials/${material.slug}/`);
      const platformLink =
        material.type === "podcast" && material.mediaUrl
          ? ` Слушать выпуск: ${material.mediaUrl}`
          : "";

      return `
    <item>
      <title>${escapeXml(material.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${toRfc822Date(material.publishedAt)}</pubDate>
      <category>${escapeXml(materialTypeLabels[material.type])}</category>
      <description>${escapeXml(`${material.excerpt}${platformLink}`)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
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
