import Ornament from "@/components/ui/Ornament";
import Reveal from "@/components/ui/Reveal";
import { wedding } from "@/lib/wedding";

export default function Footer() {
  return (
    <footer className="relative w-full px-5 pt-6 pb-12 sm:px-8 sm:pb-14">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <Reveal from="up" className="w-full">
          <Ornament glyph="ring" />
        </Reveal>

        <Reveal from="up" delay={0.08}>
          <p className="gold-plate mt-7 font-display text-base tracking-[0.24em] uppercase sm:text-lg">
            {wedding.groom.fullName}
          </p>
        </Reveal>

        <Reveal from="up" delay={0.14}>
          <p className="mt-4 text-[0.72rem] tracking-[0.06em] text-ink-soft sm:text-[0.8rem]">
            Aloqa uchun:{" "}
            <a
              href={`tel:${wedding.contact.phoneHref}`}
              className="text-gold-deep transition-colors hover:text-gold"
            >
              {wedding.contact.phone}
            </a>
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
