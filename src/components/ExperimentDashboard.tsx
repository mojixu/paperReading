"use client";

import { BarChart3, Gauge, LineChart, Percent } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { metrics, performanceData, retrievalData } from "@/data/metrics";
import { BudgetSlider } from "./BudgetSlider";
import { MetricCard } from "./MetricCard";
import { SectionHeading } from "./SectionHeading";

export function ExperimentDashboard() {
  return (
    <section id="experiments" className="anchor-offset bg-[#F3F0E8] py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Experiments"
          title="更少检索，更强规划"
          subtitle="GRIP 的实验价值不只在分数，更在于它以更低检索成本接近强模型水平。"
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Average Score"
            value={metrics.gripAverageScore}
            description="GRIP 在五个 QA 基准上的平均表现。"
            icon={BarChart3}
          />
          <MetricCard
            label="Average Retrievals"
            value={metrics.gripAverageRetrievals}
            description="平均每个问题仅触发约 1.24 次检索。"
            icon={Gauge}
          />
          <MetricCard
            label="Fewer Retrievals"
            value={metrics.fewerRetrievalsPercent}
            suffix="%"
            description="相较 R1-Searcher 的检索次数降低比例。"
            icon={Percent}
          />
          <MetricCard
            label="Performance Level"
            value="≈ GPT-4o"
            description="41.0 接近 GPT-4o 的 41.4。"
            icon={LineChart}
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[24px] border border-[#111827]/10 bg-white p-6 shadow-lg shadow-[#111827]/5">
            <h3 className="mb-5 text-xl font-bold text-[#111827]">Performance Score</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} layout="vertical" margin={{ left: 16, right: 18 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                  <XAxis type="number" domain={[0, 45]} />
                  <YAxis type="category" dataKey="name" width={80} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#8C1515" radius={[0, 10, 10, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#4B5563]">
              GRIP 平均分达到 41.0，接近 GPT-4o 的 41.4，并超过多个开源 RAG 基线。
            </p>
          </div>

          <div className="rounded-[24px] border border-[#111827]/10 bg-white p-6 shadow-lg shadow-[#111827]/5">
            <h3 className="mb-5 text-xl font-bold text-[#111827]">Retrieval Efficiency</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={retrievalData} margin={{ top: 8, right: 18, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="retrievals" fill="#C9A227" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#4B5563]">
              更少检索没有牺牲性能，说明 GRIP 学到的是任务感知的检索深度，而不是机械式深搜堆叠。
            </p>
          </div>
        </div>

        <div className="mt-8">
          <BudgetSlider />
        </div>
      </div>
    </section>
  );
}
