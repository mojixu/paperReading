"use client";

import { motion } from "framer-motion";
import { FileText, HelpCircle, Lightbulb } from "lucide-react";
import { overviewCards, paper } from "@/data/siteContent";
import { GlassCard } from "./GlassCard";
import { SectionHeading } from "./SectionHeading";

const icons = [FileText, HelpCircle, Lightbulb];

export function PaperOverview() {
  return (
    <section id="overview" className="anchor-offset section-padding bg-[#F8F5EF]">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Overview"
          title="20 秒读懂这篇论文"
          subtitle="论文的核心并不是让模型检索更多，而是把检索动作变成可学习、可解释、可终止的生成行为。"
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {overviewCards.map((card, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08 }}
              >
                <GlassCard className="group h-full transition duration-300 hover:-translate-y-1 hover:border-[#8C1515]/28 hover:shadow-2xl">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="mono-token text-sm font-semibold text-[#8C1515]">{card.index}</span>
                    <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[#8C1515]/8 text-[#8C1515]">
                      <Icon size={20} />
                    </span>
                  </div>
                  <h3 className="academic-heading text-2xl font-bold text-[#111827]">{card.title}</h3>
                  <div className="mt-5 space-y-3 text-base leading-8 text-[#374151]">
                    {card.body.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  {index === 0 ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {paper.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-[#0B1020]/6 px-3 py-1 text-xs text-[#111827]/72">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
