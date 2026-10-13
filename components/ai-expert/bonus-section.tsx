import { Section } from "@/components/layout/section";
import { aiExpertCopy } from "@/lib/content/ai-expert-system";

export function BonusSection() {
  const { bonus } = aiExpertCopy;

  return (
    <Section id="bonus" className="scroll-mt-28">
      <article className="relative overflow-hidden rounded-[1.75rem] border border-gold/40 bg-[linear-gradient(135deg,_rgb(252_250_246)_0%,_rgb(235_228_216/0.85)_48%,_rgb(228_238_232/0.7)_100%)] px-6 py-8 shadow-[0_18px_40px_-24px_rgb(154_123_85/0.55)] md:px-10 md:py-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
          {bonus.eyebrow}
        </p>
        <h2 className="mt-3 max-w-3xl text-2xl leading-snug md:text-3xl lg:text-4xl">
          {bonus.title}
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted md:text-lg">
          {bonus.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </Section>
  );
}
