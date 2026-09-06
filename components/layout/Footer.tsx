import { Heart, MapPin } from "lucide-react";
import Ornament from "@/components/ui/Ornament";
import Reveal from "@/components/ui/Reveal";
import { wedding } from "@/lib/wedding";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden px-5 pt-16 pb-12 sm:px-8 sm:pt-20 sm:pb-14">
      {/* Yuqoridagi nozik oltin chegara */}
      <span aria-hidden className="hairline-gold absolute inset-x-0 top-0 h-px opacity-45" />

      {/* Pastdagi issiq porlash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[120vw] -translate-x-1/2 opacity-60 blur-[80px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <Reveal from="up">
          <p className="font-serif text-xl leading-relaxed text-cream/80 italic sm:text-2xl">
            Sizni ushbu unutilmas kunimizda kutib qolamiz
          </p>
        </Reveal>

        <Reveal from="up" delay={0.1} className="mt-7 w-full sm:mt-8">
          <Ornament glyph="ring" />
        </Reveal>

        <Reveal from="up" delay={0.16}>
          <div className="mt-7 flex items-center justify-center gap-3 sm:mt-8">
            <Heart
              className="h-4 w-4 text-gold/70"
              strokeWidth={1.4}
              fill="currentColor"
              aria-hidden
            />
            <p className="gold-plate font-display text-lg tracking-[0.2em] uppercase sm:text-xl">
              {wedding.groom.fullName}
            </p>
            <Heart
              className="h-4 w-4 text-gold/70"
              strokeWidth={1.4}
              fill="currentColor"
              aria-hidden
            />
          </div>
        </Reveal>

        <Reveal from="up" delay={0.24}>
          <a
            href={wedding.venue.shortLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm text-cream/50 transition-colors hover:text-champagne sm:mt-7"
          >
            <MapPin className="h-4 w-4 text-gold/60" strokeWidth={1.5} aria-hidden />
            {wedding.venue.name}
          </a>
        </Reveal>

        <Reveal from="up" delay={0.3}>
          <p className="mt-8 text-[0.62rem] tracking-[0.3em] text-cream/25 uppercase sm:mt-10">
            22 Sentabr 2026 &middot; {wedding.venue.district}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
