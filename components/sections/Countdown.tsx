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
  // Hydration mos kelishi uchun: server tomonda hisoblanmaydi
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
    <section
      id="vaqt"
      className="relative w-full px-5 py-24 sm:px-8 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-5xl">
        <SectionTitle
          eyebrow="Sanoq"
          title="Toʻyga qolgan vaqt"
          subtitle="Eng quvonchli kunimizga qadar sanoqli daqiqalar qoldi"
        />

        <div className="mt-12 grid grid-cols-2 gap-3.5 sm:mt-16 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {UNITS.map((unit, i) => (
            <Reveal
              key={unit.key}
              from="up"
              delay={i * 0.09}
              scaleFrom={0.94}
              amount={0.2}
            >
              <div className="group glass-card relative overflow-hidden rounded-2xl px-3 py-6 text-center sm:rounded-[1.35rem] sm:px-4 sm:py-9">
                {/* Yuqoridagi oltin chiziq */}
                <span className="hairline-gold absolute inset-x-6 top-0 h-px opacity-70" />

                {/* Ichki yumshoq porlash */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full opacity-60 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(212,175,55,0.28) 0%, transparent 70%)",
                  }}
                />

                <div className="relative flex h-[3.4rem] items-center justify-center overflow-hidden sm:h-[5rem]">
                  {/*
                    Har bir yangi qiymat yangi `key` bilan almashadi — eski tugun
                    darhol olib tashlanadi. AnimatePresence ishlatilmaydi, chunki
                    fonda turgan tabda chiqish animatsiyasi tugamay, tugunlar
                    toʻplanib qolishi mumkin.
                  */}
                  <motion.span
                    key={`${unit.key}-${values[unit.key]}`}
                    initial={{ y: "55%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="gold-plate block font-display text-[2.6rem] leading-none font-bold tabular-nums sm:text-[4rem]"
                  >
                    {parts === null
                      ? "--"
                      : String(values[unit.key]).padStart(2, "0")}
                  </motion.span>
                </div>

                <p className="relative mt-3 text-[0.62rem] font-medium tracking-[0.3em] text-cream/55 uppercase sm:mt-4 sm:text-xs">
                  {unit.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {finished ? (
          <Reveal from="up" className="mt-10 text-center">
            <p className="font-serif text-xl text-champagne italic sm:text-2xl">
              Bugun bizning baxtli kunimiz — sizni kutib qolamiz!
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
