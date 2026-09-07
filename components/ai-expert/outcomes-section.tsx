import { Section, SectionHeader } from "@/components/layout/section";
import { aiExpertCopy } from "@/lib/content/ai-expert-system";

export function OutcomesSection() {
  const { outcomes } = aiExpertCopy;

  return (
    <Section tone="warm" lines="right">
      <SectionHeader
        eyebrow={outcomes.eyebrow}
        title={outcomes.title}
        description={outcomes.intro}
      />

      <ul className="grid gap-3 sm:grid-cols-2">
        {outcomes.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-[1.25rem] border border-chocolate/10 bg-card/85 px-5 py-4"
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
              aria-hidden
            />
            <span className="leading-relaxed text-muted">{item}</span>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted">
        {outcomes.note}
      </p>
    </Section>
  );
}
