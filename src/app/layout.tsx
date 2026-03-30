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
    "Clínica veterinaria integral en Lindavista, CDMX. Consulta, intervención de mínima invasión, estancia, estética y vacunación. Agenda tu cita hoy. Medicina con alma.",
  keywords:
    "veterinario lindavista, clínica veterinaria CDMX, veterinario GAM, veterinario cerca de mí, estancia mascotas CDMX, estética canina lindavista, vacunación mascotas, coyotl can",
  authors: [{ name: "Coyotl Can" }],
  creator: "Nébulab",
  metadataBase: new URL("https://coyotl-can.vercel.app"),
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://coyotl-can.vercel.app",
    siteName: "Coyotl Can",
    title: "Coyotl Can · Clínica Veterinaria Integral · Lindavista CDMX",
    description:
      "Atención veterinaria integral con el trato que tu mascota merece. Consulta, estancia, estética y preventivos en Lindavista.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coyotl Can · Clínica Veterinaria Integral",
    description: "Medicina con alma. Agenda tu cita en Lindavista, CDMX.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://coyotl-can.vercel.app",
  },
};

const jsonLdVet = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  name: "Coyotl Can · Clínica Veterinaria Integral",
  description:
    "Clínica veterinaria integral en Lindavista, CDMX. Consulta, intervención de mínima invasión, estancia, estética y vacunación.",
  url: "https://coyotl-can.vercel.app",
  telephone: "+525534461745",
  email: "hola@coyotlcan.mx",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Irapuato 11",
    addressLocality: "Lindavista",
    addressRegion: "Ciudad de México",
    postalCode: "07300",
    addressCountry: "MX",
  },
  geo: { "@type": "GeoCoordinates", latitude: 19.4883, longitude: -99.1321 },
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
  currenciesAccepted: "MXN",
  paymentAccepted: "Efectivo, Tarjeta",
  image: "https://coyotl-can.vercel.app/opengraph-image",
  sameAs: [
    "https://www.instagram.com/coyotlcan",
    "https://www.facebook.com/coyotlcan",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios Veterinarios",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Consulta Veterinaria General",
          description: "Revisión completa de tu mascota con seguimiento personalizado",
          offers: { "@type": "Offer", price: "250", priceCurrency: "MXN" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Estancia Coyotl",
          description: "Cuidado profesional para tu mascota. Con profesionales que los cuidan como propios.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Estética Coyotl",
          description: "Baño, corte y cuidado integral del pelaje",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Vacunación",
          description: "Esquema de vacunación completo para perros y gatos",
        },
      },
    ],
  },
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "¿Cuánto cuesta la consulta veterinaria en Lindavista?", acceptedAnswer: { "@type": "Answer", text: "La consulta veterinaria general en Coyotl Can tiene un costo de $250 MXN. Incluye revisión completa de tu mascota y seguimiento personalizado. Somos una de las clínicas con mejor relación calidad-precio en Lindavista y Gustavo A. Madero." } },
    { "@type": "Question", name: "¿Necesito hacer cita o puedo llegar directamente?", acceptedAnswer: { "@type": "Answer", text: "Te recomendamos agendar tu cita desde nuestra página web o por WhatsApp al 56 3446 1745 para garantizar tu horario. También puedes llegar sin cita pero podrías tener que esperar." } },
    { "@type": "Question", name: "¿Qué es la Estancia Coyotl y cómo funciona?", acceptedAnswer: { "@type": "Answer", text: "Es nuestro servicio de cuidado profesional para tu mascota cuando sales de viaje. Incluye alimentación personalizada, espacio cómodo y una foto diaria por WhatsApp. Con profesionales que los cuidan como propios." } },
    { "@type": "Question", name: "¿Atienden gatos además de perros?", acceptedAnswer: { "@type": "Answer", text: "Sí, atendemos perros y gatos. Contamos con espacios diferenciados para que los felinos se sientan cómodos y seguros durante su visita." } },
    { "@type": "Question", name: "¿Qué servicios de estética canina ofrecen?", acceptedAnswer: { "@type": "Answer", text: "Estética Coyotl ofrece baño, corte, cepillado, limpieza de oídos y cuidado integral del pelaje. Al estar dentro de una clínica veterinaria, si detectamos algún problema durante el servicio te avisamos de inmediato." } },
    { "@type": "Question", name: "¿Cuál es el horario de atención de la clínica?", acceptedAnswer: { "@type": "Answer", text: "Lunes a sábado de 9:00 a 20:00 hrs. Domingos de 10:00 a 14:00 hrs." } },
    { "@type": "Question", name: "¿Dónde están ubicados exactamente?", acceptedAnswer: { "@type": "Answer", text: "Coyotl Can está en Irapuato 11, colonia Lindavista, alcaldía Gustavo A. Madero, Ciudad de México, C.P. 07300. A una cuadra del metro Lindavista (Línea 6)." } },
    { "@type": "Question", name: "¿Ofrecen servicio de vacunación para perros y gatos?", acceptedAnswer: { "@type": "Answer", text: "Sí, ofrecemos esquemas de vacunación completos para perros y gatos: vacuna múltiple, antirrábica, leptospirosis y más. La vacunación empieza desde las 6-8 semanas de edad." } },
    { "@type": "Question", name: "¿Puedo pagar con tarjeta?", acceptedAnswer: { "@type": "Answer", text: "Sí, aceptamos efectivo y tarjeta de débito/crédito." } },
    { "@type": "Question", name: "¿Cómo puedo agendar mi cita?", acceptedAnswer: { "@type": "Answer", text: "Puedes agendar desde nuestra página web seleccionando fecha y hora disponible, por WhatsApp al 56 3446 1745, o llamando al 55 5754 5221." } },
    { "@type": "Question", name: "¿Qué es la intervención de mínima invasión?", acceptedAnswer: { "@type": "Answer", text: "Es una técnica veterinaria avanzada con incisiones muy pequeñas que permite menos dolor, recuperación más rápida (8-10 días) y menor riesgo. En Coyotl Can llevamos más de 500 intervenciones exitosas." } },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${nunito.variable} h-full antialiased`}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdVet) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
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
