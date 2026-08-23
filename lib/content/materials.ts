import "server-only";

import fs from "fs";
import path from "path";
import { materialSchema } from "@/lib/content/schemas";
import type { Material, MaterialType } from "@/types/material";

const materialsDir = path.join(process.cwd(), "content", "materials");

export function getAllMaterials(): Material[] {
  if (!fs.existsSync(materialsDir)) return [];

  return fs
    .readdirSync(materialsDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(materialsDir, file), "utf-8");
      return materialSchema.parse(JSON.parse(raw)) as Material;
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getMaterialBySlug(slug: string): Material | undefined {
  return getAllMaterials().find((item) => item.slug === slug);
}

export function getMaterialsByType(type: MaterialType): Material[] {
  return getAllMaterials().filter((item) => item.type === type);
}

export function getFeaturedMaterials(limit = 3): Material[] {
  return getAllMaterials().slice(0, limit);
}
