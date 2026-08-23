import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CurvedLines } from "@/components/decor/curved-lines";
import { Button } from "@/components/ui/button";
import { MarkdownContent } from "@/components/ui/markdown-content";
import { SiteImage } from "@/components/ui/site-image";
import { materialTypeLabels, type Material } from "@/types/material";

type MaterialPageViewProps = {
  material: Material;
};

export function MaterialPageView({ material }: MaterialPageViewProps) {
  return (
    <article className="relative overflow-hidden section-padding pt-32">
      <CurvedLines variant="section-right" className="opacity-60" />
      <Container size="narrow" className="relative z-10">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Полезные материалы", href: "/materials" },
            { label: material.title },
          ]}
        />

        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
          {materialTypeLabels[material.type]}
        </p>
        <h1 className="mt-3 text-balance text-4xl md:text-5xl">{material.title}</h1>
        <p className="mt-4 text-sm text-muted">
          {formatDate(material.publishedAt)} · {material.readingMinutes} мин чтения
        </p>
        <p className="mt-6 text-lg leading-relaxed text-muted">{material.excerpt}</p>

        {material.cover ? (
          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[2rem] shadow-card">
            <SiteImage
              src={material.cover}
              alt={material.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
        ) : null}

        <MarkdownContent content={material.content} className="mt-10" />

        <div className="mt-12 flex flex-col gap-3 border-t border-border/70 pt-8 sm:flex-row">
          <Button href="/materials" variant="secondary">
            Все материалы
          </Button>
          <Button href="/masterclasses">Выбрать мастер-класс</Button>
        </div>
      </Container>
    </article>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}
