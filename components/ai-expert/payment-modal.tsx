"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { PaymentWidgetFrame } from "@/components/ai-expert/payment-widget-frame";
import { AI_EXPERT_PAYMENT_FALLBACK_URL } from "@/lib/constants/ai-expert-system";

type PaymentModalProps = {
  open: boolean;
  onClose: () => void;
};

export function PaymentModal({ open, onClose }: PaymentModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Оформление оплаты программы"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        aria-label="Закрыть"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-[1.5rem] bg-card shadow-[0_28px_80px_-24px_rgb(16_24_32/0.65)] sm:rounded-[1.75rem]">
        <div className="flex items-center justify-between gap-3 border-b border-border/70 px-5 py-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
              Оплата
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              Персональная AI-система для эксперта
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-warm/70"
            aria-label="Закрыть окно оплаты"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3 sm:px-5 sm:py-4">
          <PaymentWidgetFrame minHeight={420} />
          <p className="mt-3 px-2 pb-2 text-center text-xs leading-relaxed text-muted">
            Если форма не открылась,{" "}
            <a
              href={AI_EXPERT_PAYMENT_FALLBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              перейдите на страницу оплаты
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
