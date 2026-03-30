import type { Metadata } from "next";
import LandingConsultaClient from "./LandingConsultaClient";

export const metadata: Metadata = {
  title: "Veterinario en Lindavista · Consulta Hoy desde $250 · Coyotl Can",
  description:
    "Atención veterinaria hoy en Lindavista, CDMX. Consulta desde $250. Revisión completa y seguimiento personalizado. Agenda en segundos. Clínica veterinaria en Gustavo A. Madero.",
  keywords: "veterinario lindavista, consulta veterinaria CDMX, veterinario GAM, veterinario cerca de mí, coyotl can",
  openGraph: {
    title: "Veterinario en Lindavista · Consulta Hoy · Coyotl Can",
    description: "Atención veterinaria hoy en Lindavista. Consulta desde $250. Agenda en segundos.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veterinario en Lindavista · Consulta Hoy · Coyotl Can",
    description: "Consulta veterinaria desde $250 en Lindavista, CDMX.",
  },
  alternates: {
    canonical: "https://coyotl-can.vercel.app/landing/consulta",
  },
};

export default function Page() {
  return <LandingConsultaClient />;
}
