import type { Product } from "@/types/product";
import {
  COURSE_PAYMENT_URL,
  NEUROCOMPOSITION_SLUG,
} from "@/lib/constants/neurocomposition";

function withCampaignParams(rawUrl: string, slug: string): string {
  try {
    const url = new URL(rawUrl);
    url.searchParams.set("utm_source", "site");
    url.searchParams.set("utm_medium", "product");
    url.searchParams.set("utm_campaign", slug);
    return url.toString();
  } catch {
    return rawUrl;
  }
}

export function getPurchaseUrl(product: Product): string {
  if (product.slug === NEUROCOMPOSITION_SLUG) {
    if (!COURSE_PAYMENT_URL) return "#pricing";
    return withCampaignParams(COURSE_PAYMENT_URL, product.slug);
  }

  return withCampaignParams(product.getcourseUrl, product.slug);
}
