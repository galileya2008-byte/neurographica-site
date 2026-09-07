import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiExpertPage } from "@/components/ai-expert/ai-expert-page";
import { NeurocompositionPage } from "@/components/neurocomposition/neurocomposition-page";
import { ProductPageView } from "@/components/product/product-page-view";
import { AI_EXPERT_SLUG } from "@/lib/constants/ai-expert-system";
import {
  COURSE_HERO_IMAGE,
  NEUROCOMPOSITION_SLUG,
} from "@/lib/constants/neurocomposition";
import {
  getAllPrograms,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/content/products";
import { buildPageMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPrograms().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug("program", slug);
  if (!product) return {};

  const isNeurocomposition = product.slug === NEUROCOMPOSITION_SLUG;
  const isAiExpert = product.slug === AI_EXPERT_SLUG;

  return buildPageMetadata({
    title: product.seo?.title ?? product.title,
    description: product.seo?.description ?? product.shortDescription,
    path: `/programs/${product.slug}`,
    image: isNeurocomposition
      ? COURSE_HERO_IMAGE || product.cover
      : product.cover,
    absoluteTitle: isNeurocomposition || isAiExpert,
    keywords: isNeurocomposition
      ? [
          "нейрокомпозиция",
          "нейрографика",
          "композиция",
          "золотое сечение",
          "курс нейрографики",
        ]
      : isAiExpert
        ? [
            "нейросети для экспертов",
            "ИИ для экспертов",
            "промпты",
            "автоматизация работы",
            "AI-система",
          ]
        : undefined,
  });
}

export default async function ProgramPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug("program", slug);
  if (!product) notFound();

  if (product.slug === NEUROCOMPOSITION_SLUG) {
    return <NeurocompositionPage product={product} />;
  }

  if (product.slug === AI_EXPERT_SLUG) {
    return <AiExpertPage product={product} />;
  }

  const related = getRelatedProducts(product);
  return <ProductPageView product={product} related={related} />;
}
