import type { Product } from "@/types/product";
import { siteConfig } from "@/config/site";

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.seo?.description ?? product.shortDescription,
    image: `${siteConfig.url}${product.cover}`,
    brand: {
      "@type": "Brand",
      name: siteConfig.brand,
    },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}${
        product.type === "masterclass"
          ? `/masterclasses/${product.slug}`
          : `/programs/${product.slug}`
      }`,
      priceCurrency: product.currency,
      price: product.price,
      availability: "https://schema.org/InStock",
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  if (!items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
