"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/layout/section";
import { SiteImage } from "@/components/ui/site-image";
import { AI_EXPERT_CAROUSEL_EXAMPLE } from "@/lib/constants/ai-expert-system";
import { cn } from "@/lib/utils";

export function PremiumCarousel() {
  const { eyebrow, title, description, slides } = AI_EXPERT_CAROUSEL_EXAMPLE;
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const go = useCallback(
    (direction: -1 | 1) => {
      setIndex((current) => (current + direction + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const slide = slides[index];

  return (
    <Section tone="warm" id="carousel-example" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <div className="mx-auto max-w-xl">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-chocolate/15 bg-[linear-gradient(160deg,_#1a2430_0%,_#101820_55%,_#0c1218_100%)] shadow-[0_28px_60px_-28px_rgb(16_24_32/0.75)]">
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="relative aspect-[4/5] w-full">
            <SiteImage
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 560px"
              priority={index === 0}
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-5 pb-5 pt-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
              Слайд {index + 1} из {total}
            </p>
            <p className="mt-2 text-sm leading-snug text-white md:text-base">
              {slide.caption}
            </p>
          </div>

          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55"
            aria-label="Предыдущий слайд"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55"
            aria-label="Следующий слайд"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {slides.map((item, slideIndex) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setIndex(slideIndex)}
              className={cn(
                "h-2.5 rounded-full transition-all",
                slideIndex === index
                  ? "w-8 bg-gold"
                  : "w-2.5 bg-chocolate/25 hover:bg-chocolate/45",
              )}
              aria-label={`Перейти к слайду ${slideIndex + 1}`}
              aria-current={slideIndex === index}
            />
          ))}
        </div>

        <p className="mt-6 text-center text-sm leading-relaxed text-muted">
          Плагин для каруселей помогает собрать структуру и тексты под ваш визуал.
          Финальный вид, правки и публикация остаются за экспертом.
        </p>
      </div>
    </Section>
  );
}
