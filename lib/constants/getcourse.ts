import type { Product } from "@/types/product";

export function getPurchaseUrl(product: Product): string {
  try {
    const url = new URL(product.getcourseUrl);
    url.searchParams.set("utm_source", "site");
    url.searchParams.set("utm_medium", "product");
    url.searchParams.set("utm_campaign", product.slug);
    return url.toString();
  } catch {
    return product.getcourseUrl;
  }
}
