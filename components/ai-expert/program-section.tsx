import Link from "next/link";
import { Section, SectionHeader } from "@/components/layout/section";
import { aiExpertCopy } from "@/lib/content/ai-expert-system";

export function ProgramSection() {
  const { program } = aiExpertCopy;

  return (
    <Section tone="accent" id="program" className="scroll-mt-28">
      <SectionHeader
        eyebrow={program.eyebrow}
        title={program.title}
        description={program.description}
      />

      <div className="space-y-12">
        {program.blocks.map((block, blockIndex) => (
          <div key={block.title}>
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="text-2xl md:text-3xl">{block.title}</h3>
              <p className="text-sm text-muted">
                Блок {blockIndex + 1} из {program.blocks.length}
              </p>
            </div>

            <ol className="grid gap-4 lg:grid-cols-2">
              {block.lessons.map((lesson) => (
                <li key={lesson.number}>
                  <article className="flex h-full flex-col rounded-[1.5rem] border border-chocolate/10 bg-card/90 p-6 md:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="rounded-full bg-accent-light px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                        Урок {lesson.number}
                      </span>
                      <span className="font-display text-lg text-gold/80">
                        {String(lesson.number).padStart(2, "0")}
                      </span>
                    </div>
                    <h4 className="mt-4 text-xl leading-snug">{lesson.title}</h4>
                    <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                      {lesson.content}
                    </p>
                    <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
                      Практический результат
                    </p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground md:text-base">
                      {lesson.outcome}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted">
        Ищете материалы по запросу «ИИ для экспертов»? Смотрите также страницу{" "}
        <Link
          href="/topics/ii-dlya-ekspertov"
          className="text-accent underline-offset-4 hover:underline"
        >
          продвижения услуги с помощью нейросетей
        </Link>
        .
      </p>
    </Section>
  );
}
