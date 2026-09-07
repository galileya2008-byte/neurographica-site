"use client";

import {
  AI_EXPERT_HERO_POSTER,
  AI_EXPERT_HERO_VIDEO,
  AI_EXPERT_META,
  AI_EXPERT_PRICE_LABEL,
} from "@/lib/constants/ai-expert-system";
import { withBasePath } from "@/lib/paths";

export function HeroMedia() {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-chocolate/10 bg-card shadow-card">
      <div className="relative aspect-[4/5] bg-chocolate/5">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={withBasePath(AI_EXPERT_HERO_POSTER)}
          className="h-full w-full object-cover"
          aria-label="Персональная AI-система для эксперта"
        >
          <source src={withBasePath(AI_EXPERT_HERO_VIDEO)} type="video/mp4" />
        </video>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,_rgb(26_22_18/0.08)_0%,_transparent_35%,_transparent_55%,_rgb(26_22_18/0.72)_100%)]" />

        <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/20 bg-background/75 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground backdrop-blur-sm">
          Программа для экспертов
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 md:p-6">
          <p className="text-sm font-medium text-white/90">{AI_EXPERT_META}</p>
          <p className="mt-2 font-display text-3xl tracking-tight text-white md:text-4xl">
            {AI_EXPERT_PRICE_LABEL}
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/80">
            Настройте ИИ под задачи своей практики за 7 дней
          </p>
        </div>
      </div>
    </div>
  );
}
