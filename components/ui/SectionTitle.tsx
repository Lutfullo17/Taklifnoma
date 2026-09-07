import Ornament from "./Ornament";
import Reveal from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  glyph?: "diamond" | "ring";
  className?: string;
};

/** Har bir boʻlim uchun yagona uslubdagi sarlavha */
export default function SectionTitle({
  eyebrow,
  title,
  glyph = "diamond",
  className = "",
}: Props) {
  return (
    <div className={"flex w-full flex-col items-center text-center " + className}>
      {eyebrow ? (
        <Reveal from="up" duration={0.7}>
          <p className="eyebrow mb-3.5">{eyebrow}</p>
        </Reveal>
      ) : null}

      <Reveal from="up" delay={0.06} className="w-full">
        <h2 className="gold-plate font-display text-[1.6rem] leading-tight font-semibold tracking-[0.05em] uppercase sm:text-[2.15rem]">
          {title}
        </h2>
      </Reveal>

      <Reveal from="up" delay={0.13} className="mt-4 w-full">
        <Ornament glyph={glyph} />
      </Reveal>
    </div>
  );
}
