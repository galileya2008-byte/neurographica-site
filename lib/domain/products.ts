import { directions } from "@/config/site";
import type {
  CatalogFilters,
  DirectionId,
  Product,
} from "@/types/product";

export function getDirectionLabel(id: DirectionId): string {
  return directions.find((item) => item.id === id)?.label ?? id;
}

export function filterProducts(
  products: Product[],
  filters: CatalogFilters = {},
): Product[] {
  const {
    q = "",
    direction = "all",
    level = "all",
    format = "all",
    popularOnly = false,
    sort = "popular",
  } = filters;

  const query = q.trim().toLowerCase();

  let result = products.filter((product) => {
    if (popularOnly && !product.isPopular) return false;
    if (direction !== "all" && !product.directions.includes(direction)) return false;
    if (level !== "all" && product.level !== level) return false;
    if (format !== "all" && product.format !== format) return false;

    if (!query) return true;

    const haystack = [
      product.title,
      product.shortDescription,
      product.description,
      ...product.directions.map(getDirectionLabel),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });

  result = [...result].sort((a, b) => {
    switch (sort) {
      case "newest":
        return b.publishedAt.localeCompare(a.publishedAt);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "popular":
      default: {
        const score = (item: Product) =>
          Number(item.isFeatured) * 2 + Number(item.isPopular);
        return score(b) - score(a) || b.publishedAt.localeCompare(a.publishedAt);
      }
    }
  });

  return result;
}

export function getProductHref(product: Product): string {
  return product.type === "masterclass"
    ? `/masterclasses/${product.slug}`
    : `/programs/${product.slug}`;
}

export function getCatalogHref(type: Product["type"]): string {
  return type === "masterclass" ? "/masterclasses" : "/programs";
}
