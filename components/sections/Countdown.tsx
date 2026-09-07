"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import { wedding } from "@/lib/wedding";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

const TARGET = new Date(wedding.event.isoDate).getTime();

function partsFrom(diff: number): Parts {
  const clamped = Math.max(0, diff);
  return {
    days: Math.floor(clamped / 86_400_000),
    hours: Math.floor((clamped / 3_600_000) % 24),
    minutes: Math.floor((clamped / 60_000) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

const UNITS: { key: keyof Parts; label: string }[] = [
  { key: "days", label: "Kun" },
  { key: "hours", label: "Soat" },
  { key: "minutes", label: "Daqiqa" },
  { key: "seconds", label: "Soniya" },
];

export default function Countdown() {
  // Hydration mos kelishi uchun server tomonda hisoblanmaydi
  const [parts, setParts] = useState<Parts | null>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const tick = () => {
      const diff = TARGET - Date.now();
      setParts(partsFrom(diff));
      setFinished(diff <= 0);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const values = useMemo(
    () => parts ?? { days: 0, hours: 0, minutes: 0, seconds: 0 },
    [parts],
  );

  return (
    <section id="vaqt" className="relative w-full px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto w-full max-w-3xl">
        <SectionTitle eyebrow="Sanoq" title="Toʻyga qolgan vaqt" />

        <div className="mt-9 grid grid-cols-4 gap-2 sm:mt-11 sm:gap-4">
          {UNITS.map((unit, i) => (
            <Reveal key={unit.key} from="up" delay={i * 0.07} amount={0.2}>
              <div className="paper-card relative rounded-xl px-1 py-4 text-center sm:rounded-2xl sm:px-3 sm:py-6">
                <div className="relative flex h-[2.3rem] items-center justify-center overflow-hidden sm:h-[3.4rem]">
                  {/*
                    Yangi qiymat yangi `key` bilan almashadi — eski tugun darhol
                    olib tashlanadi, shuning uchun DOM tugunlari toʻplanmaydi.
                  */}
                  <motion.span
                    key={`${unit.key}-${values[unit.key]}`}
                    initial={{ y: "50%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="gold-plate block font-display text-[1.75rem] leading-none font-bold tabular-nums sm:text-[2.7rem]"
                  >
                    {parts === null
                      ? "--"
                      : String(values[unit.key]).padStart(2, "0")}
                  </motion.span>
                </div>

                <p className="mt-2 text-[0.55rem] font-medium tracking-[0.18em] text-ink-soft uppercase sm:mt-3 sm:text-[0.66rem] sm:tracking-[0.26em]">
                  {unit.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {finished ? (
          <Reveal from="up" className="mt-8 text-center">
            <p className="font-serif text-xl text-gold-deep italic sm:text-2xl">
              Bugun bizning baxtli kunimiz — sizni kutib qolamiz!
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
