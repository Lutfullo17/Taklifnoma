"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import ParticleField from "@/components/visuals/ParticleField";
import Ornament from "@/components/ui/Ornament";
import Reveal from "@/components/ui/Reveal";
import { wedding } from "@/lib/wedding";

/** Romantik bo'lim — nozik fon animatsiyasi va parallax bilan */
export default function Romantic() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.15, 0.85]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.75, 0.25]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden px-5 py-28 sm:px-8 sm:py-36 lg:py-44"
    >
      {/* Suzuvchi oltin zarrachalar */}
      <ParticleField density={0.75} />

      {/* Sekin harakatlanuvchi yorugʻlik */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[110vw] -translate-x-1/2 -translate-y-1/2 blur-[90px]"
        style={
          reduced
            ? { opacity: 0.4 }
            : { scale: glowScale, opacity: glowOpacity }
        }
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(212,175,55,0.20) 0%, rgba(196,124,58,0.08) 42%, transparent 72%)",
          }}
        />
      </motion.div>

      <motion.div
        className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
        style={reduced ? undefined : { y }}
      >
        <Reveal from="up" duration={1}>
          <span
            aria-hidden
            className="gold-plate block font-display text-5xl leading-none opacity-40 select-none sm:text-6xl"
          >
            &ldquo;
          </span>
        </Reveal>

        <Reveal from="up" delay={0.1} duration={1.1}>
          <p className="mt-6 font-serif text-2xl leading-[1.55] text-cream/90 italic sm:text-[2.1rem] lg:text-[2.5rem]">
            Ikki qalb bir maromda ura boshlagan kun,
            <br className="hidden sm:block" /> ikki taqdir bitta yoʻlga tushgan
            lahza —
          </p>
        </Reveal>

        <Reveal from="up" delay={0.22} duration={1.1}>
          <p className="gold-plate mt-6 font-display text-lg tracking-[0.14em] uppercase sm:mt-8 sm:text-2xl">
            Bu baxtni siz bilan boʻlishmoqchimiz
          </p>
        </Reveal>

        <Reveal from="up" delay={0.32} className="mt-10 w-full sm:mt-12">
          <Ornament glyph="diamond" />
        </Reveal>

        <Reveal from="up" delay={0.42}>
          <p className="mt-8 font-serif text-lg text-cream/55 italic sm:mt-10 sm:text-xl">
            Hurmat bilan, {wedding.groom.fullName}
          </p>
        </Reveal>
      </motion.div>
    </section>
  );
}
