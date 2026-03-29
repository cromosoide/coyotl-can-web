import type { Metadata } from "next";
import LandingConsultaClient from "./LandingConsultaClient";

export const metadata: Metadata = {
  title: "Veterinaria en Lindavista · Consulta desde $250 · Coyotl Can",
  description:
    "¿Tu mascota tiene síntomas? Atención veterinaria integral hoy en Lindavista, CDMX. Consulta desde $250. Intervención de mínima invasión con +500 casos exitosos.",
};

export default function Page() {
  return <LandingConsultaClient />;
}
