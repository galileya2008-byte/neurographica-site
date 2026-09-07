import { Section, SectionHeader } from "@/components/layout/section";

type NarrativeSectionProps = {
  title: string;
  paragraphs: readonly string[];
  tone?: "default" | "warm" | "accent";
  eyebrow?: string;
  lines?: "left" | "right" | "none";
};

export function NarrativeSection({
  title,
  paragraphs,
  tone = "default",
  eyebrow,
  lines = "none",
}: NarrativeSectionProps) {
  return (
    <Section tone={tone} lines={lines}>
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="mx-auto max-w-3xl space-y-5">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-lg leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
