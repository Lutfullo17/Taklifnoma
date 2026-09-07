/**
 * Toʻy maʼlumotlari — saytdagi yagona haqiqat manbai.
 * Bu yerdagi qiymatlarni oʻzgartirsangiz, butun sayt yangilanadi.
 */

export const wedding = {
  groom: {
    firstName: "Diyorbek",
    lastName: "Rizoyev",
    fullName: "Rizoyev Diyorbek",
  },
  event: {
    title: "Nikoh toʻyi",
    dateLabel: "22 Sentabr",
    yearLabel: "2026",
    timeLabel: "14:00",
    dateShort: "22.09.2026",
    /** Oʻzbekiston vaqti bilan (UTC+5) — tashrif buyuruvchi qaysi mamlakatda boʻlishidan qatʼi nazar toʻgʻri hisoblanadi */
    isoDate: "2026-09-22T14:00:00+05:00",
  },
  venue: {
    name: "Uzoq Ota toʻyxonasi",
    district: "Urgut tumani",
    neighborhood: "Quyi Tegana mahallasi",
    /**
     * Toʻyxonaning ANIQ koordinatasi (Plus Code: F69J+M2F).
     * Diqqat: quyidagi embed havolasidagi `@39.4689452,67.2303216` — bu
     * xaritaning markazi, toʻyxonaning oʻzi emas. Oʻsha markaz ishlatilsa,
     * Google navigatsiyani qoʻshni hovliga (F69J+H5) olib boradi.
     */
    coords: { lat: 39.4691926, lng: 67.2300571 },
    shortLink: "https://maps.app.goo.gl/pPtoV1kJ82ysznqR6",
    embedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1087.3932493065224!2d67.23032159927324!3d39.46894518352191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4cd1df9f7cb157%3A0x9521f226b6c6e49!2sUzoq%20ota%20tuyxonasi!5e0!3m2!1suz!2s!4v1788721896266!5m2!1suz!2s",
  },
  contact: {
    phone: "+998 91 035 12 02",
    /** tel: havolasi uchun — boʻshliqlarsiz */
    phoneHref: "+998910351202",
  },
  site: {
    url: "https://taklifnoma-nikoh-toy.vercel.app",
    title: "Rizoyev Diyorbek | Nikoh Toʻyi",
    description:
      "Rizoyev Diyorbekning nikoh toʻyiga taklifnoma. 22-sentabr, 2026-yil, soat 14:00. Uzoq Ota toʻyxonasi.",
  },
} as const;

/** Telefonda navigatsiya ilovasini ochadigan havola */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${wedding.venue.coords.lat},${wedding.venue.coords.lng}`;

/** Taklifnoma matni — beshta gap */
export const invitationText = [
  "Hayotimizdagi eng quvonchli va unutilmas kunlardan biri — nikoh toʻyimiz arafasidamiz.",
  "Ushbu qutlugʻ marosimni eng yaqin va aziz insonlarimiz davrasida nishonlashni orzu qilamiz.",
  "Sizning tashrifingiz bizning xursandchiligimizga xursandchilik qoʻshadi.",
  "Belgilangan kunda dasturxonimiz atrofida sizni koʻrishdan behad baxtiyor boʻlamiz.",
  "Kelishingizni sabrsizlik bilan kutib qolamiz!",
] as const;
