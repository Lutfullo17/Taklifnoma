"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Rings from "@/components/visuals/Rings";
import Ornament from "@/components/ui/Ornament";
import { useIntro } from "@/components/IntroContext";
import { wedding } from "@/lib/wedding";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { ready } = useIntro();
  const reduced = useReducedMotion();
  const [fallback, setFallback] = useState(false);

  // Preloader ishlamay qolsa ham intro baribir boshlanadi
  useEffect(() => {
    const t = setTimeout(() => setFallback(true), 2400);
    return () => clearTimeout(t);
  }, []);

  const start = ready || fallback;
  const animated = start && !reduced;
  const base = reduced ? 0 : 1;

  const group: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delayChildren: base, staggerChildren: 0.13 },
    },
  };

  const line: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.95, ease: EASE },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-5 py-16 sm:px-8"
    >
      <div className="flex w-full max-w-2xl flex-col items-center">
        <Rings
          animate={animated}
          parallax
          delay={0.15}
          className="w-[min(74vw,300px)] sm:w-[340px]"
        />

        <motion.div
          className="mt-4 flex w-full flex-col items-center text-center sm:mt-6"
          variants={group}
          initial={animated ? "hidden" : false}
          animate={start ? "show" : "hidden"}
        >
          <motion.p variants={line} className="eyebrow">
            {wedding.event.title}
          </motion.p>

          <motion.h1
            variants={line}
            className="mt-4 flex flex-col items-center leading-none sm:mt-5"
          >
            <span className="gold-plate font-display text-[0.95rem] font-medium tracking-[0.42em] uppercase sm:text-lg">
              {wedding.groom.lastName}
            </span>
            <span className="gold-shimmer mt-2 font-display text-[2.9rem] font-bold tracking-[0.02em] sm:mt-2.5 sm:text-[4.2rem]">
              {wedding.groom.firstName}
            </span>
          </motion.h1>

          <motion.div variants={line} className="mt-6 w-full sm:mt-7">
            <Ornament glyph="ring" />
          </motion.div>

          {/* Sana va vaqt — saytdagi yagona joyi */}
          <motion.div
            variants={line}
            className="mt-6 flex items-center gap-4 sm:mt-7 sm:gap-5"
          >
            <span className="font-display text-[0.92rem] tracking-[0.2em] text-ink uppercase sm:text-base">
              22 Sentabr 2026
            </span>
            <span className="h-4 w-px bg-gold/45" />
            <span className="font-display text-[0.92rem] tracking-[0.2em] text-ink uppercase sm:text-base">
              {wedding.event.timeLabel}
            </span>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#taklif"
        aria-label="Pastga oʻtish"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-gold-deep/70 transition-colors hover:text-gold-deep"
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.9, delay: reduced ? 0.1 : 2 }}
      >
        <span className="text-[0.58rem] tracking-[0.3em] uppercase">Pastga</span>
        <motion.span
          animate={reduced ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
        </motion.span>
      </motion.a>
    </section>
  );
}
