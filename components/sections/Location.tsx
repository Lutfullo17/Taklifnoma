"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Compass, MapPin, Navigation } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import GoldButton from "@/components/ui/GoldButton";
import MapFrame from "@/components/visuals/MapFrame";
import { directionsUrl, wedding } from "@/lib/wedding";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Location() {
  const reduced = useReducedMotion();

  return (
    <section
      id="manzil"
      className="relative w-full px-5 py-24 sm:px-8 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-5xl">
        <SectionTitle
          eyebrow="Joylashuv"
          title="Bizni qayerdan topasiz?"
          subtitle="Sizni quvonchli kunimizda kutib qolamiz"
          glyph="ring"
        />

        {/* ---------- PREMIUM MANZIL KARTASI ---------- */}
        <motion.div
          className="group relative mt-14 sm:mt-18"
          initial={reduced ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: EASE }}
        >
          {/* Karta ortidagi oltin porlash */}
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-[2.5rem] opacity-50 blur-3xl transition-opacity duration-700 group-hover:opacity-90"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(212,175,55,0.22) 0%, transparent 68%)",
            }}
          />

          <div className="glass-card relative overflow-hidden rounded-[1.5rem] px-6 py-10 text-center transition-all duration-700 group-hover:-translate-y-1 group-hover:border-gold/50 sm:rounded-[2rem] sm:px-12 sm:py-14">
            <span className="hairline-gold absolute inset-x-10 top-0 h-px opacity-70" />
            <span className="hairline-gold absolute inset-x-10 bottom-0 h-px opacity-40" />

            {/* 1) Joylashuv ikonkasi */}
            <motion.div
              className="relative mx-auto flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24"
              initial={reduced ? false : { opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
            >
              <span
                aria-hidden
                className="absolute inset-0 rounded-full opacity-80 blur-xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(212,175,55,0.45) 0%, transparent 70%)",
                }}
              />
              {!reduced && (
                <>
                  <span className="absolute inset-2 animate-ping rounded-full border border-gold/25 [animation-duration:3.4s]" />
                  <span className="absolute inset-0 rounded-full border border-gold/15" />
                </>
              )}
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-espresso/70 sm:h-16 sm:w-16">
                <MapPin
                  className="h-6 w-6 text-gold-soft sm:h-7 sm:w-7"
                  strokeWidth={1.4}
                  aria-hidden
                />
              </span>
            </motion.div>

            {/* 2) Toʻyxona nomi — fade up */}
            <motion.h3
              className="gold-plate mt-8 font-display text-[1.65rem] leading-tight font-semibold sm:text-4xl"
              initial={reduced ? false : { opacity: 0, y: 26, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, delay: 0.28, ease: EASE }}
            >
              {wedding.venue.name}
            </motion.h3>

            <motion.div
              className="mx-auto mt-7 h-px w-24 sm:mt-8"
              initial={reduced ? false : { scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: 0.42, ease: EASE }}
            >
              <span className="hairline-gold block h-px w-full" />
            </motion.div>

            {/* 3) Manzil — slide animatsiya */}
            <motion.div
              className="mt-7 sm:mt-8"
              initial={reduced ? false : { opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, delay: 0.5, ease: EASE }}
            >
              <p className="eyebrow">Manzil</p>
              <p className="mt-3 font-serif text-xl leading-relaxed text-cream/85 sm:text-2xl">
                {wedding.venue.district},
                <br />
                {wedding.venue.neighborhood}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* ---------- XARITA ---------- */}
        <motion.div
          className="mt-10 sm:mt-14"
          initial={reduced ? false : { opacity: 0, scale: 0.93 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <div className="relative rounded-[1.4rem] shadow-[0_36px_90px_-40px_rgba(0,0,0,0.95)] sm:rounded-[1.75rem]">
            <MapFrame />
          </div>
        </motion.div>

        {/* ---------- TUGMALAR ---------- */}
        <motion.div
          className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:mt-10 sm:flex-row sm:gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
          }}
        >
          <motion.div
            className="w-full sm:w-auto"
            variants={{
              hidden: reduced ? {} : { opacity: 0, y: 22 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
            }}
          >
            <GoldButton
              href={wedding.venue.shortLink}
              icon={<MapPin className="h-4 w-4" strokeWidth={1.8} aria-hidden />}
              ariaLabel="Toʻyxona joylashuvini Google Mapsda ochish"
            >
              Google Mapsda ochish
            </GoldButton>
          </motion.div>

          <motion.div
            className="w-full sm:w-auto"
            variants={{
              hidden: reduced ? {} : { opacity: 0, y: 22 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
            }}
          >
            <GoldButton
              href={directionsUrl}
              variant="outline"
              icon={
                <Navigation className="h-4 w-4" strokeWidth={1.8} aria-hidden />
              }
              ariaLabel="Toʻyxonaga yoʻnalish olish"
            >
              Yoʻnalish olish
            </GoldButton>
          </motion.div>
        </motion.div>

        <Reveal from="up" delay={0.1} className="mt-7 text-center">
          <p className="inline-flex items-center gap-2 font-serif text-base text-cream/45 italic">
            <Compass className="h-4 w-4 text-gold/60" strokeWidth={1.4} aria-hidden />
            Tugmani bosing — navigatsiya telefoningizda ochiladi
          </p>
        </Reveal>
      </div>
    </section>
  );
}
