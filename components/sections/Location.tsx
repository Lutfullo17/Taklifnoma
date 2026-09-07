"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import GoldButton from "@/components/ui/GoldButton";
import MapFrame from "@/components/visuals/MapFrame";
import { directionsUrl, wedding } from "@/lib/wedding";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Toʻyxona manzili — saytda manzil faqat shu yerda yoziladi */
export default function Location() {
  const reduced = useReducedMotion();

  return (
    <section id="manzil" className="relative w-full px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto w-full max-w-3xl">
        <SectionTitle eyebrow="Joylashuv" title="Toʻy manzili" glyph="ring" />

        {/* Toʻyxona nomi va manzil */}
        <div className="mt-9 flex flex-col items-center text-center sm:mt-11">
          <motion.span
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-ivory/80 shadow-[0_8px_20px_-12px_rgba(138,106,34,0.6)]"
            initial={reduced ? false : { opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <MapPin className="h-5 w-5 text-gold-deep" strokeWidth={1.5} aria-hidden />
          </motion.span>

          <Reveal from="up" delay={0.1}>
            <h3 className="gold-plate mt-5 font-display text-[1.45rem] leading-tight font-semibold sm:text-[1.9rem]">
              {wedding.venue.name}
            </h3>
          </Reveal>

          <Reveal from="up" delay={0.18}>
            <p className="mt-2.5 font-serif text-lg text-ink-soft sm:text-xl">
              {wedding.venue.district}, {wedding.venue.neighborhood}
            </p>
          </Reveal>
        </div>

        {/* Xarita */}
        <motion.div
          className="mt-8 sm:mt-10"
          initial={reduced ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <MapFrame />
        </motion.div>

        {/* Tugmalar */}
        <motion.div
          className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {[
            {
              href: wedding.venue.shortLink,
              label: "Google Mapsda ochish",
              aria: "Toʻyxona joylashuvini Google Mapsda ochish",
              icon: <MapPin className="h-4 w-4" strokeWidth={1.8} aria-hidden />,
              variant: "solid" as const,
            },
            {
              href: directionsUrl,
              label: "Yoʻnalish olish",
              aria: "Toʻyxonaga yoʻnalish olish",
              icon: <Navigation className="h-4 w-4" strokeWidth={1.8} aria-hidden />,
              variant: "outline" as const,
            },
          ].map((btn) => (
            <motion.div
              key={btn.label}
              className="w-full sm:w-auto"
              variants={{
                hidden: reduced ? {} : { opacity: 0, y: 18 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: EASE },
                },
              }}
            >
              <GoldButton
                href={btn.href}
                variant={btn.variant}
                icon={btn.icon}
                ariaLabel={btn.aria}
              >
                {btn.label}
              </GoldButton>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
