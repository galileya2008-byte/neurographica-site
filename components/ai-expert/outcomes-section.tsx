import { Section, SectionHeader } from "@/components/layout/section";
import { aiExpertCopy } from "@/lib/content/ai-expert-system";

export function OutcomesSection() {
  const { outcomes } = aiExpertCopy;

  return (
    <Section tone="warm" lines="right" id="results" className="scroll-mt-28">
      <SectionHeader
        eyebrow={outcomes.eyebrow}
        title={outcomes.title}
        description={outcomes.intro}
      />

      <ul className="grid gap-3 sm:grid-cols-2">
        {outcomes.items.map((item, index) => (
          <li
            key={item}
            className="flex h-full items-start gap-4 rounded-[1.35rem] border border-chocolate/10 bg-card/90 px-5 py-5 shadow-[0_10px_28px_-24px_rgb(26_22_18/0.35)]"
          >
            <span className="font-display text-xl leading-none text-gold/80">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="leading-relaxed text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
