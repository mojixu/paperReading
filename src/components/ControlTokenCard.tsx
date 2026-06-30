"use client";

import { motion } from "framer-motion";

type ControlTokenCardProps = {
  token: string;
  label: string;
  description: string;
  color: string;
  index: number;
};

export function ControlTokenCard({ token, label, description, color, index }: ControlTokenCardProps) {
  return (
    <motion.div
      className="dark-glass-card rounded-[22px] p-5"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
    >
      <p className="mono-token text-sm font-semibold" style={{ color }}>
        {token}
      </p>
      <h3 className="mt-4 text-xl font-bold text-white">{label}</h3>
      <p className="mt-3 text-sm leading-7 text-white/66">{description}</p>
    </motion.div>
  );
}
