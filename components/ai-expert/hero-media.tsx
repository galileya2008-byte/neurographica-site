"use client";

import { SiteImage } from "@/components/ui/site-image";
import { AI_EXPERT_PROMO_IMAGE } from "@/lib/constants/ai-expert-system";

/**
 * Промо-баннер программы: актуальная цена, плагины и способы оплаты.
 */
export function HeroMedia() {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-chocolate/10 bg-[#0b1a2e] shadow-card">
      <div className="relative aspect-[4/5] w-full sm:aspect-square lg:aspect-[4/5]">
        <SiteImage
          src={AI_EXPERT_PROMO_IMAGE}
          alt="Персональная AI-система для эксперта — 10 990 ₽. Три личных плагина, Сплит и беспроцентная рассрочка"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 520px"
        />
      </div>
    </div>
  );
}
