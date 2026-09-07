import { Section, SectionHeader } from "@/components/layout/section";
import { aiExpertCopy } from "@/lib/content/ai-expert-system";

export function ProgramSection() {
  const { program } = aiExpertCopy;

  return (
    <Section tone="accent" id="program">
      <SectionHeader
        eyebrow={program.eyebrow}
        title={program.title}
        description="Семь дней — от карты задач до персональной системы и плана внедрения."
      />

      <ol className="grid gap-4 lg:grid-cols-2">
        {program.days.map((day) => (
          <li key={day.day}>
            <article className="flex h-full flex-col rounded-[1.5rem] border border-chocolate/10 bg-card/90 p-6 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full bg-accent-light px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                  День {day.day}
                </span>
                <span className="font-display text-lg text-gold/80">
                  {String(day.day).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-xl leading-snug">{day.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted md:text-base">
                {day.description}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
