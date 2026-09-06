import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  /** Chapdagi ikonka */
  icon?: ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

/**
 * Premium oltin tugma — shimmer sweep, hover koʻtarilish va ikonka animatsiyasi bilan.
 * Mobil qurilmalar uchun minimal 48px balandlik.
 */
export default function GoldButton({
  href,
  children,
  icon,
  variant = "solid",
  external = true,
  className = "",
  ariaLabel,
}: Props) {
  const base =
    "group relative inline-flex min-h-[3.1rem] w-full items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 text-[0.82rem] font-medium tracking-[0.14em] uppercase transition-all duration-500 sm:w-auto sm:text-sm";

  const solid =
    "text-espresso shadow-[0_16px_40px_-16px_rgba(212,175,55,0.75)] hover:shadow-[0_22px_54px_-16px_rgba(212,175,55,0.9)] hover:-translate-y-0.5";

  const outline =
    "glass-card text-champagne hover:-translate-y-0.5 hover:border-gold/55 hover:text-warm-white";

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={`${base} ${variant === "solid" ? solid : outline} ${className}`}
      style={
        variant === "solid"
          ? {
              backgroundImage:
                "linear-gradient(120deg, #a17c22 0%, #d4af37 26%, #f4e3bb 50%, #d4af37 74%, #a17c22 100%)",
            }
          : undefined
      }
    >
      {/* Shimmer sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.55)_50%,transparent_65%)] transition-transform duration-[1100ms] ease-out group-hover:translate-x-full"
      />

      {icon ? (
        <span className="relative transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110">
          {icon}
        </span>
      ) : null}

      <span className="relative">{children}</span>
    </a>
  );
}
