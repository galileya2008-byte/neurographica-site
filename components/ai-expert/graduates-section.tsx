import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/layout/section";
import { aiExpertGraduates } from "@/lib/content/ai-expert-graduates";
import { siteConfig } from "@/config/site";

export function GraduatesSection() {
  const { eyebrow, title, intro, promise, emptyNote, footer, stories } =
    aiExpertGraduates;

  const telegramHandle = siteConfig.social.telegramHandle.replace(/^@/, "");
  const telegramUrl = `https://t.me/${telegramHandle}`;

  return (
    <Section tone="warm" lines="left" id="graduates" className="scroll-mt-28">
      <SectionHeader eyebrow={eyebrow} title={title} description={intro} />

      <ul className="mb-10 grid gap-3 sm:grid-cols-3">
        {promise.map((item) => (
          <li
            key={item.label}
            className="rounded-[1.35rem] border border-gold/35 bg-[linear-gradient(160deg,_rgb(252_250_246)_0%,_rgb(235_228_216/0.88)_55%,_rgb(228_238_232/0.7)_100%)] px-5 py-5 shadow-[0_16px_36px_-26px_rgb(154_123_85/0.55)]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              {item.label}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground md:text-base">
              {item.text}
            </p>
          </li>
        ))}
      </ul>

      {stories.length > 0 ? (
        <ul className="grid gap-5 lg:grid-cols-2">
          {stories.map((story) => (
            <li key={story.id}>
              <article className="flex h-full flex-col rounded-[1.75rem] border border-chocolate/10 bg-card/95 px-6 py-7 shadow-[0_18px_40px_-28px_rgb(26_22_18/0.4)] md:px-8 md:py-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                  {story.role}
                </p>
                <h3 className="mt-3 text-2xl leading-snug">{story.name}</h3>
                <p className="mt-3 text-base font-medium leading-snug text-chocolate md:text-lg">
                  {story.change}
                </p>
                <blockquote className="mt-5 flex-1 border-l-2 border-gold/50 pl-4 text-sm leading-relaxed text-muted md:text-base">
                  «{story.quote}»
                </blockquote>

                <div className="mt-6 flex flex-wrap gap-2">
                  {story.storyUrl ? (
                    <a
                      href={story.storyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-sm font-medium text-accent-foreground transition hover:opacity-90"
                    >
                      {story.storyLabel ?? "Читать историю"}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  ) : null}
                  {(story.socials ?? []).map((social) => (
                    <a
                      key={`${story.id}-${social.label}-${social.url}`}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-chocolate/15 bg-background/80 px-3.5 py-2 text-sm font-medium text-foreground transition hover:border-accent/40 hover:text-accent"
                    >
                      {social.label}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-[1.5rem] border border-dashed border-chocolate/20 bg-card/70 px-6 py-8 text-center text-sm leading-relaxed text-muted md:text-base">
          {emptyNote}
        </p>
      )}

      <p className="mx-auto mt-10 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
        {footer}{" "}
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          Написать в Telegram
        </a>
      </p>
    </Section>
  );
}
