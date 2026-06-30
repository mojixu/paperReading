"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { futureWork, limitations, strengths } from "@/data/siteContent";
import { SectionHeading } from "./SectionHeading";

export function CriticalReflection() {
  return (
    <section id="reflection" className="anchor-offset section-padding bg-[#F8F5EF]">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Reflection"
          title="我的批判性思考"
          subtitle="GRIP 的价值不只在于提升 QA 分数，更在于把 RAG 中隐性的检索策略显式化、可学习化、可解释化。"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div className="glass-card rounded-[24px] p-6" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold text-[#111827]">Strengths</h3>
            <ul className="mt-6 grid gap-3">
              {strengths.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-2xl bg-[#10B981]/8 px-4 py-3 text-[#374151]">
                  <Check size={17} className="text-[#059669]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div className="glass-card rounded-[24px] p-6" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}>
            <h3 className="text-2xl font-bold text-[#111827]">Limitations</h3>
            <ul className="mt-6 grid gap-3">
              {limitations.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-2xl bg-[#8C1515]/7 px-4 py-3 text-[#374151]">
                  <X size={17} className="text-[#8C1515]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <div className="mt-8 rounded-[24px] bg-[#0B1020] p-6 text-white">
          <p className="mb-5 text-sm font-semibold text-[#C9A227]">Future Work</p>
          <div className="grid gap-3 md:grid-cols-4">
            {futureWork.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm leading-7 text-white/78">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
