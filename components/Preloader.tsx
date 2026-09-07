"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useIntro } from "./IntroContext";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Qisqa yuklanish ekrani. Mehmonni kutdirmaslik uchun atigi ~1.1 soniya.
 */
export default function Preloader() {
  const { markReady } = useIntro();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  const hold = reduced ? 350 : 1100;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const t = setTimeout(() => {
      markReady();
      setVisible(false);
      document.body.style.overflow = prev;
    }, hold);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [hold, markReady]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="preloader-root fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.2 : 0.7, ease: EASE }}
        >
          <motion.div
            className="flex flex-col items-center"
            exit={{ scale: reduced ? 1 : 1.06, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <svg viewBox="0 0 140 100" className="h-16 w-24" aria-hidden>
              <defs>
                <linearGradient id="preGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8a6a22" />
                  <stop offset="50%" stopColor="#d9bb6a" />
                  <stop offset="100%" stopColor="#8a6a22" />
                </linearGradient>
              </defs>
              <motion.ellipse
                cx="58"
                cy="50"
                rx="27"
                ry="31"
                fill="none"
                stroke="url(#preGold)"
                strokeWidth="3.4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: EASE }}
              />
              <motion.ellipse
                cx="82"
                cy="50"
                rx="27"
                ry="31"
                fill="none"
                stroke="url(#preGold)"
                strokeWidth="3.4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              />
            </svg>

            <div className="relative mt-6 h-px w-36 overflow-hidden bg-gold/15">
              <motion.span
                className="hairline-gold absolute inset-y-0 left-0 block"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: hold / 1000, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
