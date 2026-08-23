import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MaterialPageView } from "@/components/materials/material-page-view";
import { getAllMaterials, getMaterialBySlug } from "@/lib/content/materials";
import { buildPageMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllMaterials().map((material) => ({ slug: material.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);
  if (!material) return {};

  return buildPageMetadata({
    title: material.seo?.title ?? material.title,
    description: material.seo?.description ?? material.excerpt,
    path: `/materials/${material.slug}`,
    image: material.cover,
  });
}

export default async function MaterialPage({ params }: PageProps) {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);
  if (!material) notFound();

  return <MaterialPageView material={material} />;
}
