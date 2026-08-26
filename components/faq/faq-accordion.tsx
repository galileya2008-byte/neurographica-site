"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/config/seo";
import { cn } from "@/lib/utils";

type FaqAccordionProps = {
  items: FaqItem[];
  defaultOpenIndex?: number | null;
};

export function FaqAccordion({ items, defaultOpenIndex = 0 }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
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
  );
}
