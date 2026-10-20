import "server-only";

import fs from "fs";
import path from "path";
import { productSchema } from "@/lib/content/schemas";
import { compareCardOrder } from "@/lib/card-settings";
import type { Product, ProductType } from "@/types/product";

const contentRoot = path.join(process.cwd(), "content");

function readProductsFromDir(dirName: "masterclasses" | "programs"): Product[] {
  const dir = path.join(contentRoot, dirName);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const parsed = productSchema.parse(JSON.parse(raw));
      return parsed as Product;
    })
    .sort(
      (a, b) =>
        compareCardOrder(a, b) ||
        b.publishedAt.localeCompare(a.publishedAt),
    );
}

export function getAllMasterclasses(): Product[] {
  return readProductsFromDir("masterclasses");
}

export function getAllPrograms(): Product[] {
  return readProductsFromDir("programs");
}

export function getAllProducts(): Product[] {
  return [...getAllMasterclasses(), ...getAllPrograms()];
}

export function getProductsByType(type: ProductType): Product[] {
  return type === "masterclass" ? getAllMasterclasses() : getAllPrograms();
}

export function getProductBySlug(
  type: ProductType,
  slug: string,
): Product | undefined {
  return getProductsByType(type).find((product) => product.slug === slug);
}

export function getPopularMasterclasses(limit = 3): Product[] {
  return getAllMasterclasses()
    .filter((product) => product.isPopular)
    .slice(0, limit);
}

export function getFeaturedPrograms(limit = 2): Product[] {
  return getAllPrograms()
    .filter((product) => product.isFeatured || product.isPopular)
    .slice(0, limit);
}

/** Пары продуктов с одной задачей — показываем рядом для сравнения */
const RELATED_PAIRS: Record<string, string[]> = {
  planning: ["neyroplanirovanie"],
  neyroplanirovanie: ["planning"],
  intention: ["intention-to-action"],
  "intention-to-action": ["intention"],
};

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const pool = getAllProducts().filter((item) => item.id !== product.id);
  const preferredSlugs = RELATED_PAIRS[product.slug] ?? [];
  const preferred = preferredSlugs
    .map((slug) => pool.find((item) => item.slug === slug))
    .filter((item): item is Product => Boolean(item));

  const byDirection = pool
    .filter((item) => !preferred.some((p) => p.id === item.id))
    .filter((item) =>
      item.directions.some((direction) => product.directions.includes(direction)),
    )
    .sort((a, b) => {
      const sameType = Number(b.type === product.type) - Number(a.type === product.type);
      if (sameType !== 0) return sameType;
      return Number(b.isPopular) - Number(a.isPopular);
    });

  return [...preferred, ...byDirection].slice(0, limit);
}
