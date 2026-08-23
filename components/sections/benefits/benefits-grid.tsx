"use client";

import { motion } from "framer-motion";
import { benefits } from "@/config/site";
import { Section, SectionHeader } from "@/components/layout/section";

export function BenefitsGrid() {
  return (
    <Section tone="warm">
      <SectionHeader
        eyebrow="Почему можно доверять"
        title="Опыт, метод и профессиональный подход"
        description="Более 17 лет онлайн-работы, сотни живых занятий и последовательное развитие как специалиста."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {benefits.map((item, index) => (
          <motion.article
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft"
          >
            <p className="font-display text-3xl text-accent">{item.value}</p>
            <h3 className="mt-2 text-lg">{item.label}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
