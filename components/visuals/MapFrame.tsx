"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { wedding } from "@/lib/wedding";

/**
 * Google Maps — ekranga yaqinlashganda yuklanadi (lazy).
 * Bu sahifaning ochilish tezligini saqlab qoladi va mobil trafikni tejaydi.
 */
export default function MapFrame() {
  const holderRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;

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

    // Zaxira: kuzatuvchi ishlamay qolsa, scroll paytida oʻzimiz tekshiramiz
    const onScroll = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 1.6) {
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
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.25rem] shadow-[0_20px_44px_-26px_rgba(112,84,30,0.5)] sm:aspect-[16/9] sm:rounded-[1.5rem]"
    >
      {/* Oltin ramka */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[1.25rem] border border-gold/35 sm:rounded-[1.5rem]"
      />

      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-sand/60">
          <span className="relative flex h-10 w-10 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-gold/20" />
            <MapPin className="relative h-5 w-5 text-gold-deep" strokeWidth={1.5} />
          </span>
          <p className="text-[0.62rem] tracking-[0.24em] text-ink-mute uppercase">
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
        />
      )}
    </div>
  );
}
