"use client";

import { useMemo, useState } from "react";
import { interpolateBudget, metrics } from "@/data/metrics";

export function BudgetSlider() {
  const [budget, setBudget] = useState(3);
  const updateBudget = (value: string) => setBudget(Number(value));
  const score = useMemo(
    () => interpolateBudget(budget, metrics.budget3Score, metrics.budget10Score),
    [budget],
  );
  const retrievals = useMemo(
    () => interpolateBudget(budget, metrics.budget3Retrievals, metrics.budget10Retrievals),
    [budget],
  );

  return (
    <div className="rounded-[24px] border border-[#111827]/10 bg-white p-6 shadow-lg shadow-[#111827]/5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-[#8C1515]">Budget Adaptivity Slider</p>
          <h3 className="mt-2 text-2xl font-bold text-[#111827]">模型不会机械耗尽预算</h3>
        </div>
        <div className="mono-token rounded-2xl bg-[#0B1020] px-4 py-2 text-white">B = {budget}</div>
      </div>

      <input
        type="range"
        min={3}
        max={10}
        step={1}
        value={budget}
        onInput={(event) => updateBudget(event.currentTarget.value)}
        onChange={(event) => updateBudget(event.currentTarget.value)}
        className="mt-7 h-2 w-full cursor-pointer accent-[#8C1515]"
        aria-label="检索预算"
      />

      <div className="mt-4 grid grid-cols-4 gap-2">
        {[3, 5, 7, 10].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setBudget(value)}
            className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
              budget === value
                ? "bg-[#8C1515] text-white shadow-lg shadow-[#8C1515]/20"
                : "bg-[#F3F0E8] text-[#4B5563] hover:bg-[#E8E1D6]"
            }`}
          >
            B={value}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-[#F3F0E8] p-4">
          <p className="text-sm text-[#6B7280]">Estimated Score</p>
          <p className="mono-token mt-2 text-3xl font-bold text-[#111827]">{score.toFixed(1)}</p>
        </div>
        <div className="rounded-2xl bg-[#F3F0E8] p-4">
          <p className="text-sm text-[#6B7280]">Actual Retrievals</p>
          <p className="mono-token mt-2 text-3xl font-bold text-[#111827]">{retrievals.toFixed(2)}</p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-[#4B5563]">
        The model does not exhaust the budget mechanically. 它根据问题难度自适应检索，在需要时检索，在足够时停止。
      </p>
    </div>
  );
}
