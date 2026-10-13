import { Section, SectionHeader } from "@/components/layout/section";
import { aiExpertCopy } from "@/lib/content/ai-expert-system";

export function AudienceSection() {
  const { audience } = aiExpertCopy;

  return (
    <Section tone="accent" id="audience" className="scroll-mt-28">
      <SectionHeader
        eyebrow={audience.eyebrow}
        title={audience.title}
        description={audience.intro}
      />

      <ul className="mx-auto grid max-w-4xl gap-3">
        {audience.items.map((item) => (
          <li
            key={item}
            className="rounded-[1.25rem] border border-chocolate/10 bg-card/90 px-5 py-4 leading-relaxed text-foreground"
          >
            {item}
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-6 max-w-4xl text-sm font-medium text-accent md:text-base">
        {audience.note}
      </p>
    </Section>
  );
}
