import { Section, SectionHeader } from "@/components/layout/section";
import { FormatIconMark } from "@/components/neurocomposition/format-icon-mark";
import { formatItems } from "@/lib/content/neurocomposition";

export function CourseFormatSection() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Формат"
        title="Как устроено обучение"
        description="Практика, обратная связь по ключевым работам и итоговая авторская композиция."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {formatItems.map((item) => (
          <li
            key={item.title}
            className="rounded-[1.5rem] border border-border/70 bg-card px-5 py-6"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-light text-accent">
              <FormatIconMark icon={item.icon} />
            </div>
            <h3 className="mt-4 text-xl leading-snug">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
