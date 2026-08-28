import { Section, SectionHeader } from "@/components/layout/section";
import { reviewedWorks } from "@/lib/content/neurocomposition";

export function ReviewSection() {
  return (
    <Section tone="warm" lines="right">
      <SectionHeader
        title="Не просто посмотреть — попробовать и получить обратную связь"
        description="На проверку идут 3 ключевые работы. Остальные упражнения используются для самостоятельной практики."
      />

      <ol className="grid gap-4 md:grid-cols-3">
        {reviewedWorks.map((work) => (
          <li
            key={work.number}
            className="rounded-[1.5rem] border border-chocolate/10 bg-card/90 px-6 py-7"
          >
            <p className="font-display text-3xl text-gold">{work.number}</p>
            <h3 className="mt-4 text-xl leading-snug">{work.title}</h3>
            <p className="mt-2 text-sm text-muted">{work.lesson}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
