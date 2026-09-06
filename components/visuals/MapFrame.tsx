"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { wedding } from "@/lib/wedding";

/**
 * Google Maps — ekranga yaqinlashganda yuklanadi (lazy).
 * Bu Lighthouse ballini saqlab qoladi va mobil trafikni tejaydi.
 */
export default function MapFrame() {
  const holderRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;

    // IntersectionObserver mavjud boʻlmasa — darhol yuklaymiz
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    io.observe(el);

    // Zaxira: kuzatuvchi biror sababga koʻra ishlamasa, scroll paytida
    // xaritaga yaqinlashganini oʻzimiz tekshiramiz
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.6) {
        setInView(true);
        io.disconnect();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={holderRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.4rem] sm:aspect-[16/10] sm:rounded-[1.75rem] lg:aspect-[16/8]"
    >
      {/* Oltin ramka */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[1.4rem] border border-gold/35 sm:rounded-[1.75rem]"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,240,205,0.18)" }}
      />

      {/* Chekkalarni fonga qorishtiruvchi qatlam */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[1.4rem] sm:rounded-[1.75rem]"
        style={{
          background:
            "radial-gradient(ellipse 130% 130% at 50% 50%, transparent 58%, rgba(5,4,3,0.45) 100%)",
        }}
      />

      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-espresso/60">
          <span className="relative flex h-12 w-12 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-gold/20" />
            <MapPin className="relative h-6 w-6 text-gold-soft" strokeWidth={1.4} />
          </span>
          <p className="text-[0.68rem] tracking-[0.28em] text-cream/45 uppercase">
            Xarita yuklanmoqda
          </p>
        </div>
      )}

      {inView && (
        <iframe
          src={wedding.venue.embedSrc}
          title={`${wedding.venue.name} — xaritadagi joylashuvi`}
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 h-full w-full border-0"
          style={{ filter: "saturate(0.88) contrast(1.04) brightness(0.95)" }}
        />
      )}
    </div>
  );
}
