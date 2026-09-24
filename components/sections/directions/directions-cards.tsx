"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { topics } from "@/config/topics";
import { Section, SectionHeader } from "@/components/layout/section";
import { getCardColorClass } from "@/lib/card-settings";
import { cn } from "@/lib/utils";

export function DirectionsCards() {
  return (
    <Section id="practice" lines="right" autumnDecor>
      <SectionHeader
        eyebrow="Практика по запросу"
        title="Выберите практику по своему запросу"
        description="Начните с того, что откликается прямо сейчас — от знакомства с методом до работы с целями, телом и отношениями."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {topics.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
          >
            <Link
              href={`/topics/${request.slug}`}
              className={cn(
                "group relative flex h-full flex-col rounded-[1.5rem] border border-chocolate/10 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-card",
                getCardColorClass(request.cardColor),
                request.badge && "pt-16",
              )}
            >
              {request.badge ? (
                <span className="absolute left-6 top-5 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-foreground shadow-soft">
                  {request.badge}
                </span>
              ) : null}
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 className="text-xl leading-snug">{request.title}</h3>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-chocolate opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </div>
              <p className="mt-auto text-sm leading-relaxed text-muted">
                {request.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
