"use client";

import { motion } from "framer-motion";
import { Code2, GitBranch, ShieldCheck } from "lucide-react";
import { researchDirections, researchFitCards } from "@/data/siteContent";
import { GlassCard } from "./GlassCard";
import { SectionHeading } from "./SectionHeading";

const icons = [Code2, GitBranch, ShieldCheck];

export function ResearchFit() {
  return (
    <section id="about" className="section-padding bg-[#F8F5EF]">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Research Fit"
          title="为什么契合智能化软件工程？"
          subtitle="软件工程智能体面对的不是静态题库，而是持续变化的代码、文档、Issue、PR、日志和依赖版本。"
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {researchFitCards.map((card, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <GlassCard className="h-full">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#8C1515]/8 text-[#8C1515]">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-[#111827]">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#4B5563]">{card.body}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 rounded-[24px] border border-[#111827]/10 bg-white p-6 shadow-lg shadow-[#111827]/5">
          <p className="mb-5 text-sm font-semibold text-[#8C1515]">Possible Research Directions</p>
          <div className="grid gap-3 md:grid-cols-2">
            {researchDirections.map((item) => (
              <div key={item} className="rounded-2xl bg-[#F3F0E8] px-4 py-3 text-sm leading-7 text-[#374151]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
