"use client";

import { useMemo } from "react";
import { Bookmark, Share, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { dismissBookmarkHint } from "@/lib/engagement/storage";

type BookmarkPromptProps = {
  onDismiss?: () => void;
  variant?: "inline" | "modal";
};

function useBookmarkHints() {
  return useMemo(() => {
    if (typeof navigator === "undefined") {
      return { platform: "desktop" as const, shortcut: "Ctrl + D" };
    }

    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua);
    const isMac = /Mac/.test(ua);

    if (isIOS) {
      return { platform: "ios" as const };
    }

    return {
      platform: isMac ? ("mac" as const) : ("desktop" as const),
      shortcut: isMac ? "⌘ + D" : "Ctrl + D",
    };
  }, []);
}

export function BookmarkPrompt({ onDismiss, variant = "inline" }: BookmarkPromptProps) {
  const hints = useBookmarkHints();

  function handleDismiss() {
    dismissBookmarkHint();
    onDismiss?.();
  }

  const content = (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent">
          <Bookmark className="h-5 w-5" />
        </div>
        <div>
          <p className="font-display text-xl text-foreground">Сохраните сайт в избранное</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Чтобы возвращаться к практикам и материалам — и не потерять промокод.
          </p>
        </div>
      </div>

      {hints.platform === "ios" ? (
        <ol className="space-y-2 rounded-2xl border border-chocolate/10 bg-warm/50 px-5 py-4 text-sm text-muted">
          <li className="flex items-center gap-2">
            <Share className="h-4 w-4 shrink-0 text-gold" />
            Нажмите «Поделиться» в Safari
          </li>
          <li>Выберите «На экран „Домой“»</li>
          <li>Назовите закладку «{siteConfig.brand}»</li>
        </ol>
      ) : (
        <div className="rounded-2xl border border-chocolate/10 bg-warm/50 px-5 py-4 text-sm text-muted">
          Нажмите{" "}
          <kbd className="rounded-md border border-chocolate/15 bg-card px-2 py-0.5 font-mono text-xs text-foreground">
            {hints.shortcut}
          </kbd>{" "}
          и добавьте{" "}
          <span className="font-medium text-foreground">{siteConfig.url.replace("https://", "")}</span>{" "}
          в закладки.
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="secondary" onClick={handleDismiss}>
          Понятно, спасибо
        </Button>
      </div>
    </div>
  );

  if (variant === "modal") {
    return (
      <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center">
        <button
          type="button"
          aria-label="Закрыть"
          className="absolute inset-0 bg-foreground/30 backdrop-blur-[2px]"
          onClick={handleDismiss}
        />
        <div className="relative w-full max-w-md rounded-[1.75rem] border border-chocolate/10 bg-card p-6 shadow-card">
          <button
            type="button"
            aria-label="Закрыть"
            onClick={handleDismiss}
            className="absolute right-4 top-4 text-muted transition-colors hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[1.5rem] border border-gold/25 bg-[linear-gradient(135deg,_rgb(228_238_232/0.55),_rgb(252_250_246/0.9))] p-6">
      {content}
    </div>
  );
}
