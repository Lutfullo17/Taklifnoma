import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Manrope } from "next/font/google";
import { wedding } from "@/lib/wedding";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(wedding.site.url),
  title: wedding.site.title,
  description: wedding.site.description,
  applicationName: "Nikoh taklifnomasi",
  authors: [{ name: wedding.groom.fullName }],
  keywords: [
    "nikoh toʻyi",
    "taklifnoma",
    "Rizoyev Diyorbek",
    "Urgut",
    "Quyi Tegana",
    "Uzoq Ota toʻyxonasi",
    "toʻy 2026",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: wedding.site.url,
    siteName: wedding.site.title,
    title: wedding.site.title,
    description: wedding.site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: wedding.site.title,
    description: wedding.site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fdfaf4",
  colorScheme: "light",
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${wedding.groom.fullName} — ${wedding.event.title}`,
  description: wedding.site.description,
  startDate: wedding.event.isoDate,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: wedding.venue.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: wedding.venue.neighborhood,
      addressLocality: wedding.venue.district,
      addressRegion: "Samarqand viloyati",
      addressCountry: "UZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: wedding.venue.coords.lat,
      longitude: wedding.venue.coords.lng,
    },
  },
  organizer: { "@type": "Person", name: wedding.groom.fullName },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="uz"
      className={`${cinzel.variable} ${cormorant.variable} ${manrope.variable}`}
    >
      <body className="antialiased">
        {/* JavaScript oʻchirilgan boʻlsa ham butun matn koʻrinadi */}
        <noscript>
          <style>{`
            [style*="opacity:0"], [style*="opacity: 0"] {
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
            }
            .preloader-root { display: none !important; }
          `}</style>
        </noscript>

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
