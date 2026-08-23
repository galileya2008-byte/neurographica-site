import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Обо мне",
  description: `Галина Оноприенко — инструктор нейрографики. 17 лет онлайн-обучения, профессиональный подход и философия осознанных изменений.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="section-padding pt-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                Обо мне
              </p>
              <h1 className="mt-4 text-4xl md:text-5xl">{siteConfig.expert}</h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Дипломированный инструктор нейрографики. Более 17 лет работы в
                онлайн-формате и более 1000 проведённых мастер-классов.
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card">
              <Image
                src="/images/galina/portrait-premium.png"
                alt={siteConfig.expert}
                fill
                className="object-cover object-[center_20%]"
                sizes="(max-width: 1024px) 100vw, 560px"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-warm">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card">
            <Image
              src="/images/galina/at-work.png"
              alt={`${siteConfig.expert} за работой`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
          <div className="space-y-5 text-muted leading-relaxed">
            <h2 className="text-3xl text-foreground">Мой подход</h2>
            <p>
              Я не обещаю волшебных таблеток. Я верю, что каждый человек способен
              стать автором собственных изменений — через намерение, планирование,
              мотивацию и осознанные действия.
            </p>
            <p>
              Работа строится вокруг внутренней ясности и движения к целям без
              мистики и эзотерических обещаний.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-muted leading-relaxed">
            <h2 className="text-3xl text-foreground">Образование и квалификация</h2>
            <p>
              Я прошла профессиональное обучение у создателя метода нейрографики —
              Павла Пискарёва — и регулярно повышаю квалификацию.
            </p>
            <p>
              Несколько раз в год обновляю профессиональные знания, чтобы давать
              актуальные и структурированные форматы обучения.
            </p>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-card">
            <Image
              src="/images/galina/with-pavel-piskarev.png"
              alt={`${siteConfig.expert} с Павлом Пискарёвым`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
