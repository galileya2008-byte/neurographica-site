import { Section, SectionHeader } from "@/components/layout/section";

export function TransformationSection() {
  return (
    <Section>
      <SectionHeader
        title="От «я повторяю» к «я создаю сама»"
        description="К концу курса участник создаст собственную нейрографическую композицию и сможет объяснить, почему использовал именно такие фигуры, расположение, ритм, контраст и другие композиционные решения."
      />

      <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
        <article className="rounded-[1.5rem] border border-border/80 bg-card px-6 py-7 md:px-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            Было
          </p>
          <p className="mt-4 font-display text-2xl leading-snug md:text-3xl">
            Рисую по готовому алгоритму
          </p>
        </article>

        <div
          className="flex items-center justify-center py-1 text-gold md:py-0"
          aria-hidden
        >
          <span className="font-display text-3xl md:text-4xl">→</span>
        </div>

        <article className="rounded-[1.5rem] border border-accent/15 bg-accent-light/70 px-6 py-7 md:px-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
            Стало
          </p>
          <p className="mt-4 font-display text-2xl leading-snug text-accent md:text-3xl">
            Понимаю принципы и создаю собственные композиции
          </p>
        </article>
      </div>
    </Section>
  );
}
