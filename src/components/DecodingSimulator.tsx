"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { decodingSteps } from "@/data/siteContent";

export function DecodingSimulator() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[#080C18] p-5 shadow-2xl shadow-black/30">
      <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="mono-token text-xs text-[#C9A227]">Decoding Simulator</p>
          <h3 className="mt-1 text-xl font-bold text-white">LLM 正在生成检索轨迹</h3>
        </div>
        <Search className="text-[#8C1515]" size={22} />
      </div>
      <div className="grid gap-3">
        {decodingSteps.map((step, index) => (
          <motion.div
            key={step.label}
            className="rounded-2xl border border-white/9 bg-white/[0.04] p-4"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 }}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <span className="mono-token min-w-36 text-sm font-semibold text-[#C9A227]">{step.label}</span>
              <span className="text-sm leading-7 text-white/72">{step.content}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
