import type { Product } from "@/types/product";
import { Section, SectionHeader } from "@/components/layout/section";
import { JoinButton } from "@/components/neurocomposition/join-button";
import { LessonMarkIcon } from "@/components/neurocomposition/lesson-mark-icon";
import { lessons } from "@/lib/content/neurocomposition";

type ProgramSectionProps = {
  product: Product;
};

export function ProgramSection({ product }: ProgramSectionProps) {
  return (
    <Section tone="accent" id="program">
      <SectionHeader
        eyebrow="Программа"
        title="8 занятий — от алфавита фигур к авторской работе"
        description="Каждый урок даёт один композиционный принцип и сразу переводит его в практику."
      />

      <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {lessons.map((lesson) => (
          <li key={lesson.number} className="min-w-0">
            <article className="flex h-full flex-col rounded-[1.5rem] border border-chocolate/10 bg-card/90 p-5 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <LessonMarkIcon mark={lesson.mark} />
                <span className="font-display text-lg text-gold">
                  {String(lesson.number).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-xl leading-snug">{lesson.title}</h3>
              <p className="mt-2 text-sm font-medium text-accent">
                {lesson.accent}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {lesson.description}
              </p>
            </article>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-col items-start gap-4 rounded-[1.5rem] border border-chocolate/10 bg-card/80 px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p className="max-w-xl text-lg leading-relaxed text-foreground">
          Готовы перейти от повторения алгоритма к собственной композиции?
        </p>
        <JoinButton product={product} className="w-full shrink-0 sm:w-auto" />
      </div>
    </Section>
  );
}
