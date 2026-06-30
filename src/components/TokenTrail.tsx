"use client";

import { motion } from "framer-motion";

const trail = [
  { label: "Question", tone: "neutral" },
  { label: "[INTERMEDIARY]", tone: "blue" },
  { label: "[RETRIEVE]", tone: "red" },
  { label: "Evidence", tone: "neutral" },
  { label: "[ANSWER]", tone: "gold" },
  { label: "[SOLVED]", tone: "green" },
];

const toneClass: Record<string, string> = {
  neutral: "border-white/15 bg-white/7 text-white/78",
  blue: "border-[#3B82F6]/45 bg-[#3B82F6]/12 text-[#BFDBFE]",
  red: "border-[#8C1515]/70 bg-[#8C1515]/22 text-white token-glow-red",
  gold: "border-[#C9A227]/55 bg-[#C9A227]/14 text-[#FEF3C7]",
  green: "border-[#10B981]/60 bg-[#10B981]/15 text-[#BBF7D0] token-glow-green",
};

export function TokenTrail() {
  return (
    <div className="w-full overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
        {trail.map((item, index) => (
          <motion.div
            key={item.label}
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.16, duration: 0.45 }}
          >
            <span
              className={`inline-flex min-h-11 items-center justify-center rounded-full border px-4 text-center text-xs font-semibold sm:text-sm ${
                item.label.startsWith("[") ? "mono-token" : ""
              } ${toneClass[item.tone]}`}
            >
              {item.label}
            </span>
            {index < trail.length - 1 ? (
              <motion.span
                className="hidden h-px w-8 bg-gradient-to-r from-white/25 to-[#C9A227]/70 sm:block"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.16 + 0.16, duration: 0.35 }}
              />
            ) : null}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
