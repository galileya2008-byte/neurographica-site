import { SiteImage } from "@/components/ui/site-image";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";

export function FinalCta() {
  return (
    <Section tone="warm">
      <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-card">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
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
          </div>

          <div className="relative min-h-[280px] lg:min-h-full">
            <SiteImage
              src="/images/galina/with-pavel-piskarev.png"
              alt={`${siteConfig.expert} с Павлом Пискарёвым, создателем метода нейрографики`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-6 text-white">
              <p className="text-sm uppercase tracking-[0.16em] text-white/80">
                Профессиональное обучение
              </p>
              <p className="mt-1 font-display text-xl">
                Создатель метода — Павел Пискарёв
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
