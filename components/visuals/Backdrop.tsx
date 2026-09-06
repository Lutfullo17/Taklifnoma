/**
 * Global fon: harakatlanuvchi gradientlar, yorugʻlik nurlari,
 * nozik shovqin teksturasi va vinyetka. Faqat CSS — JS yuklamasi yoʻq.
 */
export default function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Asosiy issiq quyuq gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(175deg, #050403 0%, #0c0705 28%, #180e07 52%, #0b0705 74%, #050403 100%)",
        }}
      />

      {/* Sekin suzuvchi oltin nur — yuqori chap */}
      <div
        className="absolute -left-[18%] -top-[22%] h-[70vh] w-[70vh] animate-[drift_24s_ease-in-out_infinite_alternate] rounded-full opacity-70 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.20) 0%, rgba(140,109,31,0.09) 45%, transparent 70%)",
        }}
      />

      {/* Sekin suzuvchi issiq nur — pastki oʻng */}
      <div
        className="absolute -bottom-[26%] -right-[16%] h-[78vh] w-[78vh] animate-[drift_30s_ease-in-out_infinite_alternate-reverse] rounded-full opacity-60 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(196,124,58,0.16) 0%, rgba(120,70,28,0.08) 45%, transparent 72%)",
        }}
      />

      {/* Markaziy champagne yoritish */}
      <div
        className="absolute left-1/2 top-1/3 h-[52vh] w-[92vw] -translate-x-1/2 -translate-y-1/2 opacity-50 blur-[110px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(242,226,192,0.10) 0%, transparent 68%)",
        }}
      />

      {/* Yorugʻlik nurlari (light rays) */}
      <div
        className="absolute inset-x-0 top-0 h-[62vh] opacity-[0.13]"
        style={{
          background:
            "repeating-conic-gradient(from 198deg at 50% -8%, rgba(242,226,192,0.55) 0deg 0.6deg, transparent 0.6deg 5deg)",
          maskImage:
            "radial-gradient(ellipse 90% 100% at 50% 0%, black 8%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 100% at 50% 0%, black 8%, transparent 72%)",
        }}
      />

      {/* Nozik shovqin teksturasi */}
      <div className="noise-overlay absolute inset-0 opacity-[0.035] mix-blend-overlay" />

      {/* Vinyetka */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 45%, transparent 42%, rgba(3,2,1,0.55) 82%, rgba(3,2,1,0.85) 100%)",
        }}
      />
    </div>
  );
}
