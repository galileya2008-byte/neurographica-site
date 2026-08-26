import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicPageView } from "@/components/topics/topic-page-view";
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

  return <TopicPageView topic={topic} />;
}
