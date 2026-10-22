"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  AI_EXPERT_WIDGET_IFRAME_SRC,
  AI_EXPERT_WIDGET_SCRIPT_ID,
} from "@/lib/constants/ai-expert-system";
import { cn } from "@/lib/utils";

type PaymentWidgetFrameProps = {
  className?: string;
  /** Минимальная высота до ответа виджета */
  minHeight?: number;
};

function buildWidgetSrc() {
  if (typeof window === "undefined") return AI_EXPERT_WIDGET_IFRAME_SRC;

  const url = new URL(AI_EXPERT_WIDGET_IFRAME_SRC);
  url.searchParams.set("ref", document.referrer || "");
  url.searchParams.set("loc", window.location.href);

  const current = new URLSearchParams(window.location.search);
  current.forEach((value, key) => {
    if (!url.searchParams.has(key)) {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

export function PaymentWidgetFrame({
  className,
  minHeight = 320,
}: PaymentWidgetFrameProps) {
  const reactId = useId().replace(/:/g, "");
  const iframeId = `gc-ai-widget_${reactId}`;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(minHeight);
  const [src, setSrc] = useState(AI_EXPERT_WIDGET_IFRAME_SRC);

  useEffect(() => {
    setSrc(buildWidgetSrc());
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data as {
        uniqName?: string;
        height?: number;
        iframeName?: string;
      };
      if (!data || data.uniqName !== AI_EXPERT_WIDGET_SCRIPT_ID) return;
      if (!data.height || data.height < 80) return;

      const iframe = iframeRef.current;
      if (!iframe) return;

      if (data.iframeName) {
        const cutted = String(data.iframeName).split("&")[0];
        if (cutted !== iframe.name) return;
      }

      setHeight(data.height);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div
      className={cn("w-full overflow-hidden", className)}
      style={{ height }}
    >
      <iframe
        ref={iframeRef}
        id={iframeId}
        name="211"
        title="Оплата программы на GetCourse"
        src={src}
        className="211 h-full w-full border-0"
        allow="payment *"
        allowFullScreen
        data-account-id="694060"
      />
    </div>
  );
}
