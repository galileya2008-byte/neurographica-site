import type { Product } from "@/types/product";
import { geoKnowsAbout } from "@/config/geo";
import { siteConfig } from "@/config/site";

function productUrl(product: Product) {
  return `${siteConfig.url}${
    product.type === "masterclass"
      ? `/masterclasses/${product.slug}/`
      : `/programs/${product.slug}/`
  }`;
}

export function productSchema(product: Product) {
  const url = productUrl(product);
  const description = product.seo?.description ?? product.shortDescription;
  const isProgram = product.type === "program";

  return {
    "@context": "https://schema.org",
    "@type": isProgram ? ["Product", "Course"] : ["Product", "Course"],
    "@id": `${url}#product`,
    name: product.title,
    description,
    image: `${siteConfig.url}${product.cover}`,
    url,
    inLanguage: "ru-RU",
    brand: {
      "@type": "Brand",
      name: siteConfig.brand,
    },
    provider: {
      "@type": "Person",
      name: siteConfig.expert,
      url: `${siteConfig.url}/about/`,
    },
    instructor: {
      "@type": "Person",
      name: siteConfig.expert,
    },
    about: [...geoKnowsAbout.slice(0, 6)],
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: product.currency,
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.brand,
        url: siteConfig.url,
      },
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
      item: `${siteConfig.url}${item.path.endsWith("/") || item.path === "/" ? item.path : `${item.path}/`}`,
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
