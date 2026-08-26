import { practiceRequests } from "@/config/site";

export type Topic = (typeof practiceRequests)[number];

export function getAllTopics(): Topic[] {
  return [...practiceRequests];
}

export function getTopicBySlug(slug: string): Topic | undefined {
  return practiceRequests.find((topic) => topic.slug === slug);
}
