"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import { engagementConfig } from "@/config/engagement";
import {
  hasSeenLauncher,
  isBookmarkHintDismissed,
  isPromoAlreadyClaimed,
  markLauncherSeen,
} from "@/lib/engagement/storage";
import { BookmarkPrompt } from "@/components/engagement/bookmark-prompt";
import { cn } from "@/lib/utils";

export function EngagementLauncher() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showBookmark, setShowBookmark] = useState(false);

  useEffect(() => {
    const done = isPromoAlreadyClaimed();
    setCompleted(done);

    const seen = hasSeenLauncher();
    if (!seen && !done) {
      const timer = window.setTimeout(() => {
        setVisible(true);
        setExpanded(true);
        markLauncherSeen();
      }, 12000);
      return () => window.clearTimeout(timer);
    }

    setVisible(true);
    return undefined;
  }, []);

  useEffect(() => {
    if (completed || isBookmarkHintDismissed()) return;
    const timer = window.setTimeout(() => setShowBookmark(true), 45000);
    return () => window.clearTimeout(timer);
  }, [completed]);

  if (!visible || pathname === "/play" || pathname === "/admin") return null;

  const { course, game } = engagementConfig;

  return (
    <>
      {showBookmark ? (
        <BookmarkPrompt variant="modal" onDismiss={() => setShowBookmark(false)} />
      ) : null}

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
        {expanded ? (
          <div className="relative w-[min(100vw-2.5rem,18rem)] rounded-[1.25rem] border border-chocolate/10 bg-card/95 p-4 shadow-card backdrop-blur-md">
            <button
              type="button"
              aria-label="Свернуть"
              onClick={() => setExpanded(false)}
              className="absolute right-3 top-3 text-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="pr-6 font-display text-lg leading-snug">{game.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {completed
                ? `Ваш промокод ${course.discountLabel} на ${course.name} уже ждёт на странице практики.`
                : `Пройдите мини-практику за 2 минуты — и получите промокод ${course.discountLabel}.`}
            </p>
            <Link
              href="/play"
              className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-foreground transition-colors hover:bg-[#274840]"
            >
              {completed ? "Открыть промокод" : "Начать практику"}
            </Link>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            "group flex items-center gap-2 rounded-full border border-gold/35 bg-card/95 px-4 py-3 shadow-card backdrop-blur-md transition-all hover:border-gold/55 hover:shadow-[0_14px_32px_-12px_rgb(154_123_85/0.35)]",
            expanded && "ring-2 ring-gold/20",
          )}
        >
          <Sparkles className="h-4 w-4 text-gold transition-transform group-hover:rotate-12" />
          <span className="text-sm font-medium">
            {completed ? "Промокод" : `Практика · ${course.discountLabel}`}
          </span>
        </button>
      </div>
    </>
  );
}
