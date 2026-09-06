"use client";

import { CalendarDays, Clock, Gem, MapPin, type LucideIcon } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import { wedding } from "@/lib/wedding";

type Item = {
  icon: LucideIcon;
  label: string;
  title: string;
  lines: readonly string[];
};

const items: Item[] = [
  {
    icon: CalendarDays,
    label: "Sana",
    title: wedding.event.dateLabel,
    lines: [wedding.event.yearLabel, wedding.event.weekdayLabel],
  },
  {
    icon: Clock,
    label: "Vaqt",
    title: wedding.event.timeLabel,
    lines: ["Marosim boshlanishi"],
  },
  {
    icon: Gem,
    label: "Tadbir",
    title: wedding.event.title,
    lines: ["Baxtli oila quriladi"],
  },
  {
    icon: MapPin,
    label: "Manzil",
    title: wedding.venue.name,
    lines: wedding.venue.addressLines,
  },
];

export default function EventInfo() {
  return (
    <section
      id="tadbir"
      className="relative w-full px-5 py-24 sm:px-8 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionTitle
          eyebrow="Marosim"
          title="Toʻy haqida"
          subtitle="Ushbu qutlugʻ kunning barcha tafsilotlari"
        />

        <div className="relative mt-14 sm:mt-20">
          {/* Vertikal chiziq — mobil koʻrinish */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[1.72rem] w-px lg:hidden"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(212,175,55,0.55) 12%, rgba(212,175,55,0.55) 88%, transparent)",
            }}
          />

          {/* Gorizontal chiziq — desktop koʻrinish */}
          <span
            aria-hidden
            className="hairline-gold absolute top-[2.3rem] right-[12%] left-[12%] hidden h-px opacity-60 lg:block"
          />

          <ul className="relative grid gap-9 sm:gap-10 lg:grid-cols-4 lg:gap-6">
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal
                  as="li"
                  key={item.label}
                  from="up"
                  delay={i * 0.11}
                  amount={0.2}
                  className="flex items-start gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                >
                  {/* Ikonka tuguni */}
                  <div className="relative shrink-0">
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full opacity-70 blur-lg"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)",
                      }}
                    />
                    <div className="glass-card relative flex h-14 w-14 items-center justify-center rounded-full">
                      <Icon
                        className="h-5 w-5 text-gold-soft"
                        strokeWidth={1.4}
                        aria-hidden
                      />
                    </div>
                  </div>

                  <div className="pt-1 lg:pt-7">
                    <p className="eyebrow">{item.label}</p>
                    <h3 className="gold-plate mt-2.5 font-display text-xl leading-snug font-semibold sm:text-2xl">
                      {item.title}
                    </h3>
                    <div className="mt-2 space-y-0.5">
                      {item.lines.map((line) => (
                        <p
                          key={line}
                          className="font-serif text-base text-cream/60 sm:text-lg"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
