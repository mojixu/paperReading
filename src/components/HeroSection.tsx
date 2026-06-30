"use client";

import { ArrowDown, Network, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { applicant } from "@/data/siteContent";
import { TokenTrail } from "./TokenTrail";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0B1020] pt-16 text-white"
    >
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(140,21,21,0.35),transparent_30%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_28%),linear-gradient(135deg,#0B1020_0%,#111827_55%,#05070D_100%)]" />
      <div className="absolute left-[12%] top-[20%] size-2 rounded-full bg-[#C9A227]/80 shadow-[0_0_36px_rgba(201,162,39,0.7)]" />
      <div className="absolute right-[18%] top-[28%] size-2 rounded-full bg-[#3B82F6]/70 shadow-[0_0_34px_rgba(59,130,246,0.55)]" />
      <div className="absolute bottom-[18%] left-[22%] size-2 rounded-full bg-[#10B981]/65 shadow-[0_0_32px_rgba(16,185,129,0.45)]" />

      <div className="section-shell relative z-10 grid items-center gap-12 py-20 lg:grid-cols-[1fr_0.85fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/78">
            <Sparkles size={16} className="text-[#C9A227]" />
            Interactive Research Reading Portfolio
          </div>
          <p className="mono-token mb-3 text-sm text-[#C9A227]">Retrieval as Generation</p>
          <h1 className="academic-heading max-w-3xl text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            GRIP Insight
          </h1>
          <p className="mt-5 text-2xl font-medium text-white/88">从“被动检索”到“自触发信息规划”</p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
            本页面基于论文《Retrieval as Generation: A Unified Framework with Self-Triggered Information Planning》，
            以交互式方式重构其研究动机、方法框架、实验发现与个人思考。
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#overview"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8C1515] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#8C1515]/25 transition hover:bg-[#A51C1C]"
            >
              进入阅读报告
              <ArrowDown size={16} />
            </a>
            <a
              href="#method"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#C9A227]/70 hover:bg-white/12"
            >
              查看方法框架
              <Network size={16} />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="dark-glass-card rounded-[28px] p-5"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.7 }}
        >
          <TokenTrail />
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["Applicant", applicant.name],
              ["Direction", applicant.direction],
              ["Focus", "RAG / Dynamic Knowledge / Planning"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[18px] border border-white/10 bg-white/[0.04] p-4">
                <p className="mono-token text-xs text-white/45">{label}</p>
                <p className="mt-2 text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
          <blockquote className="mt-6 border-l-2 border-[#C9A227] pl-4 text-sm leading-7 text-white/70">
            The future of RAG is not retrieving more, but knowing when and why to retrieve.
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
