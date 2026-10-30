import { SiteImage } from "@/components/ui/site-image";
import { AI_EXPERT_PROMO_IMAGE } from "@/lib/constants/ai-expert-system";

/**
 * Промо-баннер 1024×682 — по ширине колонки, без лишних полей сверху/снизу.
 */
export function HeroMedia() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-chocolate/10 bg-[#0b1a2e] shadow-card">
      <SiteImage
        src={AI_EXPERT_PROMO_IMAGE}
        alt="Персональная AI-система для эксперта — 15 000 ₽. Три личных плагина, Сплит и беспроцентная рассрочка"
        width={1024}
        height={682}
        priority
        fetchPriority="high"
        className="h-auto w-full"
        sizes="(max-width: 1024px) 100vw, 520px"
      />
    </div>
  );
}
