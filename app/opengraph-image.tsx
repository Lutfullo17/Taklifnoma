import { ImageResponse } from "next/og";
import { wedding } from "@/lib/wedding";

export const alt = `${wedding.groom.fullName} — ${wedding.event.title} taklifnomasi`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Telegram / ijtimoiy tarmoqlarda chiroyli preview chiqishi uchun
 * dinamik Open Graph rasmi.
 */

// Ikkita oltin uzuk — data URI koʻrinishidagi SVG
const ringsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 250" width="420" height="250">
  <defs>
    <linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8a6a22"/>
      <stop offset="35%" stop-color="#f6e6bd"/>
      <stop offset="65%" stop-color="#cfa63c"/>
      <stop offset="100%" stop-color="#8a6a22"/>
    </linearGradient>
    <linearGradient id="b" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#94711f"/>
      <stop offset="40%" stop-color="#faf0d6"/>
      <stop offset="70%" stop-color="#c19a34"/>
      <stop offset="100%" stop-color="#7d5f1d"/>
    </linearGradient>
  </defs>
  <ellipse cx="250" cy="125" rx="72" ry="82" transform="rotate(13 250 125)" fill="none" stroke="#7a5c1c" stroke-opacity="0.7" stroke-width="15"/>
  <ellipse cx="250" cy="125" rx="72" ry="82" transform="rotate(13 250 125)" fill="none" stroke="url(#b)" stroke-width="11"/>
  <ellipse cx="170" cy="125" rx="72" ry="82" transform="rotate(-13 170 125)" fill="none" stroke="#7a5c1c" stroke-opacity="0.7" stroke-width="15"/>
  <ellipse cx="170" cy="125" rx="72" ry="82" transform="rotate(-13 170 125)" fill="none" stroke="url(#a)" stroke-width="11"/>
  <polygon points="139,42 161,42 155,31 145,31" fill="#eaf4ff"/>
  <polygon points="139,42 161,42 150,60" fill="#b9d4ee"/>
</svg>`;

const ringsDataUri = `data:image/svg+xml;base64,${Buffer.from(ringsSvg).toString("base64")}`;

/** Google Fonts'dan TTF yuklab olish (satori woff2 ni qoʻllab-quvvatlamaydi) */
async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(url, {
    headers: {
      // Eski User-Agent TTF formatini qaytaradi
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40 Safari/537.36",
    },
  }).then((r) => r.text());

  // Google UA'ga qarab woff yoki ttf qaytaradi — ikkalasini ham qabul qilamiz
  const src = css.match(
    /src:\s*url\((.+?)\)\s*format\('(woff|truetype|opentype)'\)/,
  );
  if (!src?.[1]) throw new Error("Font manzili topilmadi");

  const res = await fetch(src[1]);
  if (!res.ok) throw new Error("Font yuklanmadi");
  return res.arrayBuffer();
}

export default async function Image() {
  const name = wedding.groom.firstName;
  const surname = wedding.groom.lastName.toUpperCase();
  const meta = "NIKOH TOʻYI · 22 SENTABR 2026 · 14:00";
  const venue = `${wedding.venue.name} · ${wedding.venue.district}`;

  // Shrift yuklanmasa ham rasm yaratilaveradi
  let fonts: { name: string; data: ArrayBuffer; weight: 400 | 700 }[] = [];
  try {
    const glyphs = `${name}${surname}${meta}${venue}`;
    const [bold, regular] = await Promise.all([
      loadGoogleFont("Cinzel", 700, glyphs),
      loadGoogleFont("Cormorant+Garamond", 400, glyphs),
    ]);
    fonts = [
      { name: "Cinzel", data: bold, weight: 700 },
      { name: "Cormorant", data: regular, weight: 400 },
    ];
  } catch {
    fonts = [];
  }

  const display = fonts.length ? "Cinzel" : "serif";
  const body = fonts.length ? "Cormorant" : "serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fdfaf4",
          backgroundImage:
            "radial-gradient(ellipse 90% 70% at 50% 35%, rgba(197,157,66,0.24) 0%, rgba(197,157,66,0.09) 42%, rgba(253,250,244,0) 72%)",
          position: "relative",
          fontFamily: body,
        }}
      >
        {/* Oltin ramka */}
        <div
          style={{
            position: "absolute",
            top: 34,
            left: 34,
            right: 34,
            bottom: 34,
            border: "1px solid rgba(180,138,47,0.55)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 44,
            right: 44,
            bottom: 44,
            border: "1px solid rgba(180,138,47,0.24)",
            display: "flex",
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ringsDataUri} width={300} height={178} alt="" />

        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 16,
            color: "#a97f28",
            fontFamily: display,
            marginTop: 18,
          }}
        >
          {surname}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 104,
            color: "#7d5f1d",
            fontFamily: display,
            fontWeight: 700,
            marginTop: 6,
            letterSpacing: 2,
          }}
        >
          {name}
        </div>

        <div
          style={{
            display: "flex",
            width: 260,
            height: 1,
            marginTop: 30,
            backgroundImage:
              "linear-gradient(90deg, rgba(180,138,47,0) 0%, rgba(138,106,34,0.9) 50%, rgba(180,138,47,0) 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 25,
            letterSpacing: 6,
            color: "#8a6a22",
            marginTop: 28,
            fontFamily: display,
          }}
        >
          {meta}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 27,
            color: "#6d5c48",
            marginTop: 16,
          }}
        >
          {venue}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length
        ? fonts.map((f) => ({
            name: f.name,
            data: f.data,
            weight: f.weight,
            style: "normal" as const,
          }))
        : undefined,
    },
  );
}
