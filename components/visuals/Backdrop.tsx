/**
 * Global fon: iliq qogʻoz rangi, yumshoq oltin yoritishlar va nozik grain.
 * Faqat CSS — JavaScript yuklamasi yoʻq.
 */
export default function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Asosiy iliq gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(168deg, #fdfaf4 0%, #faf3e8 38%, #f4ead9 68%, #f8f1e4 100%)",
        }}
      />

      {/* Yuqori chapdagi yumshoq oltin yoritish */}
      <div
        className="absolute -top-[18%] -left-[12%] h-[58vh] w-[58vh] animate-[drift_26s_ease-in-out_infinite_alternate] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(197,157,66,0.16) 0%, rgba(197,157,66,0.06) 48%, transparent 72%)",
        }}
      />

      {/* Pastki oʻngdagi iliq yoritish */}
      <div
        className="absolute -right-[10%] -bottom-[20%] h-[64vh] w-[64vh] animate-[drift_32s_ease-in-out_infinite_alternate-reverse] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(214,169,109,0.14) 0%, rgba(214,169,109,0.05) 48%, transparent 74%)",
        }}
      />

      {/* Qogʻoz teksturasi */}
      <div className="paper-grain absolute inset-0 opacity-[0.05] mix-blend-multiply" />

      {/* Chekkalardagi nozik qoraytirish — sahifa "qogʻoz" boʻlib koʻrinadi */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 85% at 50% 40%, transparent 55%, rgba(150,118,66,0.07) 88%, rgba(150,118,66,0.12) 100%)",
        }}
      />
    </div>
  );
}
