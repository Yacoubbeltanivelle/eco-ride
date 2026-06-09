"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}

const initial = {
  up:    { opacity: 0, y: 24 },
  left:  { opacity: 0, x: -20 },
  right: { opacity: 0, x: 20 },
  none:  { opacity: 0 },
};

const animate = {
  up:    { opacity: 1, y: 0 },
  left:  { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  none:  { opacity: 1 },
};

export default function ScrollReveal({ children, delay = 0, direction = "up", className }: Props) {
  return (
    <motion.div
      initial={initial[direction]}
      animate={animate[direction]}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
