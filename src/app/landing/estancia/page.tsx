import type { Metadata } from "next";
import LandingEstanciaClient from "./LandingEstanciaClient";

export const metadata: Metadata = {
  title: "Estancia Coyotl · Tu mascota en las mejores manos · Lindavista CDMX",
  description:
    "Tú al mar, ellos con nosotros. Estancia profesional para tu mascota en Lindavista, CDMX. Cuidado profesional, alimentación y foto diaria.",
};

export default function Page() {
  return <LandingEstanciaClient />;
}
