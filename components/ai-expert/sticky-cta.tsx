"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { JoinButton } from "@/components/ai-expert/join-button";
import {
  AI_EXPERT_PRICE_LABEL,
  AI_EXPERT_STICKY_META,
} from "@/lib/constants/ai-expert-system";

const COOKIE_KEY = "ng_cookie_consent";

type StickyCtaProps = {
  product: Product;
};

export function StickyCta({ product }: StickyCtaProps) {
  const [visible, setVisible] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);

  useEffect(() => {
    const syncCookie = () => {
      try {
        setCookieOpen(!window.localStorage.getItem(COOKIE_KEY));
      } catch {
        setCookieOpen(false);
      }
    };

    syncCookie();
    window.addEventListener("ng-cookie-accepted", syncCookie);
    window.addEventListener("storage", syncCookie);
    return () => {
      window.removeEventListener("ng-cookie-accepted", syncCookie);
      window.removeEventListener("storage", syncCookie);
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const pastHero = window.scrollY > 420;
      const pricing = document.getElementById("pricing");
      const reachedPricing = pricing
        ? pricing.getBoundingClientRect().top < window.innerHeight - 72
        : false;
      setVisible(pastHero && !reachedPricing);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 z-[55] border-t border-chocolate/10 bg-background/95 px-3 py-2.5 shadow-soft backdrop-blur-md md:hidden"
      style={{
        bottom: cookieOpen
          ? "calc(3.75rem + env(safe-area-inset-bottom, 0px))"
          : "env(safe-area-inset-bottom, 0px)",
        paddingBottom: cookieOpen
          ? undefined
          : "max(0.65rem, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg leading-none text-accent">
            {AI_EXPERT_PRICE_LABEL}
          </p>
          <p className="mt-1 line-clamp-2 text-[10px] leading-tight text-chocolate">
            {AI_EXPERT_STICKY_META}
          </p>
        </div>
        <JoinButton
          product={product}
          label="Оплатить"
          size="sm"
          className="shrink-0 px-5"
        />
      </div>
    </div>
  );
}
