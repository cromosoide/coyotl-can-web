import type { Metadata } from "next";
import LandingConsultaClient from "./LandingConsultaClient";

export const metadata: Metadata = {
  title: "Veterinario en Lindavista · Consulta Hoy · Coyotl Can",
  description:
    "Atención veterinaria hoy en Lindavista, CDMX. Consulta desde $250. Revisión completa y seguimiento personalizado. Agenda en segundos.",
  openGraph: {
    title: "Veterinario en Lindavista · Consulta Hoy · Coyotl Can",
    description: "Atención veterinaria hoy en Lindavista. Consulta desde $250.",
  },
};

export default function Page() {
  return <LandingConsultaClient />;
}
