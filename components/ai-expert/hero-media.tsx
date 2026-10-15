"use client";

import { useEffect, useRef, useState } from "react";
import { PriceDisplay } from "@/components/ai-expert/price-display";
import {
  AI_EXPERT_HERO_POSTER,
  AI_EXPERT_HERO_VIDEO,
  AI_EXPERT_META,
} from "@/lib/constants/ai-expert-system";
import { withBasePath } from "@/lib/paths";

/**
 * На мобиле — только постер (видео ~10 МБ не качается).
 * На десктопе видео подгружается при появлении в зоне видимости.
 */
export function HeroMedia() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    if (!desktop.matches) return;

    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => {
      // Autoplay может быть заблокирован — остаётся постер
    });
  }, [shouldLoadVideo]);

  const poster = withBasePath(AI_EXPERT_HERO_POSTER);

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden rounded-[1.75rem] border border-chocolate/10 bg-card shadow-card"
    >
      <div className="relative aspect-[4/5] bg-chocolate/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
          fetchPriority="high"
        />

        {shouldLoadVideo ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster={poster}
            className="absolute inset-0 h-full w-full object-cover"
            aria-label="Персональная AI-система для эксперта"
          >
            <source src={withBasePath(AI_EXPERT_HERO_VIDEO)} type="video/mp4" />
          </video>
        ) : null}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,_rgb(26_22_18/0.08)_0%,_transparent_35%,_transparent_55%,_rgb(26_22_18/0.72)_100%)]" />

        <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/20 bg-background/75 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground backdrop-blur-sm">
          Программа для экспертов
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 md:p-6">
          <p className="text-sm font-medium text-white/90">{AI_EXPERT_META}</p>
          <PriceDisplay
            className="mt-2"
            size="md"
            inverted
            priceClassName="text-3xl md:text-4xl"
            oldPriceClassName="text-lg md:text-xl"
          />
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/80">
            Система продвижения одной услуги и собственный AI-плагин
          </p>
        </div>
      </div>
    </div>
  );
}
