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
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-3xl border border-border/70 bg-card/95 p-5 shadow-card backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
        <p className="text-sm leading-relaxed text-muted">
          Мы используем файлы cookie, чтобы сайт работал корректно и было удобнее
          им пользоваться. Продолжая просмотр, вы соглашаетесь с{" "}
          <Link
            href="/privacy"
            className="text-accent underline-offset-4 hover:underline"
          >
            политикой конфиденциальности
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button type="button" size="sm" onClick={accept}>
            Принять
          </Button>
        </div>
      </div>
    </div>
  );
}
