"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { directions } from "@/config/site";
import { Section, SectionHeader } from "@/components/layout/section";

export function DirectionsCards() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Направления"
        title="Выберите запрос, с которого хотите начать"
        description="Каждое направление — отдельный маршрут к осознанным изменениям через практику нейрографики."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {directions.map((direction, index) => (
          <motion.div
            key={direction.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
          >
            <Link
              href={`/masterclasses?direction=${direction.id}`}
              className="group flex h-full flex-col rounded-3xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-card"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 className="text-xl">{direction.label}</h3>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-accent opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </div>
              <p className="text-sm leading-relaxed text-muted">{direction.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
