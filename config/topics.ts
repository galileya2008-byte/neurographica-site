import topicsContent from "@/content/topics.json";
import { compareCardOrder } from "@/lib/card-settings";
import type { Topic } from "@/types/topic";

export const topics = (topicsContent as Topic[])
  .slice()
  .sort(compareCardOrder);
