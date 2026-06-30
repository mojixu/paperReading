"use client";

import { controlTokens } from "@/data/siteContent";
import { ControlTokenCard } from "./ControlTokenCard";
import { DecodingSimulator } from "./DecodingSimulator";
import { SectionHeading } from "./SectionHeading";

export function MethodTimeline() {
  return (
    <section id="method" className="anchor-offset bg-[#0B1020] py-24 text-white">
      <div className="section-shell">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase text-[#C9A227]">Method</p>
          <h2 className="academic-heading text-3xl font-bold text-white sm:text-4xl">
            用生成式控制接口管理检索行为
          </h2>
          <p className="mt-4 text-base leading-8 text-white/68 sm:text-lg">
            GRIP 并不是把检索器内化进 LLM，而是让 LLM 学会何时调用、如何调用、何时停止调用检索器。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {controlTokens.map((token, index) => (
            <ControlTokenCard key={token.token} {...token} index={index} />
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <SectionHeading
              eyebrow="Trajectory"
              title="检索成为生成动作"
              subtitle="每个控制符都对应一个可观测决策：判断当前状态、触发检索、整合证据、终止回答。"
            />
            <div className="rounded-[22px] border-l-4 border-[#8C1515] bg-white/[0.06] p-5 text-base leading-8 text-white/72">
              这种设计的重点不是让语言模型记住更多知识，而是让模型学会管理自己的信息需求：判断缺什么、如何查、何时停。
            </div>
          </div>
          <DecodingSimulator />
        </div>
      </div>
    </section>
  );
}
