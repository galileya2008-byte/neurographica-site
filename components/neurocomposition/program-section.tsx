import type { Product } from "@/types/product";
import { Section, SectionHeader } from "@/components/layout/section";
import { JoinButton } from "@/components/neurocomposition/join-button";
import { LessonMarkIcon } from "@/components/neurocomposition/lesson-mark-icon";
import {
  bonusLesson,
  lessons,
} from "@/lib/content/neurocomposition";
import { cn } from "@/lib/utils";

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
        {lessons.map((lesson) => {
          const highlight =
            "highlight" in lesson ? lesson.highlight : undefined;

          return (
            <li key={lesson.number} className="min-w-0">
              <article
                className={cn(
                  "flex h-full flex-col rounded-[1.5rem] border p-5 md:p-6",
                  highlight
                    ? "border-gold/35 bg-[linear-gradient(180deg,_rgb(252_250_246)_0%,_rgb(228_238_232/0.55)_100%)] shadow-[0_12px_32px_-18px_rgb(154_123_85/0.45)]"
                    : "border-chocolate/10 bg-card/90",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <LessonMarkIcon mark={lesson.mark} />
                  <span className="font-display text-lg text-gold">
                    {String(lesson.number).padStart(2, "0")}
                  </span>
                </div>
                {highlight ? (
                  <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
                    {highlight}
                  </p>
                ) : null}
                <h3
                  className={cn(
                    "text-xl leading-snug",
                    highlight ? "mt-2" : "mt-5",
                  )}
                >
                  {lesson.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-accent">
                  {lesson.accent}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {lesson.description}
                </p>
              </article>
            </li>
          );
        })}
      </ol>

      <article className="relative mt-4 overflow-hidden rounded-[1.75rem] border border-gold/40 bg-[linear-gradient(135deg,_rgb(252_250_246)_0%,_rgb(235_228_216/0.85)_48%,_rgb(228_238_232/0.7)_100%)] px-6 py-7 shadow-[0_18px_40px_-24px_rgb(154_123_85/0.55)] md:px-8 md:py-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
          {bonusLesson.badge}
        </p>
        <h3 className="mt-3 max-w-3xl text-2xl leading-snug md:text-3xl">
          {bonusLesson.title}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
          {bonusLesson.description}
        </p>
      </article>

      <div className="mt-12 flex flex-col items-start gap-4 rounded-[1.5rem] border border-chocolate/10 bg-card/80 px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p className="max-w-xl text-lg leading-relaxed text-foreground">
          Готовы перейти от повторения алгоритма к собственной композиции?
        </p>
        <JoinButton product={product} className="w-full shrink-0 sm:w-auto" />
      </div>
    </Section>
  );
}
