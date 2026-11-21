import Link from "next/link";
import { CircleDot, Compass, Focus, Flame, Heart, Leaf, Sparkles, Target } from "lucide-react";
import { topics } from "@/config/topics";
import { Section, SectionHeader } from "@/components/layout/section";
import { getCardColorClass } from "@/lib/card-settings";
import { cn } from "@/lib/utils";

const requestIcons = [Compass, Target, Focus, Flame, Sparkles, CircleDot, Leaf, Heart];

export function DirectionsCards() {
  return (
    <Section id="practice" lines="right" autumnDecor>
      <SectionHeader
        eyebrow="Практика по запросу"
        title="Выберите практику по своему запросу"
        description="Знакомство с Нейрографикой, работа с желаниями, целями и планированием — выберите свою тему."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {topics.filter((request) => request.directionId !== "expert-marketing").map((request, index) => (
          <Link
            key={request.id}
            href={`/topics/${request.slug}`}
            prefetch={false}
            className={cn(
              "request-card group relative flex h-full flex-col rounded-[1.5rem] border border-chocolate/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-card",
              getCardColorClass(request.cardColor),
              request.badge && "pt-16",
            )}
          >
            {request.badge ? (
              <span className="absolute left-6 top-5 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-foreground shadow-soft">
                {request.badge}
              </span>
            ) : null}
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/8 text-accent" aria-hidden="true">
              {(() => { const Icon = requestIcons[index % requestIcons.length]; return <Icon className="h-5 w-5" strokeWidth={1.5} />; })()}
            </div>
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="text-xl leading-snug">{request.title}</h3>

            </div>
            <p className="mt-auto text-sm leading-relaxed text-muted">
              {request.description}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
