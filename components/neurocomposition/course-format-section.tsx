import { Section, SectionHeader } from "@/components/layout/section";
import { FormatIconMark } from "@/components/neurocomposition/format-icon-mark";
import { formatItems } from "@/lib/content/neurocomposition";
import { cn } from "@/lib/utils";

export function CourseFormatSection() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Формат"
        title="Как устроено обучение"
        description="Практика, обратная связь по ключевым работам и итоговая авторская композиция."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {formatItems.map((item) => {
          const featured = "featured" in item && item.featured;
          const wide = "wide" in item && item.wide;

          return (
            <li
              key={item.title}
              className={cn(
                wide && "sm:col-span-2 lg:col-span-3",
              )}
            >
              <article
                className={cn(
                  "h-full rounded-[1.5rem] border px-5 py-6",
                  featured
                    ? "border-gold/30 bg-[linear-gradient(180deg,_rgb(252_250_246)_0%,_rgb(228_238_232/0.45)_100%)]"
                    : "border-border/70 bg-card",
                  wide && "md:flex md:items-start md:gap-6 md:px-7 md:py-7",
                )}
              >
                <div
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-light text-accent",
                    featured && "bg-gold/15 text-chocolate",
                  )}
                >
                  <FormatIconMark icon={item.icon} />
                </div>
                <div className={cn(wide && "mt-4 md:mt-0")}>
                  <h3 className={cn("text-xl leading-snug", wide ? "md:mt-0" : "mt-4")}>
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                    {item.description}
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
