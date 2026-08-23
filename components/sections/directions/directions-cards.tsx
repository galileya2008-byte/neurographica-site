"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { practiceRequests } from "@/config/site";
import { Section, SectionHeader } from "@/components/layout/section";

export function DirectionsCards() {
  return (
    <Section lines="right">
      <SectionHeader
        eyebrow="Практика по запросу"
        title="Выберите практику по своему запросу"
        description="Начните с того, что откликается прямо сейчас — от знакомства с методом до работы с целями, телом и отношениями."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {practiceRequests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
          >
            <Link
              href={`/masterclasses?direction=${request.directionId}`}
              className="group flex h-full flex-col rounded-3xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-chocolate/25 hover:shadow-card"
            >
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
