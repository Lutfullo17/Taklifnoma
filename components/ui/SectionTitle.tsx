import Ornament from "./Ornament";
import Reveal from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  glyph?: "diamond" | "ring";
  className?: string;
};

/** Har bir bo'lim uchun yagona uslubdagi sarlavha bloki */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  glyph = "diamond",
  className = "",
}: Props) {
  return (
    <div className={"flex flex-col items-center text-center " + className}>
      {eyebrow ? (
        <Reveal from="up" duration={0.7}>
          <p className="eyebrow mb-4 sm:mb-5">{eyebrow}</p>
        </Reveal>
      ) : null}

      <Reveal from="up" delay={0.06}>
        <h2 className="gold-plate font-display text-[1.75rem] leading-tight font-semibold tracking-[0.06em] uppercase sm:text-4xl lg:text-[2.85rem]">
          {title}
        </h2>
      </Reveal>

      <Reveal from="up" delay={0.14} className="mt-5 w-full sm:mt-6">
        <Ornament glyph={glyph} />
      </Reveal>

      {subtitle ? (
        <Reveal from="up" delay={0.2}>
          <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-cream/70 italic sm:mt-6 sm:text-xl">
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
