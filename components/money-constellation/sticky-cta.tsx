"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { BuyButton } from "@/components/product/buy-button";
import {
  MONEY_CONSTELLATION_META,
  MONEY_CONSTELLATION_PRICE_LABEL,
} from "@/lib/constants/money-constellation";

type StickyCtaProps = {
  product: Product;
};

export function StickyCta({ product }: StickyCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const pastHero = window.scrollY > 480;
      const join = document.getElementById("join");
      const reachedJoin = join
        ? join.getBoundingClientRect().top < window.innerHeight - 64
        : false;
      setVisible(pastHero && !reachedJoin);
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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-chocolate/10 bg-background/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-soft backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-lg leading-none text-accent">
            {MONEY_CONSTELLATION_PRICE_LABEL}
          </p>
          <p className="mt-1 truncate text-[11px] leading-none text-muted">
            {MONEY_CONSTELLATION_META}
          </p>
        </div>
        <BuyButton
          product={product}
          label="Смотреть"
          size="sm"
          className="shrink-0"
        />
      </div>
    </div>
  );
}
