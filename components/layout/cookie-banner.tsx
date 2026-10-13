"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "ng_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Уведомление о файлах cookie"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-6"
    >
      <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-chocolate/15 bg-card/95 px-3 py-3 shadow-card backdrop-blur-md sm:gap-6 sm:rounded-[1.5rem] sm:p-5">
        <p className="min-w-0 flex-1 text-xs leading-snug text-muted sm:text-sm sm:leading-relaxed">
          Сайт использует cookie.{" "}
          <Link
            href="/privacy"
            prefetch={false}
            className="text-accent underline-offset-4 hover:underline"
          >
            Политика
          </Link>
        </p>
        <Button type="button" size="sm" className="shrink-0" onClick={accept}>
          Принять
        </Button>
      </div>
    </div>
  );
}
