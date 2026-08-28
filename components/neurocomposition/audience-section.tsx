import { Section, SectionHeader } from "@/components/layout/section";
import { audienceItems } from "@/lib/content/neurocomposition";

export function AudienceSection() {
  return (
    <Section tone="warm" lines="left">
      <SectionHeader
        title="Этот курс для вас, если…"
        description="Для тех, кто уже рисует в НейроГрафике и хочет выйти за пределы готового алгоритма."
      />
      <ul className="grid gap-4 sm:grid-cols-2">
        {audienceItems.map((item, index) => (
          <li
            key={item}
            className="flex gap-4 rounded-[1.5rem] border border-chocolate/10 bg-card/85 px-5 py-5"
          >
            <span className="font-display text-xl text-gold" aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="pt-0.5 leading-relaxed text-muted">{item}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
