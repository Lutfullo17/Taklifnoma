type OrnamentProps = {
  className?: string;
  /** Markazdagi belgi: olmos yoki uzuk */
  glyph?: "diamond" | "ring";
};

/** Nozik oltin ajratgich — ikki tomonda chiziq, markazda naqsh */
export default function Ornament({
  className = "",
  glyph = "diamond",
}: OrnamentProps) {
  return (
    <div
      aria-hidden
      className={"flex w-full items-center justify-center gap-3 sm:gap-4 " + className}
    >
      <span className="hairline-gold h-px w-16 opacity-80 sm:w-24" />

      {glyph === "diamond" ? (
        <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5">
          <path
            d="M12 1.5 L22.5 12 L12 22.5 L1.5 12 Z"
            fill="none"
            stroke="#b48a2f"
            strokeWidth="1.6"
          />
          <path d="M12 6 L18 12 L12 18 L6 12 Z" fill="#b48a2f" opacity="0.55" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0">
          <circle cx="9" cy="13" r="6.4" fill="none" stroke="#b48a2f" strokeWidth="1.5" />
          <circle cx="15" cy="13" r="6.4" fill="none" stroke="#cdaa55" strokeWidth="1.5" />
        </svg>
      )}

      <span className="hairline-gold h-px w-16 opacity-80 sm:w-24" />
    </div>
  );
}
