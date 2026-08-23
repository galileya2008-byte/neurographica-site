"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { philosophyQuote, siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function HeroHome() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_#e8f0ec_0%,_transparent_45%),radial-gradient(circle_at_bottom_left,_#f5f0e8_0%,_transparent_40%)]" />

      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-accent">
            Нейрографика · онлайн-обучение
          </p>
          <h1 className="text-balance text-4xl leading-[1.1] md:text-5xl lg:text-6xl">
            {siteConfig.brand}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            С {siteConfig.expert} — осознанный инструмент для работы с целями,
            намерением и внутренней ясностью. Без обещаний «волшебных таблеток» —
            через практику, структуру и движение к действию.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/masterclasses" size="lg">
              Выбрать мастер-класс
            </Button>
            <Button href="/programs" variant="secondary" size="lg">
              Посмотреть программы
            </Button>
          </div>

          <blockquote className="mt-10 max-w-xl border-l-2 border-accent/30 pl-5 text-base italic leading-relaxed text-foreground/80">
            {philosophyQuote.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </blockquote>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card">
            <Image
              src="/images/galina/portrait-premium.png"
              alt={`${siteConfig.expert} — инструктор нейрографики`}
              fill
              priority
              className="object-cover object-[center_20%]"
              sizes="(max-width: 1024px) 100vw, 520px"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border/60 bg-white/90 px-5 py-4 shadow-soft backdrop-blur-sm md:block">
            <p className="font-display text-lg text-foreground">17 лет онлайн</p>
            <p className="text-sm text-muted">1000+ мастер-классов</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
