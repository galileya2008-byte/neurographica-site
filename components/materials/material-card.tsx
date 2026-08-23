import Link from "next/link";
import { materialTypeLabels, type Material } from "@/types/material";
import { SiteImage } from "@/components/ui/site-image";
import { Button } from "@/components/ui/button";

type MaterialCardProps = {
  material: Material;
};

export function MaterialCard({ material }: MaterialCardProps) {
  const href = `/materials/${material.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-chocolate/25 hover:shadow-card">
      {material.cover ? (
        <Link href={href} className="relative block aspect-[16/10] overflow-hidden">
          <SiteImage
            src={material.cover}
            alt={material.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </Link>
      ) : (
        <div className="aspect-[16/10] bg-gradient-to-br from-warm to-accent-light/60" />
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted">
          <span className="rounded-full bg-accent-light px-3 py-1 text-accent">
            {materialTypeLabels[material.type]}
          </span>
          <span>{material.readingMinutes} мин</span>
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
            Читать
          </Button>
        </div>
      </div>
    </article>
  );
}
