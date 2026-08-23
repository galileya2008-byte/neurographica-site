import "server-only";

import fs from "fs";
import path from "path";
import { productSchema } from "@/lib/content/schemas";
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
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
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

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return getProductsByType(product.type)
    .filter((item) => item.id !== product.id)
    .filter((item) =>
      item.directions.some((direction) => product.directions.includes(direction)),
    )
    .slice(0, limit);
}
