"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  /** Kirish yoʻnalishi */
  from?: Direction;
  delay?: number;
  duration?: number;
  /** Boshlangʻich masshtab (scale animatsiyasi uchun) */
  scaleFrom?: number;
  /** Ekranning qancha qismi koʻringanda ishga tushsin */
  amount?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "article";
};

const OFFSET = 44;

function offsetFor(from: Direction) {
  switch (from) {
    case "up":
      return { y: OFFSET, x: 0 };
    case "down":
      return { y: -OFFSET, x: 0 };
    case "left":
      return { x: -OFFSET, y: 0 };
    case "right":
      return { x: OFFSET, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

/** Scrollda elegant tarzda paydo boʻluvchi wrapper */
export default function Reveal({
  children,
  from = "up",
  delay = 0,
  duration = 0.9,
  scaleFrom = 1,
  amount = 0.25,
  className = "",
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const { x, y } = offsetFor(from);
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = {
    hidden: { opacity: 0, x, y, scale: scaleFrom, filter: "blur(6px)" },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}
