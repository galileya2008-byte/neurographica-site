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
  const isPodcast = material.type === "podcast";
  const isDirectAudio = material.mediaUrl
    ? /\.(mp3|m4a|wav|ogg)(?:\?.*)?$/i.test(material.mediaUrl)
    : false;

  return (
    <article className="relative overflow-hidden section-padding pt-32">
      <CurvedLines variant="section-right" className="opacity-60" />
      <Container size="narrow" className="relative z-10">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Статьи и подкасты", href: "/materials" },
            { label: material.title },
          ]}
        />

        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
          {materialTypeLabels[material.type]}
        </p>
        <h1 className="mt-3 text-balance text-4xl md:text-5xl">{material.title}</h1>
        <p className="mt-4 text-sm text-muted">
          {formatDate(material.publishedAt)} · {material.readingMinutes} мин{" "}
          {isPodcast ? "прослушивания" : "чтения"}
        </p>
        <p className="mt-6 text-lg leading-relaxed text-muted">{material.excerpt}</p>

        {material.cover ? (
          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[1.75rem] shadow-card">
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

        {isPodcast && material.mediaUrl ? (
          <div className="mt-8 rounded-[1.5rem] border border-border bg-card/85 p-5 shadow-soft">
            <p className="text-sm font-medium">Слушать выпуск</p>
            {isDirectAudio ? (
              <audio controls preload="metadata" className="mt-4 w-full">
                <source src={material.mediaUrl} />
                Ваш браузер не поддерживает аудиоплеер.
              </audio>
            ) : (
              <div className="mt-4">
                <Button href={material.mediaUrl}>Открыть выпуск</Button>
              </div>
            )}
          </div>
        ) : null}

        <MarkdownContent content={material.content} className="mt-10" />

        <div className="mt-12 flex flex-col gap-3 border-t border-border/70 pt-8 sm:flex-row">
          <Button href="/materials" variant="secondary">
            Все статьи и подкасты
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
