"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useIntro } from "@/components/IntroContext";
import { navLinks, wedding } from "@/lib/wedding";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Nav() {
  const { ready } = useIntro();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");

  // Scroll holati + faol boʻlim
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 40);

      const probe = window.innerHeight * 0.35;
      let current: string = navLinks[0].id;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= probe) current = link.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Mobil menyu ochiqligida scroll bloklanadi
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = useCallback((id: string) => {
    setOpen(false);
    // Menyu yopilgach silliq scroll
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    });
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -70, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: -70, opacity: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: EASE }}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "border-b border-gold/15 bg-noir/72 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <nav
            aria-label="Asosiy menyu"
            className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8"
          >
            {/* Monogramma */}
            <button
              type="button"
              onClick={() => go("hero")}
              className="gold-plate font-display text-sm tracking-[0.32em] uppercase transition-opacity hover:opacity-80"
              aria-label="Bosh sahifaga qaytish"
            >
              {wedding.groom.firstName[0]}
              <span className="mx-1 text-gold/50">&middot;</span>
              {wedding.groom.lastName[0]}
            </button>

            {/* Desktop havolalar */}
            <ul className="hidden items-center gap-9 md:flex">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => go(link.id)}
                    className={`relative py-1 text-[0.72rem] font-medium tracking-[0.22em] uppercase transition-colors duration-300 ${
                      active === link.id
                        ? "text-champagne"
                        : "text-cream/55 hover:text-cream/90"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`hairline-gold absolute -bottom-0.5 left-0 block h-px transition-all duration-500 ${
                        active === link.id ? "w-full opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobil tugma */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Menyuni ochish"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 text-gold-soft transition-colors hover:border-gold/50 md:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden />
            </button>

            {/* Desktop oʻng tomon muvozanati */}
            <span className="hidden w-16 md:block" aria-hidden />
          </nav>
        </div>
      </motion.header>

      {/* ---------- MOBIL MENYU ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="absolute inset-0 bg-noir/96 backdrop-blur-2xl" />
            <div
              aria-hidden
              className="absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 22%, rgba(212,175,55,0.16) 0%, transparent 62%)",
              }}
            />

            <div className="relative flex h-16 items-center justify-between px-5">
              <span className="gold-plate font-display text-sm tracking-[0.32em] uppercase">
                {wedding.groom.firstName[0]}
                <span className="mx-1 text-gold/50">&middot;</span>
                {wedding.groom.lastName[0]}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Menyuni yopish"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 text-gold-soft"
              >
                <X className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </button>
            </div>

            <nav
              aria-label="Mobil menyu"
              className="relative flex flex-1 flex-col items-center justify-center gap-2 px-8"
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  className="w-full max-w-xs border-b border-gold/12 py-5 text-center font-display text-xl tracking-[0.18em] text-cream/85 uppercase transition-colors active:text-champagne"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.55, delay: 0.06 + i * 0.08, ease: EASE }}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.p
                className="mt-10 font-serif text-lg text-cream/45 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.42 }}
              >
                22.09.2026 &middot; {wedding.event.timeLabel}
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
