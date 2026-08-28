import { Section, SectionHeader } from "@/components/layout/section";
import { resultItems } from "@/lib/content/neurocomposition";

export function ResultsSection() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Результат"
        title="После курса участник сможет"
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resultItems.map((item, index) => (
          <li
            key={item}
            className="min-h-[8.5rem] rounded-[1.5rem] border border-border/70 bg-card px-5 py-5"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] text-gold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 leading-relaxed text-foreground">{item}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
