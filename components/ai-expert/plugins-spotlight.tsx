import { Section, SectionHeader } from "@/components/layout/section";
import { aiExpertCopy } from "@/lib/content/ai-expert-system";

export function PluginsSpotlight() {
  const { pluginsSpotlight } = aiExpertCopy;

  return (
    <Section id="plugins" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow={pluginsSpotlight.eyebrow}
        title={pluginsSpotlight.title}
        description={pluginsSpotlight.intro}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {pluginsSpotlight.items.map((item) => (
          <article
            key={item.title}
            className="flex h-full flex-col rounded-[1.75rem] border border-gold/35 bg-[linear-gradient(160deg,_rgb(252_250_246)_0%,_rgb(235_228_216/0.9)_52%,_rgb(228_238_232/0.75)_100%)] p-6 shadow-[0_18px_40px_-24px_rgb(154_123_85/0.5)] md:p-7"
          >
            <p className="inline-flex w-fit rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-foreground">
              {item.badge}
            </p>
            <h3 className="mt-4 text-xl leading-snug md:text-2xl">{item.title}</h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted md:text-base">
              {item.description}
            </p>
            <p className="mt-5 border-t border-chocolate/10 pt-4 text-sm font-medium text-chocolate">
              {item.outcome}
            </p>
          </article>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted md:text-base">
        {pluginsSpotlight.note}
      </p>
    </Section>
  );
}
