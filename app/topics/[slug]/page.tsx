import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiSalesTopicPage } from "@/components/topics/ai-sales-topic-page";
import { TopicPageView } from "@/components/topics/topic-page-view";
import { aiSalesTopic } from "@/lib/content/ai-sales-topic";
import { getAllTopics, getTopicBySlug } from "@/lib/content/topics";
import { buildPageMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllTopics().map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return {};

  if (slug === aiSalesTopic.slug) {
    return buildPageMetadata({
      title: aiSalesTopic.title,
      description: aiSalesTopic.description,
      path: `/topics/${aiSalesTopic.slug}`,
      keywords: [...aiSalesTopic.keywords],
      absoluteTitle: true,
    });
  }

  return buildPageMetadata({
    title: topic.seoTitle,
    description: topic.seoDescription,
    path: `/topics/${topic.slug}`,
    keywords: [...topic.keywords],
  });
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  if (slug === aiSalesTopic.slug) {
    return <AiSalesTopicPage />;
  }

  return <TopicPageView topic={topic} />;
}
