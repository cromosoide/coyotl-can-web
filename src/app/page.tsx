import Hero from "@/components/Hero";
import FeatureBar from "@/components/FeatureBar";
import ServiciosPrincipales from "@/components/ServiciosPrincipales";
import EquipoCoyotl from "@/components/EquipoCoyotl";
import OtrosServicios from "@/components/OtrosServicios";
import EstanciaDestacada from "@/components/EstanciaDestacada";
import Resenas from "@/components/Resenas";
import BlogPreview from "@/components/BlogPreview";
import MapaContacto from "@/components/MapaContacto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureBar />
      <ServiciosPrincipales />
      <EquipoCoyotl />
      <OtrosServicios />
      <EstanciaDestacada />
      <Resenas />
      <BlogPreview />
      <MapaContacto />
      <Footer />
    </>
  );
}
