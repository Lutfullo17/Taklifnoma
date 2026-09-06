"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  phase: number;
  twinkle: number;
  alpha: number;
};

type Props = {
  /** Zichlik koeffitsiyenti — 1 = standart */
  density?: number;
  className?: string;
};

/**
 * Oltin zarrachalar maydoni.
 * Performance uchun: sprite keshlash, DPR cheklovi, ekrandan chiqqanda toʻxtash,
 * tab yashirilganda pauza va prefers-reduced-motion qoʻllab-quvvatlash.
 */
export default function ParticleField({ density = 1, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Bitta zarracha spritei — har kadrda gradient yaratmaslik uchun
    const sprite = document.createElement("canvas");
    const SPRITE = 64;
    sprite.width = SPRITE;
    sprite.height = SPRITE;
    const sctx = sprite.getContext("2d");
    if (sctx) {
      const g = sctx.createRadialGradient(
        SPRITE / 2,
        SPRITE / 2,
        0,
        SPRITE / 2,
        SPRITE / 2,
        SPRITE / 2,
      );
      g.addColorStop(0, "rgba(255,246,214,1)");
      g.addColorStop(0.22, "rgba(240,214,140,0.85)");
      g.addColorStop(0.55, "rgba(212,175,55,0.28)");
      g.addColorStop(1, "rgba(212,175,55,0)");
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, SPRITE, SPRITE);
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;
    let visible = true;
    let last = performance.now();

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Ekran maydoniga mos zarrachalar soni (mobil qurilmada kamroq)
      const base = Math.round((width * height) / 26000);
      const count = Math.max(14, Math.min(72, Math.round(base * density)));

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.7 + Math.random() * 2.3,
        vy: -(2 + Math.random() * 9) / 1000,
        vx: (Math.random() - 0.5) / 1000,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.5 + Math.random() * 1.2,
        alpha: 0.25 + Math.random() * 0.55,
      }));
    };

    const draw = (now: number) => {
      const dt = Math.min(now - last, 48);
      last = now;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        p.y += p.vy * dt * height * 0.06;
        p.x += p.vx * dt * width * 0.06 + Math.sin(p.phase + now / 3200) * 0.06;
        p.phase += 0.0006 * dt;

        if (p.y < -20) {
          p.y = height + 12;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 12;
        if (p.x > width + 20) p.x = -12;

        const flicker =
          0.55 + 0.45 * Math.sin(now / (760 / p.twinkle) + p.phase * 3);
        const size = p.r * 9;
        ctx.globalAlpha = Math.max(0, p.alpha * flicker);
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      if (running && visible) raf = requestAnimationFrame(draw);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        const size = p.r * 9;
        ctx.globalAlpha = p.alpha * 0.7;
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const start = () => {
      if (reduced) return drawStatic();
      if (raf) cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(draw);
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    build();
    start();

    // Oʻlcham oʻzgarganda qayta qurish
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        if (running && visible) start();
      }, 180);
    };
    window.addEventListener("resize", onResize);

    // Ekrandan chiqqanda toʻxtatish
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && running) start();
        else stop();
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running && visible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={"pointer-events-none absolute inset-0 h-full w-full " + className}
    />
  );
}
