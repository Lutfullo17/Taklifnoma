"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useIntro } from "./IntroContext";
import { wedding } from "@/lib/wedding";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Premium yuklanish ekrani — ikki uzuk va oltin progress */
export default function Preloader() {
  const { markReady } = useIntro();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  const hold = reduced ? 600 : 2200;

  useEffect(() => {
    // Yuklanish davomida scroll bloklanadi
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const t1 = setTimeout(() => {
      markReady();
      setVisible(false);
    }, hold);

    return () => {
      clearTimeout(t1);
      document.body.style.overflow = prev;
    };
  }, [hold, markReady]);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="preloader-root fixed inset-0 z-[100] flex flex-col items-center justify-center bg-noir px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.25 : 0.95, ease: EASE }}
        >
          {/* Markazdagi issiq yoritish */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 opacity-70 blur-[70px]"
            style={{
              background:
                "radial-gradient(circle, rgba(212,175,55,0.16) 0%, transparent 66%)",
            }}
          />

          <motion.div
            className="relative flex flex-col items-center"
            exit={{ scale: reduced ? 1 : 1.1, opacity: 0 }}
            transition={{ duration: 0.95, ease: EASE }}
          >
            {/* Aylanuvchi uzuklar */}
            <div className="relative h-24 w-32 sm:h-28 sm:w-36">
              <motion.svg
                viewBox="0 0 140 110"
                className="h-full w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <defs>
                  <linearGradient id="preGoldA" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8c6d1f" />
                    <stop offset="45%" stopColor="#f2e2c0" />
                    <stop offset="100%" stopColor="#a17c22" />
                  </linearGradient>
                  <linearGradient id="preGoldB" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a17c22" />
                    <stop offset="50%" stopColor="#e6c87d" />
                    <stop offset="100%" stopColor="#8c6d1f" />
                  </linearGradient>
                </defs>

                <motion.ellipse
                  cx="58"
                  cy="55"
                  rx="30"
                  ry="34"
                  fill="none"
                  stroke="url(#preGoldA)"
                  strokeWidth="4"
                  style={{ transformOrigin: "58px 55px" }}
                  animate={reduced ? {} : { rotate: 360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                />
                <motion.ellipse
                  cx="82"
                  cy="55"
                  rx="30"
                  ry="34"
                  fill="none"
                  stroke="url(#preGoldB)"
                  strokeWidth="4"
                  style={{ transformOrigin: "82px 55px" }}
                  animate={reduced ? {} : { rotate: -360 }}
                  transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                />
              </motion.svg>
            </div>

            {/* Ism */}
            <motion.p
              className="gold-plate mt-7 font-display text-sm tracking-[0.4em] uppercase sm:text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            >
              {wedding.groom.firstName}
            </motion.p>

            {/* Oltin progress chizigʻi */}
            <div className="relative mt-6 h-px w-44 overflow-hidden bg-gold/15 sm:w-56">
              <motion.span
                className="hairline-gold absolute inset-y-0 left-0 block"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: hold / 1000, ease: "easeInOut" }}
              />
            </div>

            {/* Xush kelibsiz matni */}
            <motion.p
              className="mt-6 max-w-xs text-center font-serif text-base text-cream/60 italic sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.6 }}
            >
              {wedding.groom.firstName}ning baxtli kuniga xush kelibsiz...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
