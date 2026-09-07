import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  ariaLabel?: string;
};

/**
 * Tugma — mobil qurilmalar uchun kamida 50px balandlik.
 */
export default function GoldButton({
  href,
  children,
  icon,
  variant = "solid",
  className = "",
  ariaLabel,
}: Props) {
  const base =
    "group relative inline-flex min-h-[3.15rem] w-full items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 text-[0.8rem] font-medium tracking-[0.13em] uppercase transition-all duration-400 sm:w-auto sm:text-[0.82rem]";

  const solid =
    "text-ivory shadow-[0_12px_28px_-14px_rgba(138,106,34,0.75)] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(138,106,34,0.85)]";

  const outline =
    "border border-gold/45 bg-ivory/70 text-ink hover:-translate-y-0.5 hover:border-gold/70 hover:bg-ivory";

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variant === "solid" ? solid : outline} ${className}`}
      style={
        variant === "solid"
          ? {
              backgroundImage:
                "linear-gradient(120deg, #7d5f1d 0%, #a97f28 30%, #c39a38 52%, #a97f28 74%, #7d5f1d 100%)",
            }
          : undefined
      }
    >
      {/* Yorugʻlik yugurishi */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_38%,rgba(255,255,255,0.42)_50%,transparent_62%)] transition-transform duration-[1000ms] ease-out group-hover:translate-x-full"
      />

      {icon ? (
        <span className="relative transition-transform duration-400 group-hover:scale-110">
          {icon}
        </span>
      ) : null}

      <span className="relative">{children}</span>
    </a>
  );
}
