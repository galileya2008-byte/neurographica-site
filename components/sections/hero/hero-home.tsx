"use client";

import { motion } from "framer-motion";
import { CurvedLines } from "@/components/decor/curved-lines";
import { SiteImage } from "@/components/ui/site-image";
import { philosophyQuote, siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function HeroHome() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_88%_-8%,_rgb(228_238_232/0.95)_0%,_transparent_58%),radial-gradient(ellipse_55%_45%_at_0%_100%,_rgb(154_123_85/0.12)_0%,_transparent_48%),linear-gradient(180deg,_rgb(246_243_238)_0%,_transparent_70%)]" />
      <CurvedLines variant="hero" className="-z-[5] opacity-90" />

      <Container className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-5 font-display text-2xl italic leading-tight text-accent md:text-3xl">
            {siteConfig.brand}
          </p>
          <h1 className="text-balance text-4xl leading-[1.12] md:text-5xl lg:text-[3.65rem]">
            Осознанные изменения начинаются с первого шага.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            Авторские мастер-классы и программы, которые помогают работать с
            намерением, планированием и внутренней ясностью через метод
            нейрографики.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/masterclasses" size="lg">
              Выбрать мастер-класс
            </Button>
            <Button href="/programs" variant="secondary" size="lg">
              Посмотреть программы
            </Button>
          </div>

          <blockquote className="mt-12 max-w-xl border-l border-gold/50 pl-5 text-base italic leading-relaxed text-foreground/75">
            {philosophyQuote.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </blockquote>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-card">
            <div className="relative aspect-[4/5]">
              <SiteImage
                src="/images/galina/portrait-premium.png"
                alt={`${siteConfig.expert} — инструктор нейрографики`}
                fill
                priority
                className="object-cover object-[center_20%]"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgb(23_20_17/0.28)_100%)]" />
            </div>
          </div>
          <p className="mt-4 text-sm tracking-[0.04em] text-muted">
            {siteConfig.expert}
            <span className="mx-2 text-gold">·</span>
            17 лет онлайн · 1000+ мастер-классов
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
