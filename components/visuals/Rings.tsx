"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

type RingsProps = {
  /** Kirish (intro) animatsiyasi ishga tushsinmi */
  animate?: boolean;
  /** Sichqoncha harakatiga qarab parallax */
  parallax?: boolean;
  /** Animatsiya boshlanishidan oldingi kechikish (sekund) */
  delay?: number;
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Rings({
  animate = true,
  parallax = true,
  delay = 0,
  className = "",
}: RingsProps) {
  const reduced = useReducedMotion();

  // Sichqoncha parallaxi uchun motion qiymatlari
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  const tx = useTransform(sx, [-1, 1], [-18, 18]);
  const ty = useTransform(sy, [-1, 1], [-12, 12]);
  const rotZ = useTransform(sx, [-1, 1], [-4, 4]);
  const glowX = useTransform(sx, [-1, 1], [26, -26]);
  const glowY = useTransform(sy, [-1, 1], [18, -18]);

  useEffect(() => {
    if (!parallax || reduced) return;
    // Faqat aniq koʻrsatkichli qurilmalarda (sichqoncha bilan) ishlaydi
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [parallax, reduced, mx, my]);

  const shouldAnimate = animate && !reduced;
  const useParallax = parallax && !reduced;

  const container: Variants = {
    hidden: {},
    show: { transition: { delayChildren: delay, staggerChildren: 0.14 } },
  };

  const leftRing: Variants = {
    hidden: { x: -110, opacity: 0, rotate: -26, scale: 0.86 },
    show: {
      x: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { duration: 1.9, ease: EASE },
    },
  };

  const rightRing: Variants = {
    hidden: { x: 110, opacity: 0, rotate: 26, scale: 0.86 },
    show: {
      x: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { duration: 1.9, ease: EASE },
    },
  };

  const bloom: Variants = {
    hidden: { opacity: 0, scale: 0.55 },
    show: {
      opacity: [0, 0.95, 0.45],
      scale: [0.55, 1.22, 1],
      transition: { duration: 2.4, delay: delay + 1.05, ease: EASE },
    },
  };

  const sparkleGroup: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1.4, delay: delay + 1.7 } },
  };

  return (
    <motion.div
      className={"relative select-none " + className}
      style={useParallax ? { x: tx, y: ty, rotate: rotZ } : undefined}
      variants={container}
      initial={shouldAnimate ? "hidden" : false}
      animate="show"
    >
      {/* Uzuklar atrofidagi oltin porlash */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2"
        style={useParallax ? { x: glowX, y: glowY } : undefined}
        variants={bloom}
      >
        <div
          className="h-full w-full animate-[glowPulse_6s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(244,222,168,0.30) 0%, rgba(212,175,55,0.15) 32%, rgba(140,109,31,0.06) 55%, transparent 72%)",
            filter: "blur(18px)",
          }}
        />
      </motion.div>

      <svg
        viewBox="0 0 420 270"
        role="img"
        aria-label="Ikkita oltin nikoh uzugi"
        className="relative w-full drop-shadow-[0_18px_46px_rgba(0,0,0,0.65)]"
      >
        <defs>
          <linearGradient id="goldL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6b4f14" />
            <stop offset="18%" stopColor="#c19a2e" />
            <stop offset="36%" stopColor="#f7ecd0" />
            <stop offset="52%" stopColor="#d4af37" />
            <stop offset="70%" stopColor="#8c6d1f" />
            <stop offset="86%" stopColor="#e6c87d" />
            <stop offset="100%" stopColor="#6b4f14" />
          </linearGradient>

          <linearGradient id="goldR" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7a5a18" />
            <stop offset="20%" stopColor="#d4af37" />
            <stop offset="38%" stopColor="#fbf3dd" />
            <stop offset="56%" stopColor="#c9a331" />
            <stop offset="74%" stopColor="#7f6119" />
            <stop offset="90%" stopColor="#e6c87d" />
            <stop offset="100%" stopColor="#5e4511" />
          </linearGradient>

          <linearGradient id="bevel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff8e6" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#d4af37" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#2b1a0d" stopOpacity="0.65" />
          </linearGradient>

          <linearGradient id="diamondTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#eaf4ff" />
            <stop offset="100%" stopColor="#b9d4ee" />
          </linearGradient>
          <linearGradient id="diamondBottom" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dcecfb" />
            <stop offset="55%" stopColor="#9dc0e0" />
            <stop offset="100%" stopColor="#f6fbff" />
          </linearGradient>

          <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="tinyGlow" x="-140%" y="-140%" width="380%" height="380%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pastdagi kesishuvni koʻrsatish uchun clip */}
          <clipPath id="interlockClip">
            <rect x="176" y="136" width="76" height="126" />
          </clipPath>
        </defs>

        {/* OʻNG UZUK — orqada */}
        <motion.g variants={rightRing} style={{ transformOrigin: "255px 132px" }}>
          <ellipse
            cx="255"
            cy="132"
            rx="74"
            ry="84"
            transform="rotate(13 255 132)"
            fill="none"
            stroke="#4a3510"
            strokeWidth="16"
          />
          <ellipse
            cx="255"
            cy="132"
            rx="74"
            ry="84"
            transform="rotate(13 255 132)"
            fill="none"
            stroke="url(#goldR)"
            strokeWidth="12.5"
          />
          <ellipse
            cx="255"
            cy="132"
            rx="74"
            ry="84"
            transform="rotate(13 255 132)"
            fill="none"
            stroke="url(#bevel)"
            strokeWidth="3.4"
            opacity="0.9"
          />
          <ellipse
            cx="255"
            cy="132"
            rx="74"
            ry="84"
            transform="rotate(13 255 132)"
            fill="none"
            stroke="#fffaf0"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.9"
            filter="url(#tinyGlow)"
            className="ring-sheen ring-sheen--slow"
          />
        </motion.g>

        {/* CHAP UZUK — oldinda */}
        <motion.g variants={leftRing} style={{ transformOrigin: "168px 132px" }}>
          <ellipse
            cx="168"
            cy="132"
            rx="74"
            ry="84"
            transform="rotate(-13 168 132)"
            fill="none"
            stroke="#4a3510"
            strokeWidth="16"
          />
          <ellipse
            cx="168"
            cy="132"
            rx="74"
            ry="84"
            transform="rotate(-13 168 132)"
            fill="none"
            stroke="url(#goldL)"
            strokeWidth="12.5"
          />
          <ellipse
            cx="168"
            cy="132"
            rx="74"
            ry="84"
            transform="rotate(-13 168 132)"
            fill="none"
            stroke="url(#bevel)"
            strokeWidth="3.4"
            opacity="0.9"
          />
          <ellipse
            cx="168"
            cy="132"
            rx="74"
            ry="84"
            transform="rotate(-13 168 132)"
            fill="none"
            stroke="#fffaf0"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.95"
            filter="url(#tinyGlow)"
            className="ring-sheen"
          />

          {/* Olmos — chap uzukning tepasida */}
          <g transform="translate(147 46)" filter="url(#softGlow)">
            <polygon points="-11,0 11,0 6.5,-9 -6.5,-9" fill="url(#diamondTop)" />
            <polygon points="-6.5,-9 6.5,-9 0,-4.4" fill="#ffffff" opacity="0.95" />
            <polygon points="-11,0 -6.5,-9 0,-4.4" fill="#dcecfb" opacity="0.9" />
            <polygon points="11,0 6.5,-9 0,-4.4" fill="#c5dcf2" opacity="0.9" />
            <polygon points="-11,0 11,0 0,15" fill="url(#diamondBottom)" />
            <polygon points="-11,0 0,0 0,15" fill="#ffffff" opacity="0.32" />
            <polygon points="0,0 11,0 0,15" fill="#7ea7cd" opacity="0.32" />
            <path
              d="M0,-19 L2.1,-12.4 L8.6,-10.4 L2.1,-8.3 L0,-1.8 L-2.1,-8.3 L-8.6,-10.4 L-2.1,-12.4 Z"
              fill="#fffdf5"
              className="sparkle sparkle--a"
            />
          </g>
        </motion.g>

        {/* KESISHUV — oʻng uzukning pastki qismi oldinga chiqadi */}
        <motion.g variants={rightRing} style={{ transformOrigin: "255px 132px" }}>
          <g clipPath="url(#interlockClip)">
            <ellipse
              cx="255"
              cy="132"
              rx="74"
              ry="84"
              transform="rotate(13 255 132)"
              fill="none"
              stroke="#4a3510"
              strokeWidth="16"
            />
            <ellipse
              cx="255"
              cy="132"
              rx="74"
              ry="84"
              transform="rotate(13 255 132)"
              fill="none"
              stroke="url(#goldR)"
              strokeWidth="12.5"
            />
            <ellipse
              cx="255"
              cy="132"
              rx="74"
              ry="84"
              transform="rotate(13 255 132)"
              fill="none"
              stroke="url(#bevel)"
              strokeWidth="3.4"
              opacity="0.9"
            />
          </g>
        </motion.g>

        {/* UCHQUNLAR */}
        <motion.g variants={sparkleGroup}>
          <path
            d="M330,64 L332,71 L339,73 L332,75 L330,82 L328,75 L321,73 L328,71 Z"
            fill="#f7e6b8"
            className="sparkle sparkle--b"
          />
          <path
            d="M96,168 L97.6,173.4 L103,175 L97.6,176.6 L96,182 L94.4,176.6 L89,175 L94.4,173.4 Z"
            fill="#f7e6b8"
            className="sparkle sparkle--c"
          />
          <path
            d="M296,210 L297.4,214.6 L302,216 L297.4,217.4 L296,222 L294.6,217.4 L290,216 L294.6,214.6 Z"
            fill="#fff4d6"
            className="sparkle sparkle--d"
          />
          <circle cx="118" cy="86" r="1.9" fill="#f2e2c0" className="sparkle sparkle--b" />
          <circle cx="344" cy="152" r="1.6" fill="#f2e2c0" className="sparkle sparkle--c" />
          <circle cx="206" cy="244" r="1.7" fill="#f2e2c0" className="sparkle sparkle--d" />
        </motion.g>
      </svg>
    </motion.div>
  );
}
