"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { applicant } from "@/data/siteContent";

export function ConclusionSection() {
  return (
    <section className="relative overflow-hidden bg-[#0B1020] py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(140,21,21,0.32),transparent_34%),linear-gradient(135deg,#0B1020,#05070D)]" />
      <div className="section-shell relative z-10">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mono-token text-sm text-[#C9A227]">Less Retrieval, Better Planning.</p>
          <h2 className="academic-heading mt-4 text-4xl font-bold leading-tight sm:text-6xl">
            检索不在于多，而在于会规划。
          </h2>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-9 text-white/72">
            GRIP 给 RAG 的启示是：模型不应只是被动接收外部知识，而应主动管理自己的信息需求。
            在智能化软件工程场景中，这种能力可以进一步扩展到代码理解、缺陷定位、文档问答和软件智能体决策。
          </p>
          <a
            href="#hero"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
          >
            回到顶部
            <ArrowUpRight size={16} />
          </a>
        </motion.div>

        <div className="mt-12 grid gap-4 rounded-[24px] border border-white/10 bg-white/[0.05] p-5 text-sm text-white/72 sm:grid-cols-4">
          <p>{applicant.name}</p>
          <p>{applicant.school}</p>
          <p>{applicant.direction}</p>
          <p className="break-all">{applicant.email}</p>
        </div>
      </div>
    </section>
  );
}
