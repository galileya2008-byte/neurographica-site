import Link from "next/link";
import { SiteImage } from "@/components/ui/site-image";
import { engagementConfig } from "@/config/engagement";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { CurvedLines } from "@/components/decor/curved-lines";
import { Section } from "@/components/layout/section";

export function FinalCta() {
  return (
    <Section tone="warm" lines="right">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-chocolate/10 bg-[linear-gradient(135deg,_rgb(252_250_246)_0%,_rgb(235_228_216/0.55)_100%)] shadow-card">
        <CurvedLines variant="cta" className="opacity-70" />
        <div className="relative grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 lg:p-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              Следующий шаг
            </p>
            <h2 className="mt-4 text-balance text-3xl md:text-4xl lg:text-5xl">
              Начните с намерения — придите к действию
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Выберите мастер-класс или программу, которая откликается вашему запросу.
              Оплата и доступ к материалам — на платформе GetCourse.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/masterclasses" size="lg">
                Выбрать мастер-класс
              </Button>
              <Button href="/contacts" variant="secondary" size="lg">
                Задать вопрос
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted">
              <Link href="/play" className="font-medium text-accent underline-offset-4 hover:underline">
                Мини-практика «{engagementConfig.game.title}»
              </Link>
              {" "}— промокод {engagementConfig.course.discountLabel} на{" "}
              {engagementConfig.course.name}
            </p>
          </div>

          <div className="relative min-h-[280px] lg:min-h-full">
            <SiteImage
              src="/images/galina/with-pavel-piskarev.png"
              alt={`${siteConfig.expert} с Павлом Пискарёвым, создателем метода нейрографики`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgb(23_20_17/0.62)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-accent-foreground md:p-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gold">
                Профессиональное обучение
              </p>
              <p className="mt-2 font-display text-xl leading-snug">
                Создатель метода —{" "}
                <a
                  href={siteConfig.methodAuthor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-gold/60 underline-offset-4 transition hover:decoration-gold"
                >
                  {siteConfig.methodAuthor.name}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
