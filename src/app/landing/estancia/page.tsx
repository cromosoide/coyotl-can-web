import type { Metadata } from "next";
import LandingEstanciaClient from "./LandingEstanciaClient";

export const metadata: Metadata = {
  title: "Estancia para Mascotas en Lindavista CDMX · Coyotl Can",
  description:
    "Estancia Coyotl: con profesionales que los cuidan como propios. Cuidado profesional, alimentación incluida y foto diaria. Reserva tu lugar en Lindavista, Gustavo A. Madero.",
  keywords: "estancia mascotas CDMX, estancia perros lindavista, cuidado mascotas viaje, estancia coyotl",
  openGraph: {
    title: "Estancia para Mascotas en Lindavista · Coyotl Can",
    description: "Estancia Coyotl: con profesionales que los cuidan como propios. Reserva tu lugar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estancia para Mascotas · Coyotl Can · Lindavista",
    description: "Cuidado profesional para tu mascota mientras no estás.",
  },
  alternates: {
    canonical: "https://coyotl-can.vercel.app/landing/estancia",
  },
};

export default function Page() {
  return <LandingEstanciaClient />;
}
