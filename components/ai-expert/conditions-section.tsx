import { Section, SectionHeader } from "@/components/layout/section";
import { aiExpertCopy } from "@/lib/content/ai-expert-system";

export function ConditionsSection() {
  const { conditions } = aiExpertCopy;

  return (
    <Section tone="warm" id="conditions" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow={conditions.eyebrow}
        title={conditions.title}
      />
      <dl className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
        {conditions.items.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-border/70 bg-card px-5 py-4"
          >
            <dt className="text-xs uppercase tracking-[0.14em] text-muted">
              {item.label}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-foreground md:text-base">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-muted">
        {conditions.note}
      </p>
    </Section>
  );
}
