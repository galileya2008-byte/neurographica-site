import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllMaterials } from "@/lib/content/materials";
import { getAllMasterclasses, getAllPrograms } from "@/lib/content/products";
import { getAllTopics } from "@/lib/content/topics";

export const dynamic = "force-static";

const staticRoutes = [
  "",
  "/about",
  "/masterclasses",
  "/programs",
  "/materials",
  "/reviews",
  "/faq",
  "/contacts",
  "/privacy",
  "/offer",
];

function toSitemapUrl(path: string): string {
  if (!path || path === "/") {
    return `${siteConfig.url}/`;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;
  return `${siteConfig.url}${withSlash}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: toSitemapUrl(route),
    lastModified: now,
    changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const masterclasses = getAllMasterclasses().map((product) => ({
    url: toSitemapUrl(`/masterclasses/${product.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const programs = getAllPrograms().map((product) => ({
    url: toSitemapUrl(`/programs/${product.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const materials = getAllMaterials().map((material) => ({
    url: toSitemapUrl(`/materials/${material.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const topics = getAllTopics().map((topic) => ({
    url: toSitemapUrl(`/topics/${topic.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticEntries, ...topics, ...masterclasses, ...programs, ...materials];
}
