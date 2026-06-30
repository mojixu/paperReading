"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { gripFlow, traditionalRag } from "@/data/siteContent";
import { SectionHeading } from "./SectionHeading";

function FlowCard({
  title,
  steps,
  notes,
  tone,
}: {
  title: string;
  steps: string[];
  notes: string[];
  tone: "red" | "green";
}) {
  const isGrip = tone === "green";
  return (
    <div className="rounded-[24px] border border-[#111827]/10 bg-white/76 p-5 shadow-xl shadow-[#111827]/5">
      <div className="mb-5 flex items-center gap-3">
        <span
          className={`inline-flex size-11 items-center justify-center rounded-2xl ${
            isGrip ? "bg-[#10B981]/10 text-[#047857]" : "bg-[#8C1515]/10 text-[#8C1515]"
          }`}
        >
          {isGrip ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
        </span>
        <h3 className="text-xl font-bold text-[#111827]">{title}</h3>
      </div>

      <div className="grid gap-3">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`min-h-11 flex-1 rounded-2xl border px-4 py-3 text-sm font-semibold ${
                isGrip ? "border-[#10B981]/20 bg-[#10B981]/6" : "border-[#8C1515]/16 bg-[#8C1515]/5"
              }`}
            >
              {step}
            </div>
            {index < steps.length - 1 ? <span className="text-[#9CA3AF]">↓</span> : null}
          </div>
        ))}
      </div>

      <ul className="mt-6 grid gap-2 text-sm leading-7 text-[#4B5563]">
        {notes.map((note) => (
          <li key={note} className="flex gap-2">
            <span className={isGrip ? "text-[#059669]" : "text-[#8C1515]"}>•</span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProblemComparison() {
  return (
    <section id="problem" className="anchor-offset bg-[#F3F0E8] py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Problem"
          title="为什么一次性检索不够？"
          subtitle="传统 RAG 假设模型一开始就知道自己需要什么信息；但复杂问题的信息缺口往往是在推理过程中逐步显现。"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {[traditionalRag, gripFlow].map((flow, index) => (
            <motion.div
              key={flow.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <FlowCard {...flow} tone={index === 0 ? "red" : "green"} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 rounded-[24px] border-l-4 border-[#8C1515] bg-white px-6 py-5 text-lg leading-9 text-[#111827] shadow-lg shadow-[#111827]/5">
          GRIP 关注的不是单纯提高检索器召回率，而是让模型学习
          <strong className="text-[#8C1515]">“信息需求管理”</strong>。
        </div>
      </div>
    </section>
  );
}
