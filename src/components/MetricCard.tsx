"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useEffect } from "react";

type MetricCardProps = {
  label: string;
  value: number | string;
  suffix?: string;
  description: string;
  icon: LucideIcon;
};

export function MetricCard({ label, value, suffix = "", description, icon: Icon }: MetricCardProps) {
  const numeric = typeof value === "number";
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 20 });
  const rounded = useTransform(spring, (latest) => latest.toFixed(value === 75.8 ? 1 : 2).replace(/\.00$/, ""));

  useEffect(() => {
    if (numeric) {
      motionValue.set(value);
    }
  }, [motionValue, numeric, value]);

  return (
    <motion.div
      className="glass-card rounded-[22px] p-5"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="text-sm font-semibold text-[#6B7280]">{label}</span>
        <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-[#8C1515]/8 text-[#8C1515]">
          <Icon size={19} />
        </span>
      </div>
      <div className="mono-token text-4xl font-bold text-[#111827]">
        {numeric ? <motion.span>{rounded}</motion.span> : value}
        {suffix}
      </div>
      <p className="mt-4 text-sm leading-7 text-[#4B5563]">{description}</p>
    </motion.div>
  );
}
