"use client";

import { motion } from "framer-motion";
import { ArrowDown, BrainCircuit, GraduationCap } from "lucide-react";
import { trainingCards } from "@/data/siteContent";
import { GlassCard } from "./GlassCard";
import { SectionHeading } from "./SectionHeading";

const icons = [GraduationCap, BrainCircuit];

export function TrainingPipeline() {
  return (
    <section id="training" className="section-padding bg-[#F8F5EF]">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Training"
          title="Training the Retrieval Policy"
          subtitle="GRIP 先用结构化监督学会控制符轨迹，再用强化学习抑制过度检索并稳定终止。"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {trainingCards.map((card, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-sm font-semibold text-[#8C1515]">{card.title}</p>
                      <div className="mt-3 flex items-baseline gap-3">
                        <span className="mono-token text-5xl font-bold text-[#111827]">{card.value}</span>
                        <span className="text-sm text-[#6B7280]">{card.unit}</span>
                      </div>
                    </div>
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#0B1020]/7 text-[#8C1515]">
                      <Icon size={22} />
                    </span>
                  </div>
                  <p className="mt-5 leading-8 text-[#4B5563]">{card.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {card.items.map((item) => (
                      <span key={item} className="rounded-full border border-[#8C1515]/12 bg-[#8C1515]/6 px-3 py-1 text-xs text-[#374151]">
                        {item}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-8 grid gap-3 rounded-[24px] border border-[#111827]/10 bg-white p-5 text-center shadow-lg shadow-[#111827]/5 md:grid-cols-5 md:items-center">
          {["Structured Trajectories", "SFT", "Initial Retrieval Policy", "DAPO RL", "Efficient Planning"].map((step, index) => (
            <div key={step} className="flex flex-col items-center gap-3 md:flex-row">
              <span className="rounded-full bg-[#0B1020] px-4 py-2 text-xs font-semibold text-white">{step}</span>
              {index < 4 ? <ArrowDown className="text-[#C9A227] md:-rotate-90" size={18} /> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
