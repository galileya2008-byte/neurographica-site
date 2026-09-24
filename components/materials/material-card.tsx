import Link from "next/link";
import { materialTypeLabels, type Material } from "@/types/material";
import { SiteImage } from "@/components/ui/site-image";
import { Button } from "@/components/ui/button";
import { getCardColorClass } from "@/lib/card-settings";
import { cn } from "@/lib/utils";

type MaterialCardProps = {
  material: Material;
};

export function MaterialCard({ material }: MaterialCardProps) {
  const href = `/materials/${material.slug}`;
  const isPodcast = material.type === "podcast";

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-chocolate/10 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-card",
        getCardColorClass(material.cardColor),
      )}
    >
      {material.cover ? (
        <Link href={href} className="relative block aspect-[16/10] overflow-hidden">
          <SiteImage
            src={material.cover}
            alt={material.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {material.badge ? (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-foreground shadow-card">
              {material.badge}
            </span>
          ) : null}
        </Link>
      ) : (
        <div className="relative aspect-[16/10] bg-[linear-gradient(135deg,_var(--color-warm),_rgb(228_238_232/0.7))]">
          {material.badge ? (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-foreground shadow-card">
              {material.badge}
            </span>
          ) : null}
        </div>
      )}

      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted">
          <span className="text-gold">{materialTypeLabels[material.type]}</span>
          <span className="text-gold">·</span>
          <span>
            {material.readingMinutes} мин {isPodcast ? "аудио" : "чтения"}
          </span>
        </div>

        <h3 className="text-xl leading-snug">
          <Link href={href} className="transition-colors hover:text-accent">
            {material.title}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {material.excerpt}
        </p>

        <div className="mt-6">
          <Button href={href} variant="secondary" size="sm">
            {isPodcast ? "Слушать" : "Читать"}
          </Button>
        </div>
      </div>
    </article>
  );
}
