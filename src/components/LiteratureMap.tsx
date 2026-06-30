"use client";

import { motion } from "framer-motion";
import { BookOpen, Database, Edit3, RefreshCcw } from "lucide-react";
import { literatureQuadrants } from "@/data/siteContent";
import { SectionHeading } from "./SectionHeading";

const icons = [RefreshCcw, Database, Edit3, BookOpen];

export function LiteratureMap() {
  return (
    <section id="review" className="anchor-offset bg-[#F3F0E8] py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Literature Review"
          title="大语言模型如何保持知识更新？"
          subtitle="研究焦点已经从“知识存在哪里”转向“何时写入、写多少、写到哪里、能否回滚”。"
          align="center"
        />

        <div className="relative">
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden w-64 -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-[#8C1515]/12 bg-white/90 p-5 text-center shadow-xl shadow-[#111827]/8 xl:block">
            <p className="mono-token text-xs text-[#8C1515]">Central Question</p>
            <p className="mt-3 text-sm font-semibold leading-7 text-[#111827]">
              Can we achieve deep integration, low latency, rollback ability, and large-scale updates?
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {literatureQuadrants.map((quadrant, index) => {
              const Icon = icons[index];
              return (
                <motion.article
                  key={quadrant.title}
                  className="group rounded-[24px] border border-[#111827]/10 bg-white/76 p-6 shadow-lg shadow-[#111827]/5 transition hover:-translate-y-1 hover:border-[#8C1515]/24"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  tabIndex={0}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[#8C1515]">{quadrant.cn}</p>
                      <h3 className="mt-2 text-2xl font-bold text-[#111827]">{quadrant.title}</h3>
                    </div>
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#0B1020]/7 text-[#8C1515]">
                      <Icon size={22} />
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {quadrant.traits.map((trait) => (
                      <span key={trait} className="rounded-full bg-[#F3F0E8] px-3 py-1 text-xs text-[#374151]">
                        {trait}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-4 text-sm leading-7 text-[#4B5563] md:grid-cols-2">
                    <div>
                      <p className="mb-2 font-semibold text-[#111827]">代表工作</p>
                      <p>{quadrant.works.join(" / ")}</p>
                    </div>
                    <div>
                      <p className="mb-2 font-semibold text-[#111827]">主要风险</p>
                      <p>{quadrant.risk}</p>
                    </div>
                  </div>
                  <p className="mt-4 rounded-2xl bg-[#8C1515]/6 p-4 text-sm leading-7 text-[#374151]">
                    适用场景：{quadrant.use}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
