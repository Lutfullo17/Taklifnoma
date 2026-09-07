# Rizoyev Diyorbek — Nikoh Toʻyi taklifnomasi

Yorugʻ, nafis nikoh taklifnomasi sayti — fil suyagi rangli "qogʻoz" va oltin
folga uslubida. Mobil qurilmalar uchun birinchi navbatda optimallashtirilgan
(mehmonlar asosan Telegram orqali kiradi).

Sahifa qisqa: toʻrtta boʻlim — Hero · Taklifnoma · Sanoq · Manzil. Navigatsiya
paneli yoʻq, manzil esa faqat bitta joyda — "Toʻy manzili" boʻlimida yoziladi.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide Icons

---

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # production serverni ishga tushirish
```

---

## Loyiha tuzilishi

```
app/
  layout.tsx            Shriftlar, SEO metadata, Open Graph, JSON-LD
  page.tsx              Toʻrtta boʻlim shu yerda birlashtiriladi
  globals.css           Dizayn tizimi: yorugʻ palitra, shriftlar, utility'lar
  opengraph-image.tsx   Telegram/ijtimoiy tarmoq uchun dinamik preview rasmi
  icon.tsx              Brauzer yorligʻi belgisi
  sitemap.ts / robots.ts

components/
  IntroContext.tsx      Yuklanish tugaganini kuzatuvchi context
  Preloader.tsx         Qisqa yuklanish ekrani (~1.1 s)
  MusicToggle.tsx       Musiqa tugmasi (avtomatik yoqilmaydi)
  Footer.tsx            Ism va aloqa raqami
  sections/             Hero · Invitation · Countdown · Location
  visuals/              Rings (SVG uzuklar) · Backdrop · MapFrame
  ui/                   Reveal · SectionTitle · Ornament · GoldButton

lib/
  wedding.ts            BARCHA toʻy maʼlumotlari va taklif matni
  ambientMusic.ts       Musiqa dvigateli
```

---

## Maʼlumotlarni oʻzgartirish

Sana, vaqt, toʻyxona nomi, manzil, xarita havolasi — hammasi bitta faylda:
[`lib/wedding.ts`](lib/wedding.ts). Uni tahrirlasangiz, butun sayt yangilanadi.

Countdown `isoDate` qiymatidan hisoblanadi va u `+05:00` (Oʻzbekiston vaqti)
bilan yozilgan — shuning uchun tashrif buyuruvchi qaysi mamlakatda boʻlishidan
qatʼi nazar sanoq toʻgʻri ishlaydi.

---

## Musiqa

Hozir musiqa **Web Audio API** orqali real vaqtda sintez qilinadi (yumshoq
pianino arpeggio + pad). Hech qanday audio fayl kerak emas va mualliflik huquqi
muammosi yoʻq.

Oʻz musiqangizni qoʻyish uchun faylni shu manzilga joylashtiring:

```
public/music/wedding.mp3
```

Sayt uni avtomatik topadi va sintez oʻrniga oʻsha faylni ijro etadi
(qarang: [`lib/ambientMusic.ts`](lib/ambientMusic.ts)).

Musiqa **hech qachon avtomatik yoqilmaydi** — faqat foydalanuvchi tugmani
bosgandan keyin.

---

## Deployment (Vercel)

```bash
npx vercel login       # bir marta
npx vercel --prod
```

Sayt allaqachon deploy qilingan:

- **Jonli manzil:** https://taklifnoma-nikoh-toy.vercel.app
- **GitHub:** https://github.com/Lutfullo17/Taklifnoma (`main` branch)
- **Vercel loyihasi:** `taklifnoma`

`main` ga push qilinsa Vercel avtomatik qayta deploy qiladi.

Domen oʻzgartirilsa, `lib/wedding.ts` ichidagi `site.url` ni ham yangilash
kerak — Open Graph rasmi, canonical havola va sitemap mutlaq manzillarni
shundan oladi.

---

## Performance va accessibility

- Barcha sahifalar statik generatsiya qilinadi (SSG)
- Google Maps iframe faqat ekranga yaqinlashganda yuklanadi
- Canvas zarrachalari ekrandan chiqqanda va tab yashirilganda toʻxtaydi
- `prefers-reduced-motion` toʻliq qoʻllab-quvvatlanadi
- JavaScript oʻchirilgan boʻlsa ham butun matn koʻrinadi (`<noscript>` zaxirasi)
- Shriftlar build paytida yuklab olinadi va oʻz serveringizdan beriladi
