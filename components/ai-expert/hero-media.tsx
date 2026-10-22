"use client";

import { SiteImage } from "@/components/ui/site-image";
import { AI_EXPERT_PROMO_IMAGE } from "@/lib/constants/ai-expert-system";

/** Исходник промо: 1024×682 */
const PROMO_ASPECT = "aspect-[1024/682]";

/**
 * Промо-баннер программы: актуальная цена, плагины и способы оплаты.
 * Показываем целиком, без обрезки по краям.
 */
export function HeroMedia() {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-chocolate/10 bg-[#0b1a2e] shadow-card">
      <div className={`relative w-full ${PROMO_ASPECT}`}>
        <SiteImage
          src={AI_EXPERT_PROMO_IMAGE}
          alt="Персональная AI-система для эксперта — 10 990 ₽. Три личных плагина, Сплит и беспроцентная рассрочка"
          fill
          priority
          fetchPriority="high"
          className="object-contain object-center"
          sizes="(max-width: 1024px) 100vw, 560px"
        />
      </div>
    </div>
  );
}
