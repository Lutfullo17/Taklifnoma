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
  animate?: boolean;
  parallax?: boolean;
  delay?: number;
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Ikkita bir-biriga kirishgan oltin nikoh uzugi (yorugʻ fon uchun) */
export default function Rings({
  animate = true,
  parallax = true,
  delay = 0,
  className = "",
}: RingsProps) {
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.6 });

  const tx = useTransform(sx, [-1, 1], [-14, 14]);
  const ty = useTransform(sy, [-1, 1], [-9, 9]);
  const rotZ = useTransform(sx, [-1, 1], [-3, 3]);

  useEffect(() => {
    if (!parallax || reduced) return;
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
    show: { transition: { delayChildren: delay, staggerChildren: 0.1 } },
  };

  const leftRing: Variants = {
    hidden: { x: -78, opacity: 0, rotate: -18, scale: 0.9 },
    show: {
      x: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { duration: 1.35, ease: EASE },
    },
  };

  const rightRing: Variants = {
    hidden: { x: 78, opacity: 0, rotate: 18, scale: 0.9 },
    show: {
      x: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { duration: 1.35, ease: EASE },
    },
  };

  const halo: Variants = {
    hidden: { opacity: 0, scale: 0.7 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.4, delay: delay + 0.7, ease: EASE },
    },
  };

  return (
    <motion.div
      className={"relative select-none " + className}
      style={useParallax ? { x: tx, y: ty, rotate: rotZ } : undefined}
      variants={container}
      initial={shouldAnimate ? "hidden" : false}
      animate="show"
    >
      {/* Uzuklar ortidagi iliq yoritish */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[125%] w-[125%] -translate-x-1/2 -translate-y-1/2"
        variants={halo}
      >
        <div
          className="h-full w-full animate-[haloPulse_7s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(226,198,125,0.38) 0%, rgba(197,157,66,0.14) 40%, transparent 68%)",
            filter: "blur(16px)",
          }}
        />
      </motion.div>

      <svg
        viewBox="0 0 420 270"
        role="img"
        aria-label="Ikkita oltin nikoh uzugi"
        className="relative w-full drop-shadow-[0_16px_26px_rgba(122,92,32,0.24)]"
      >
        <defs>
          <linearGradient id="goldL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8a6a22" />
            <stop offset="18%" stopColor="#c69c34" />
            <stop offset="36%" stopColor="#f6e6bd" />
            <stop offset="52%" stopColor="#cfa63c" />
            <stop offset="70%" stopColor="#9a7626" />
            <stop offset="86%" stopColor="#e2c67d" />
            <stop offset="100%" stopColor="#8a6a22" />
          </linearGradient>

          <linearGradient id="goldR" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94711f" />
            <stop offset="20%" stopColor="#cfa63c" />
            <stop offset="38%" stopColor="#faf0d6" />
            <stop offset="56%" stopColor="#c19a34" />
            <stop offset="74%" stopColor="#8f6d21" />
            <stop offset="90%" stopColor="#e2c67d" />
            <stop offset="100%" stopColor="#7d5f1d" />
          </linearGradient>

          <linearGradient id="bevel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fffaee" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#d9bb6a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6b511a" stopOpacity="0.45" />
          </linearGradient>

          <linearGradient id="diamondTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#eef6ff" />
            <stop offset="100%" stopColor="#bcd6ef" />
          </linearGradient>
          <linearGradient id="diamondBottom" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dfeefc" />
            <stop offset="55%" stopColor="#9fc2e2" />
            <stop offset="100%" stopColor="#f8fcff" />
          </linearGradient>

          <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="tinyGlow" x="-140%" y="-140%" width="380%" height="380%">
            <feGaussianBlur stdDeviation="2" result="b" />
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
            stroke="#7a5c1c"
            strokeWidth="15.5"
            opacity="0.75"
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
            opacity="0.85"
          />
          <ellipse
            cx="255"
            cy="132"
            rx="74"
            ry="84"
            transform="rotate(13 255 132)"
            fill="none"
            stroke="#fffdf5"
            strokeWidth="4.5"
            strokeLinecap="round"
            opacity="0.85"
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
            stroke="#7a5c1c"
            strokeWidth="15.5"
            opacity="0.75"
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
            opacity="0.85"
          />
          <ellipse
            cx="168"
            cy="132"
            rx="74"
            ry="84"
            transform="rotate(-13 168 132)"
            fill="none"
            stroke="#fffdf5"
            strokeWidth="4.5"
            strokeLinecap="round"
            opacity="0.9"
            filter="url(#tinyGlow)"
            className="ring-sheen"
          />

          {/* Olmos */}
          <g transform="translate(147 46)" filter="url(#softGlow)">
            <polygon points="-11,0 11,0 6.5,-9 -6.5,-9" fill="url(#diamondTop)" />
            <polygon points="-6.5,-9 6.5,-9 0,-4.4" fill="#ffffff" opacity="0.95" />
            <polygon points="-11,0 -6.5,-9 0,-4.4" fill="#dfeefc" opacity="0.9" />
            <polygon points="11,0 6.5,-9 0,-4.4" fill="#c7dcf1" opacity="0.9" />
            <polygon points="-11,0 11,0 0,15" fill="url(#diamondBottom)" />
            <polygon points="-11,0 0,0 0,15" fill="#ffffff" opacity="0.32" />
            <polygon points="0,0 11,0 0,15" fill="#87acd0" opacity="0.3" />
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
              stroke="#7a5c1c"
              strokeWidth="15.5"
              opacity="0.75"
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
              opacity="0.85"
            />
          </g>
        </motion.g>
      </svg>
    </motion.div>
  );
}
