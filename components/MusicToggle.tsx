"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music2 } from "lucide-react";
import { prepareMusic, startMusicSync, type Engine } from "@/lib/ambientMusic";
import { useIntro } from "./IntroContext";

const EASE = [0.22, 1, 0.36, 1] as const;
const BARS = [0.45, 0.95, 0.65, 1, 0.55];

/** Ovozni ochish uchun brauzer tan oladigan haqiqiy harakatlar */
const GESTURES = ["pointerdown", "touchend", "click", "keydown"] as const;

/**
 * Musiqa avtomatik yoqiladi.
 *
 * Brauzerlar (ayniqsa telefonlarda) foydalanuvchi sahifaga tegmasdan turib
 * ovoz chiqarishni bloklaydi. Shuning uchun:
 *   1. Sahifa ochilishi bilan darhol yoqishga urinamiz.
 *   2. Shu bilan birga mehmonning har qanday teginishiga obuna boʻlamiz —
 *      birinchi teginishda musiqa oʻsha hodisaning oʻzida SINXRON yoqiladi.
 *      Musiqa yonishi bilan obunalar olib tashlanadi.
 *
 * Sinxronlik hal qiluvchi: teginish bilan `startMusicSync()` orasida biror
 * `await` boʻlsa, brauzerning ruxsat oynasi yopiladi va ovoz chiqmaydi.
 *
 * Mehmon musiqani oʻzi oʻchirsa, u boshqa avtomatik yoqilmaydi.
 */
export default function MusicToggle() {
  const { ready } = useIntro();
  const [playing, setPlaying] = useState(false);

  const engineRef = useRef<Engine | null>(null);
  /** Mehmon tugma orqali oʻchirgan boʻlsa — avtomatik yoqmaymiz */
  const userStoppedRef = useRef(false);
  /** Ayni paytda urinish ketayaptimi — bir vaqtda bittadan koʻp boʻlmasin */
  const startingRef = useRef(false);
  const detachRef = useRef<(() => void) | null>(null);

  // MP3 bor-yoʻqligini oldindan aniqlab qoʻyamiz, teginish paytida emas
  useEffect(() => {
    void prepareMusic();
  }, []);

  useEffect(
    () => () => {
      engineRef.current?.stop();
      detachRef.current?.();
    },
    [],
  );

  /**
   * Musiqani yoqishga uriniladi.
   * `startMusicSync()` birinchi `await` dan OLDIN chaqiriladi — shuning uchun
   * bu funksiyani hodisa ishlovchisidan toʻgʻridan-toʻgʻri chaqirsa boʻladi.
   */
  const attemptStart = useCallback(async () => {
    if (engineRef.current || userStoppedRef.current || startingRef.current) {
      return false;
    }
    startingRef.current = true;

    // <-- hech qanday `await` dan keyin turmasligi shart
    const engine = startMusicSync();
    if (!engine) {
      startingRef.current = false;
      return false;
    }

    const ok = await engine.ready;
    startingRef.current = false;

    if (!ok || userStoppedRef.current) {
      engine.stop();
      return false;
    }

    engineRef.current = engine;
    setPlaying(true);
    // Musiqa yondi — teginish kutishning hojati qolmadi
    detachRef.current?.();
    return true;
  }, []);

  // Avtomatik yoqish + teginish kutuvchilari
  useEffect(() => {
    if (!ready) return;

    const onGesture = () => {
      void attemptStart();
    };

    // Kutuvchilarni shartsiz biriktiramiz: avtoijro ishlab ketsa,
    // `attemptStart` ularni oʻzi olib tashlaydi.
    GESTURES.forEach((e) =>
      window.addEventListener(e, onGesture, { passive: true }),
    );
    detachRef.current = () => {
      GESTURES.forEach((e) => window.removeEventListener(e, onGesture));
      detachRef.current = null;
    };

    // Darhol urinib koʻramiz
    void attemptStart();

    return () => {
      detachRef.current?.();
    };
  }, [ready, attemptStart]);

  const toggle = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.stop();
      engineRef.current = null;
      userStoppedRef.current = true;
      detachRef.current?.();
      setPlaying(false);
      return;
    }

    userStoppedRef.current = false;
    // Bosishning oʻzi ruxsat oynasi — sinxron boshlanadi
    void attemptStart();
  }, [attemptStart]);

  return (
    <motion.div
      className="fixed right-4 bottom-4 z-40 flex items-center gap-2.5 sm:right-6 sm:bottom-6"
      initial={{ opacity: 0, y: 22, scale: 0.9 }}
      animate={ready ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
    >
      <AnimatePresence>
        {playing && (
          <motion.span
            className="paper-card hidden rounded-full px-4 py-2 text-[0.62rem] tracking-[0.18em] whitespace-nowrap text-ink-soft uppercase sm:block"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Musiqa chalinmoqda
          </motion.span>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Musiqani oʻchirish" : "Musiqani yoqish"}
        className="group paper-card relative flex items-center justify-center rounded-full transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/70 active:scale-95"
        style={{ height: "3.25rem", width: "3.25rem" }}
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute -inset-2 rounded-full blur-lg transition-opacity duration-700 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(circle, rgba(197,157,66,0.35) 0%, transparent 70%)",
          }}
        />

        {playing && (
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full border border-gold/35 [animation-duration:2.6s]"
          />
        )}

        <span className="relative flex items-center justify-center">
          {playing ? (
            <span className="flex h-4 items-end gap-[3px]" aria-hidden>
              {BARS.map((h, i) => (
                <motion.span
                  key={i}
                  className="w-[2.5px] rounded-full bg-gold"
                  animate={{ scaleY: [h * 0.35, h, h * 0.45] }}
                  transition={{
                    duration: 0.85 + i * 0.13,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                  style={{ height: "100%", originY: 1 }}
                />
              ))}
            </span>
          ) : (
            <Music2
              className="h-5 w-5 text-gold-deep transition-transform duration-500 group-hover:scale-110"
              strokeWidth={1.5}
              aria-hidden
            />
          )}
        </span>
      </button>
    </motion.div>
  );
}
