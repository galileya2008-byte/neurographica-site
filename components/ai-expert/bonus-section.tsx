import { Section, SectionHeader } from "@/components/layout/section";
import { aiExpertCopy } from "@/lib/content/ai-expert-system";

export function BonusSection() {
  const { bonuses } = aiExpertCopy;

  return (
    <Section id="bonus" className="scroll-mt-28">
      <SectionHeader
        eyebrow={bonuses.eyebrow}
        title={bonuses.title}
        description={bonuses.intro}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {bonuses.items.map((item) => (
          <article
            key={item.title}
            className="relative overflow-hidden rounded-[1.75rem] border border-gold/40 bg-[linear-gradient(135deg,_rgb(252_250_246)_0%,_rgb(235_228_216/0.85)_48%,_rgb(228_238_232/0.7)_100%)] px-6 py-8 shadow-[0_18px_40px_-24px_rgb(154_123_85/0.55)] md:px-8 md:py-9"
          >
            <p className="inline-flex rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-foreground">
              {item.badge}
            </p>
            <h3 className="mt-4 text-2xl leading-snug md:text-3xl">{item.title}</h3>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted md:text-base">
              {item.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
