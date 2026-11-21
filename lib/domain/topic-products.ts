import type { Product } from "@/types/product";
import type { Topic } from "@/types/topic";
import { filterProducts } from "@/lib/domain/products";

/** Curated lists take precedence, including an intentionally empty selection. */
export function getTopicProducts(topic: Topic, products: Product[]) {
  function select(type: Product["type"], slugs: string[] | undefined, limit: number) {
    const pool = products.filter((product) => product.type === type);
    if (slugs !== undefined) {
      return slugs.map((slug) => {
        const product = pool.find((item) => item.slug === slug);
        if (!product) throw new Error(`Unknown ${type} "${slug}" in topic "${topic.slug}"`);
        return product;
      }).slice(0, limit);
    }
    return filterProducts(pool, { direction: topic.directionId }).slice(0, limit);
  }

  return {
    masterclasses: select("masterclass", topic.masterclassSlugs, 6),
    programs: select("program", topic.programSlugs ?? topic.featuredProgramSlugs, 4),
  };
}
