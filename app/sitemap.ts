import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

import { AI_EXPERT_SLUG } from "@/lib/constants/ai-expert-system";
import { aiSalesTopic } from "@/lib/content/ai-sales-topic";

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

  "/topics",

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



function parsePublishedAt(value: string | undefined, fallback: Date): Date {

  if (!value) return fallback;

  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime()) ? fallback : parsed;

}



export default function sitemap(): MetadataRoute.Sitemap {

  const now = new Date();



  const staticEntries = staticRoutes.map((route) => ({

    url: toSitemapUrl(route),

    lastModified: now,

    changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",

    priority: route === "" ? 1 : route === "/programs" ? 0.85 : 0.7,

  }));



  const masterclasses = getAllMasterclasses().map((product) => ({

    url: toSitemapUrl(`/masterclasses/${product.slug}`),

    lastModified: parsePublishedAt(product.publishedAt, now),

    changeFrequency: "monthly" as const,

    priority: 0.8,

  }));



  const programs = getAllPrograms().map((product) => ({

    url: toSitemapUrl(`/programs/${product.slug}`),

    lastModified: parsePublishedAt(product.publishedAt, now),

    changeFrequency: "monthly" as const,

    priority: product.slug === AI_EXPERT_SLUG ? 0.95 : 0.8,

  }));



  const materials = getAllMaterials().map((material) => ({

    url: toSitemapUrl(`/materials/${material.slug}`),

    lastModified: parsePublishedAt(material.publishedAt, now),

    changeFrequency: "monthly" as const,

    priority: 0.7,

  }));



  const topics = getAllTopics().map((topic) => ({

    url: toSitemapUrl(`/topics/${topic.slug}`),

    lastModified:
      topic.slug === aiSalesTopic.slug
        ? new Date(aiSalesTopic.updatedAt)
        : now,

    changeFrequency:
      topic.slug === aiSalesTopic.slug
        ? ("weekly" as const)
        : ("monthly" as const),

    priority: topic.slug === aiSalesTopic.slug ? 0.9 : 0.85,

  }));



  return [...staticEntries, ...topics, ...masterclasses, ...programs, ...materials];

}

