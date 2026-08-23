import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageView } from "@/components/product/product-page-view";
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

  return buildPageMetadata({
    title: product.seo?.title ?? product.title,
    description: product.seo?.description ?? product.shortDescription,
    path: `/masterclasses/${product.slug}`,
    image: product.cover,
  });
}

export default async function MasterclassPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug("masterclass", slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return <ProductPageView product={product} related={related} />;
}
