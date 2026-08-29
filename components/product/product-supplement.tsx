"use client";

import { useState } from "react";
import { Check, Copy, Sparkles } from "lucide-react";
import type { ProductSupplement } from "@/types/product";
import { Section, SectionHeader } from "@/components/layout/section";

type ProductSupplementSectionProps = {
  supplement: ProductSupplement;
};

export function ProductSupplementSection({ supplement }: ProductSupplementSectionProps) {
  return (
    <Section tone="accent">
      <div className="overflow-hidden rounded-[1.75rem] border border-gold/30 bg-[linear-gradient(135deg,_rgb(228_238_232/0.65),_rgb(252_250_246/0.95))] shadow-card">
        <div className="border-b border-gold/20 px-6 py-5 md:px-10 md:py-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-accent-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              {supplement.badge}
            </span>
          </div>
          <h2 className="mt-5 text-3xl md:text-4xl">{supplement.title}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground/90">
            {supplement.lead}
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">{supplement.description}</p>
          {supplement.note ? (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{supplement.note}</p>
          ) : null}
        </div>

        <div className="space-y-5 px-6 py-8 md:px-10 md:py-10">
          <SectionHeader
            eyebrow="Инструменты"
            title="Промпты для нейросетей"
            description="Скопируйте текст и вставьте в ChatGPT, Claude или другую нейросеть — как помощника в построении своей личной модели рисования."
            className="mb-0"
          />

          <div className="grid gap-5 lg:grid-cols-1">
            {supplement.prompts.map((item, index) => (
              <PromptCard key={item.id} index={index + 1} {...item} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function PromptCard({
  index,
  title,
  purpose,
  prompt,
}: {
  index: number;
  title: string;
  purpose: string;
  prompt: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <article className="rounded-[1.35rem] border border-chocolate/10 bg-card/90 p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
            Промпт {String(index).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-2xl">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{purpose}</p>
        </div>
        <button
          type="button"
          onClick={copyPrompt}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-chocolate/15 bg-warm/70 px-4 text-sm font-medium text-foreground transition-colors hover:border-gold/40"
        >
          {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
          {copied ? "Скопировано" : "Скопировать"}
        </button>
      </div>
      <pre className="mt-5 overflow-x-auto whitespace-pre-wrap rounded-2xl border border-border/70 bg-background/80 p-5 font-body text-sm leading-relaxed text-muted">
        {prompt}
      </pre>
    </article>
  );
}
