"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Rings from "@/components/visuals/Rings";
import ParticleField from "@/components/visuals/ParticleField";
import Ornament from "@/components/ui/Ornament";
import { useIntro } from "@/components/IntroContext";
import { wedding } from "@/lib/wedding";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Kinematik ochilish: qorongʻulik → yorugʻlik → uzuklar → oltin porlash → ism */
export default function Hero() {
  const { ready } = useIntro();
  const reduced = useReducedMotion();
  const [fallback, setFallback] = useState(false);

  // Xavfsizlik uchun: preloader ishlamay qolsa ham intro baribir boshlanadi
  useEffect(() => {
    const t = setTimeout(() => setFallback(true), 3600);
    return () => clearTimeout(t);
  }, []);

  const start = ready || fallback;
  const animated = start && !reduced;

  // Uzuklar joylashgandan keyin matn chiqadi
  const TEXT_BASE = reduced ? 0 : 2.35;

  const text: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delayChildren: TEXT_BASE, staggerChildren: 0.16 },
    },
  };

  const line: Variants = {
    hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.25, ease: EASE },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-5 pt-24 pb-24 sm:px-8"
    >
      {/* Kinematik yorugʻlik effekti — qorongʻulikdan sekin ochiladi */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={reduced ? false : { opacity: 0 }}
        animate={start ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2.2, ease: EASE }}
      >
        <div
          className="absolute left-1/2 top-[38%] h-[95vh] w-[130vw] -translate-x-1/2 -translate-y-1/2 blur-[80px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(242,226,192,0.13) 0%, rgba(212,175,55,0.07) 38%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Oltin zarrachalar */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={reduced ? false : { opacity: 0 }}
        animate={start ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2.6, delay: 0.3, ease: "easeOut" }}
      >
        <ParticleField density={1.15} />
      </motion.div>

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        {/* Nikoh uzuklari */}
        <Rings
          animate={animated}
          parallax
          delay={0.35}
          className="w-[min(80vw,340px)] sm:w-[min(62vw,400px)] lg:w-[440px]"
        />

        {/* Matn bloki */}
        <motion.div
          className="mt-6 flex flex-col items-center text-center sm:mt-8"
          variants={text}
          initial={animated ? "hidden" : false}
          animate={start ? "show" : "hidden"}
        >
          <motion.p variants={line} className="eyebrow">
            {wedding.event.title}
          </motion.p>

          <motion.h1
            variants={line}
            className="mt-5 flex flex-col items-center leading-none sm:mt-6"
          >
            <span className="gold-plate font-display text-[1.05rem] font-medium tracking-[0.44em] uppercase sm:text-xl lg:text-2xl">
              {wedding.groom.lastName}
            </span>
            <span className="gold-shimmer mt-2 font-display text-[3.15rem] font-bold tracking-[0.02em] sm:mt-3 sm:text-[4.6rem] lg:text-[5.75rem]">
              {wedding.groom.firstName}
            </span>
          </motion.h1>

          <motion.div variants={line} className="mt-7 w-full sm:mt-8">
            <Ornament glyph="ring" />
          </motion.div>

          <motion.p
            variants={line}
            className="mt-7 max-w-md font-serif text-lg leading-relaxed text-cream/80 sm:mt-8 sm:max-w-lg sm:text-2xl"
          >
            Sizni hayotimizning eng unutilmas kuniga taklif qilamiz
          </motion.p>

          <motion.p
            variants={line}
            className="mt-3 max-w-sm font-serif text-base text-cream/50 italic sm:max-w-md sm:text-lg"
          >
            Baxtimiz sizning tashrifingiz bilan toʻliq boʻladi
          </motion.p>

          {/* Sana chipi */}
          <motion.div
            variants={line}
            className="glass-card mt-9 flex items-center gap-3 rounded-full px-6 py-3 sm:mt-10 sm:gap-4 sm:px-8"
          >
            <span className="font-display text-sm tracking-[0.22em] text-champagne sm:text-base">
              22.09.2026
            </span>
            <span className="h-4 w-px bg-gold/40" />
            <span className="font-display text-sm tracking-[0.22em] text-champagne sm:text-base">
              {wedding.event.timeLabel}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Pastga scroll ishorasi */}
      <motion.a
        href="#tadbir"
        aria-label="Pastga oʻtish"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-gold-soft/70 transition-colors hover:text-gold-soft"
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: reduced ? 0.2 : 4.1 }}
      >
        <span className="text-[0.6rem] tracking-[0.32em] uppercase">Pastga</span>
        <motion.span
          animate={reduced ? {} : { y: [0, 7, 0] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
        </motion.span>
      </motion.a>
    </section>
  );
}
