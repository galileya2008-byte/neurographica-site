"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    name: "Анна К.",
    text: "Placeholder — отзыв будет добавлен позже. Спокойная подача, понятная структура и ощущение профессиональной поддержки.",
  },
  {
    name: "Мария С.",
    text: "Placeholder — отзыв будет добавлен позже. После занятия стало яснее, с чего начать движение к своей цели.",
  },
  {
    name: "Елена В.",
    text: "Placeholder — отзыв будет добавлен позже. Нравится бережный и взрослый подход без лишней мистики.",
  },
];

export function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const current = reviews[index];

  return (
    <Section lines="left">
      <SectionHeader
        eyebrow="Отзывы"
        title="Что говорят участники"
        description="Реальные отзывы будут добавлены на следующем этапе наполнения контентом."
        align="center"
      />

      <div className="mx-auto max-w-3xl">
        <article className="relative rounded-[2rem] border border-border/70 bg-card px-8 py-10 shadow-card md:px-12 md:py-12">
          <Quote className="mb-6 h-8 w-8 text-accent/50" />
          <p className="text-lg leading-relaxed text-foreground md:text-xl">
            «{current.text}»
          </p>
          <p className="mt-6 font-medium text-accent">{current.name}</p>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {reviews.map((review, i) => (
                <button
                  key={review.name}
                  type="button"
                  aria-label={`Отзыв ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-accent" : "w-2.5 bg-border"
                  }`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Предыдущий отзыв"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-accent-light"
                onClick={() => setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Следующий отзыв"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-accent-light"
                onClick={() => setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </article>

        <div className="mt-8 text-center">
          <Button href="/reviews" variant="secondary">
            Все отзывы
          </Button>
        </div>
      </div>
    </Section>
  );
}
