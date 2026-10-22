import { siteConfig } from "@/config/site";
import type { Product } from "@/types/product";
import {
  AI_EXPERT_PAYMENT_FALLBACK_URL,
  AI_EXPERT_SLUG,
} from "@/lib/constants/ai-expert-system";
import {
  COURSE_PAYMENT_URL,
  NEUROCOMPOSITION_SLUG,
} from "@/lib/constants/neurocomposition";

/** Общие URL платформы без страницы конкретного продукта */
const PLACEHOLDER_PURCHASE_HOSTS = new Set([
  "getcourse.ru",
  "www.getcourse.ru",
]);

export type PurchaseAction = {
  href: string;
  /** true — переход к оформлению конкретного продукта */
  isCheckout: boolean;
};

function withCampaignParams(rawUrl: string, slug: string): string {
  try {
    const url = new URL(rawUrl);
    if (!url.searchParams.has("utm_source")) {
      url.searchParams.set("utm_source", "site");
    }
    if (!url.searchParams.has("utm_medium")) {
      url.searchParams.set("utm_medium", "product");
    }
    if (!url.searchParams.has("utm_campaign")) {
      url.searchParams.set("utm_campaign", slug);
    }
    return url.toString();
  } catch {
    return rawUrl;
  }
}

function isPlaceholderPurchaseUrl(rawUrl: string): boolean {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.replace(/^www\./, "");
    if (!PLACEHOLDER_PURCHASE_HOSTS.has(host)) return false;
    // Только корень / или пустой путь без id страницы
    const path = url.pathname.replace(/\/+$/, "") || "/";
    return path === "/" || path === "";
  } catch {
    return true;
  }
}

export function hasConfiguredPurchaseUrl(product: Product): boolean {
  if (product.slug === AI_EXPERT_SLUG) {
    return true;
  }
  if (product.slug === NEUROCOMPOSITION_SLUG) {
    return Boolean(COURSE_PAYMENT_URL);
  }
  if (!product.getcourseUrl?.trim()) return false;
  return !isPlaceholderPurchaseUrl(product.getcourseUrl);
}

export function getPurchaseAction(product: Product): PurchaseAction {
  if (product.slug === AI_EXPERT_SLUG) {
    return {
      href: withCampaignParams(AI_EXPERT_PAYMENT_FALLBACK_URL, product.slug),
      isCheckout: true,
    };
  }

  if (product.slug === NEUROCOMPOSITION_SLUG) {
    if (!COURSE_PAYMENT_URL) {
      return { href: siteConfig.social.telegram, isCheckout: false };
    }
    return {
      href: withCampaignParams(COURSE_PAYMENT_URL, product.slug),
      isCheckout: true,
    };
  }

  if (hasConfiguredPurchaseUrl(product)) {
    return {
      href: withCampaignParams(product.getcourseUrl, product.slug),
      isCheckout: true,
    };
  }

  return { href: siteConfig.social.telegram, isCheckout: false };
}

export function getPurchaseUrl(product: Product): string {
  return getPurchaseAction(product).href;
}

/** Продукты без подтверждённой ссылки на форму заказа */
export function listProductsNeedingPurchaseUrl(products: Product[]): Product[] {
  return products.filter((product) => !hasConfiguredPurchaseUrl(product));
}
