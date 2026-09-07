"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music2, Pause } from "lucide-react";
import { startMusic } from "@/lib/ambientMusic";
import { useIntro } from "./IntroContext";

const EASE = [0.22, 1, 0.36, 1] as const;
const BARS = [0.45, 0.95, 0.65, 1, 0.55];

/**
 * Musiqa tugmasi — avtomatik yoqilmaydi, faqat foydalanuvchi bosganda.
 */
export default function MusicToggle() {
  const { ready } = useIntro();
  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState(false);
  const [hintSeen, setHintSeen] = useState(false);
  const engineRef = useRef<{ stop: () => void } | null>(null);

  // Komponent yoʻq qilinganda musiqa toʻxtaydi
  useEffect(() => () => engineRef.current?.stop(), []);

  // Boshlangʻich maslahat qisqa vaqt koʻrinadi
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setHintSeen(true), 7000);
    return () => clearTimeout(t);
  }, [ready]);

  const toggle = useCallback(async () => {
    if (busy) return;
    setHintSeen(true);

    if (playing) {
      engineRef.current?.stop();
      engineRef.current = null;
      setPlaying(false);
      return;
    }

    setBusy(true);
    try {
      engineRef.current = await startMusic();
      setPlaying(true);
    } finally {
      setBusy(false);
    }
  }, [busy, playing]);

  return (
    <motion.div
      className="fixed right-4 bottom-4 z-40 flex items-center gap-2.5 sm:right-6 sm:bottom-6"
      initial={{ opacity: 0, y: 22, scale: 0.9 }}
      animate={ready ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
    >
      {/* Maslahat yorligʻi */}
      <AnimatePresence>
        {!hintSeen && !playing && (
          <motion.span
            className="paper-card hidden rounded-full px-4 py-2 text-[0.66rem] tracking-[0.18em] whitespace-nowrap text-ink-soft uppercase sm:block"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Musiqani yoqing
          </motion.span>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Musiqani oʻchirish" : "Musiqani yoqish"}
        className="group paper-card relative flex h-13 w-13 items-center justify-center rounded-full transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/70 active:scale-95"
        style={{ height: "3.25rem", width: "3.25rem" }}
      >
        {/* Ijro paytidagi porlash */}
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
            // Ekvalayzer chiziqlari
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
          ) : busy ? (
            <Pause className="h-5 w-5 animate-pulse text-gold-deep" strokeWidth={1.5} />
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
