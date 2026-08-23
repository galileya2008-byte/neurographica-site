import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllMasterclasses, getAllPrograms } from "@/lib/content/products";

const staticRoutes = [
  "",
  "/about",
  "/masterclasses",
  "/programs",
  "/reviews",
  "/faq",
  "/contacts",
  "/privacy",
  "/offer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const masterclasses = getAllMasterclasses().map((product) => ({
    url: `${siteConfig.url}/masterclasses/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const programs = getAllPrograms().map((product) => ({
    url: `${siteConfig.url}/programs/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...masterclasses, ...programs];
}
