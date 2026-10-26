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
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="text-2xl md:text-3xl">{block.title}</h3>
              <p className="text-sm text-muted">
                Блок {blockIndex + 1} из {program.blocks.length}
              </p>
            </div>
            <p className="mb-5 max-w-3xl rounded-2xl border border-accent/15 bg-accent-light/40 px-4 py-3 text-sm leading-relaxed text-foreground md:text-base">
              {block.benefit}
            </p>

            <ol className="grid gap-4 lg:grid-cols-2">
              {block.lessons.map((lesson) => {
                const isFeatured = Boolean(lesson.featured);
                const badge = lesson.badge ?? `Урок ${lesson.number}`;
                return (
                <li key={lesson.number}>
                  <article
                    className={
                      isFeatured
                        ? "flex h-full flex-col rounded-[1.5rem] border border-gold/50 bg-[linear-gradient(135deg,_rgb(252_250_246)_0%,_rgb(235_228_216/0.9)_50%,_rgb(228_238_232/0.75)_100%)] p-6 shadow-[0_18px_40px_-24px_rgb(154_123_85/0.55)] md:p-7"
                        : "flex h-full flex-col rounded-[1.5rem] border border-chocolate/10 bg-card/90 p-6 md:p-7"
                    }
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={
                          isFeatured
                            ? "rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-foreground"
                            : "rounded-full bg-accent-light px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-accent"
                        }
                      >
                        {badge}
                      </span>
                      {!isFeatured ? (
                        <span className="font-display text-lg text-gold/80">
                          {String(lesson.number).padStart(2, "0")}
                        </span>
                      ) : null}
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
              );
              })}
            </ol>
          </div>
        ))}
      </div>

      {program.accessNote ? (
        <p className="mt-10 max-w-3xl rounded-2xl border border-gold/35 bg-accent-light/50 px-5 py-4 text-sm leading-relaxed text-foreground md:text-base">
          {program.accessNote}
        </p>
      ) : null}

      <div className="mt-10 max-w-3xl space-y-2 text-sm leading-relaxed text-muted">
        <p>Полезные материалы по смежным запросам:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Link
              href="/topics/kak-ekspertu-prodvigatsya-samostoyatelno"
              className="text-accent underline-offset-4 hover:underline"
            >
              Как эксперту продвигаться самостоятельно
            </Link>
          </li>
          <li>
            <Link
              href="/topics/fotosessiya-dlya-biznesa-eksperta"
              className="text-accent underline-offset-4 hover:underline"
            >
              Нейрофотосессия для себя и бизнеса эксперта
            </Link>
          </li>
          <li>
            <Link
              href="/topics/ii-dlya-ekspertov"
              className="text-accent underline-offset-4 hover:underline"
            >
              Как эксперту увеличить продажи с помощью ИИ
            </Link>
          </li>
        </ul>
      </div>
    </Section>
  );
}
