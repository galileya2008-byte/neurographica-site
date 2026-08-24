"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const faqItems = [
  {
    question: "Что такое нейрографика?",
    answer:
      "Нейрографика — метод визуальной практики для работы с запросами, целями и внутренними состояниями. На сайте мы рассказываем о форматах обучения, а сами занятия проходят на платформе GetCourse.",
  },
  {
    question: "Подойдёт ли мне, если я новичок?",
    answer:
      "Да. Есть форматы для начинающих — от коротких мастер-классов до программ с пошаговым сопровождением.",
  },
  {
    question: "Где проходит обучение и оплата?",
    answer:
      "Сайт — это витрина и каталог продуктов. Оплата, личный кабинет и доступ к материалам находятся на платформе GetCourse.",
  },
  {
    question: "Обещаете ли вы гарантированный результат?",
    answer:
      "Нет. Мы не делаем заявлений о гарантированных психологических, медицинских или финансовых результатах. Изменения возможны через ваши осознанные действия и практику.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section tone="accent">
      <SectionHeader
        eyebrow="FAQ"
        title="Частые вопросы"
        description="Короткие ответы на то, с чего обычно начинают новые участники."
      />

      <div className="mx-auto max-w-3xl space-y-3">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <article
              key={item.question}
              className="overflow-hidden rounded-2xl border border-chocolate/10 bg-card/80"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="text-lg font-medium">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-accent transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              {isOpen ? (
                <div className="border-t border-border/60 px-6 pb-5 pt-1 text-muted leading-relaxed">
                  {item.answer}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Button href="/faq" variant="secondary">
          Больше ответов
        </Button>
      </div>
    </Section>
  );
}
