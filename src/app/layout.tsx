import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Coyotl Can · Clínica Veterinaria Integral · Lindavista CDMX",
  description:
    "Clínica veterinaria integral en Lindavista, CDMX. Consulta médica, estancia, estética y servicios preventivos. Cuidamos a tu familia animal con el trato que merece.",
  keywords: [
    "veterinaria lindavista",
    "clínica veterinaria cdmx",
    "veterinario lindavista",
    "estancia mascotas cdmx",
    "grooming cdmx",
    "vacunación mascotas",
    "coyotl can",
  ],
  openGraph: {
    title: "Coyotl Can · Clínica Veterinaria Integral",
    description:
      "Cuidamos a tu familia animal con el trato que merece. Atención veterinaria integral en Lindavista, CDMX.",
    locale: "es_MX",
    type: "website",
    siteName: "Coyotl Can",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  name: "Coyotl Can",
  description:
    "Clínica veterinaria integral en Lindavista, CDMX. Consulta médica, estancia, estética y servicios preventivos.",
  url: "https://coyotlcan.mx",
  telephone: "+525557545221",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Irapuato 11",
    addressLocality: "Lindavista",
    addressRegion: "CDMX",
    postalCode: "07300",
    addressCountry: "MX",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.4875,
    longitude: -99.1297,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "14:00",
    },
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${nunito.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <WhatsAppButton />

        {/* Google Analytics 4 — reemplazar GA_MEASUREMENT_ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>

        {/* Meta Pixel — reemplazar META_PIXEL_ID */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'META_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  );
}
