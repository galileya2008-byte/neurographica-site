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
  "/play",
  "/contacts",
  "/privacy",
  "/offer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route || "/"}`,
    lastModified: now,
    changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const masterclasses = getAllMasterclasses().map((product) => ({
    url: `${siteConfig.url}/masterclasses/${product.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const programs = getAllPrograms().map((product) => ({
    url: `${siteConfig.url}/programs/${product.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const materials = getAllMaterials().map((material) => ({
    url: `${siteConfig.url}/materials/${material.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const topics = getAllTopics().map((topic) => ({
    url: `${siteConfig.url}/topics/${topic.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticEntries, ...topics, ...masterclasses, ...programs, ...materials];
}
