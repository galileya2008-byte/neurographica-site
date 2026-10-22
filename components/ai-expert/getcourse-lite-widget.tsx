"use client";

import { useEffect, useRef, useState } from "react";
import {
  AI_EXPERT_CHECKOUT_URL,
  AI_EXPERT_WIDGET_SCRIPT_ID,
  AI_EXPERT_WIDGET_SCRIPT_SRC,
} from "@/lib/constants/ai-expert-system";

/**
 * Официальный lite-виджет GetCourse.
 * Подгружается только когда блок попадает в зону видимости — не тормозит первый экран.
 */
export function GetcourseLiteWidget() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let scriptEl: HTMLScriptElement | null = null;

    const mount = () => {
      if (cancelled || host.dataset.gcMounted === "1") return;
      host.dataset.gcMounted = "1";
      host.replaceChildren();

      scriptEl = document.createElement("script");
      scriptEl.id = AI_EXPERT_WIDGET_SCRIPT_ID;
      scriptEl.src = AI_EXPERT_WIDGET_SCRIPT_SRC;
      scriptEl.async = true;

      const start = () => {
        if (cancelled) return;
        document.dispatchEvent(
          new Event(`StartWidget${AI_EXPERT_WIDGET_SCRIPT_ID}`),
        );
        setReady(true);
      };

      scriptEl.addEventListener("load", start);
      scriptEl.addEventListener("error", () => {
        if (!cancelled) setFailed(true);
      });

      host.appendChild(scriptEl);

      // На случай, если скрипт уже в кэше и load не сработает
      window.setTimeout(() => {
        if (!cancelled && host.querySelector("iframe")) {
          setReady(true);
        }
      }, 2500);
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          mount();
          observer?.disconnect();
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(host);

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="w-full">
      <div
        ref={hostRef}
        className="min-h-[120px] w-full overflow-hidden rounded-xl"
        aria-busy={!ready && !failed}
      />
      {!ready && !failed ? (
        <p className="mt-2 text-center text-xs text-muted">
          Загрузка формы оплаты…
        </p>
      ) : null}
      {failed ? (
        <p className="mt-2 text-center text-sm text-muted">
          Не удалось встроить форму.{" "}
          <a
            href={AI_EXPERT_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            Открыть оплату
          </a>
        </p>
      ) : null}
    </div>
  );
}
