import { topics } from "@/config/topics";
import { topicsSchema } from "@/lib/content/schemas";
import type { Topic } from "@/types/topic";

export type { Topic } from "@/types/topic";

const parsedTopics = topicsSchema.parse(topics) as Topic[];

export function getAllTopics(): Topic[] {
  return [...parsedTopics];
}

export function getTopicBySlug(slug: string): Topic | undefined {
  return parsedTopics.find((topic) => topic.slug === slug);
}
