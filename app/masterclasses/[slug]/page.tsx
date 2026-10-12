import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MoneyConstellationPage } from "@/components/money-constellation/money-constellation-page";
import { ProductPageView } from "@/components/product/product-page-view";
import { MONEY_CONSTELLATION_SLUG } from "@/lib/constants/money-constellation";
import {
  getAllMasterclasses,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/content/products";
import { buildPageMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllMasterclasses().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug("masterclass", slug);
  if (!product) return {};

  const isMoneyConstellation = product.slug === MONEY_CONSTELLATION_SLUG;

  return buildPageMetadata({
    title: product.seo?.title ?? product.title,
    description: product.seo?.description ?? product.shortDescription,
    path: `/masterclasses/${product.slug}`,
    image: product.cover,
    absoluteTitle: isMoneyConstellation,
    keywords: isMoneyConstellation
      ? [
          "денежное созвездие нейрографика",
          "нейрографика на деньги",
          "нейрографика на финансовые цели",
          "практика для работы с денежными целями",
          "нейрографический рисунок на деньги",
          "моё денежное созвездие",
        ]
      : undefined,
  });
}

export default async function MasterclassPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug("masterclass", slug);
  if (!product) notFound();

  if (product.slug === MONEY_CONSTELLATION_SLUG) {
    return <MoneyConstellationPage product={product} />;
  }

  const related = getRelatedProducts(product);
  return <ProductPageView product={product} related={related} />;
}
