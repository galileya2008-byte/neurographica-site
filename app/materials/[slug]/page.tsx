import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MaterialPageView } from "@/components/materials/material-page-view";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
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

  const url = `${siteConfig.url}/materials/${material.slug}/`;
  const isPodcast = material.type === "podcast";
  const hasDirectAudio = material.mediaUrl
    ? /\.(mp3|m4a|wav|ogg)(?:\?.*)?$/i.test(material.mediaUrl)
    : false;
  const schema = isPodcast
    ? {
        "@context": "https://schema.org",
        "@type": "PodcastEpisode",
        name: material.title,
        description: material.seo?.description ?? material.excerpt,
        datePublished: material.publishedAt,
        timeRequired: `PT${material.readingMinutes}M`,
        url,
        inLanguage: "ru-RU",
        associatedMedia: hasDirectAudio
          ? {
              "@type": "MediaObject",
              contentUrl: material.mediaUrl,
            }
          : undefined,
        sameAs:
          material.mediaUrl && !hasDirectAudio ? material.mediaUrl : undefined,
        author: {
          "@type": "Person",
          name: siteConfig.expert,
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: material.title,
        description: material.seo?.description ?? material.excerpt,
        datePublished: material.publishedAt,
        dateModified: material.publishedAt,
        mainEntityOfPage: url,
        inLanguage: "ru-RU",
        image: material.cover
          ? `${siteConfig.url}${material.cover}`
          : undefined,
        author: {
          "@type": "Person",
          name: siteConfig.expert,
          url: `${siteConfig.url}/about/`,
        },
      };

  return (
    <>
      <JsonLd data={schema} />
      <MaterialPageView material={material} />
    </>
  );
}
