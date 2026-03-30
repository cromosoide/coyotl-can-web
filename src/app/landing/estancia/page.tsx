import type { Metadata } from "next";
import LandingEstanciaClient from "./LandingEstanciaClient";

export const metadata: Metadata = {
  title: "Estancia para Mascotas en Lindavista · Coyotl Can",
  description:
    "Estancia Coyotl: con profesionales que los cuidan como propios. Cuidado profesional, alimentación incluida y foto diaria. Reserva tu lugar.",
  openGraph: {
    title: "Estancia para Mascotas en Lindavista · Coyotl Can",
    description: "Estancia Coyotl: con profesionales que los cuidan como propios.",
  },
};

export default function Page() {
  return <LandingEstanciaClient />;
}
