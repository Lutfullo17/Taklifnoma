import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import { invitationText, wedding } from "@/lib/wedding";

/** Taklifnoma matni — sahifaning yuragi */
export default function Invitation() {
  return (
    <section id="taklif" className="relative w-full px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto w-full max-w-2xl">
        <SectionTitle eyebrow="Taklifnoma" title="Hurmatli mehmon" />

        <div className="paper-card mt-9 rounded-[1.25rem] px-6 py-9 sm:mt-11 sm:rounded-[1.5rem] sm:px-11 sm:py-11">
          <div className="space-y-4 text-center sm:space-y-5">
            {invitationText.map((sentence, i) => (
              <Reveal key={sentence} from="up" delay={i * 0.07} amount={0.15}>
                <p className="font-serif text-[1.15rem] leading-relaxed text-ink-soft sm:text-[1.35rem]">
                  {sentence}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal from="up" delay={0.4} className="mt-9 sm:mt-10">
            <p className="text-center font-display text-sm tracking-[0.22em] text-gold-deep uppercase sm:text-base">
              {wedding.groom.fullName}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
