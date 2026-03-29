import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureBar from "@/components/FeatureBar";
import ServiciosPrincipales from "@/components/ServiciosPrincipales";
import NumeroStats from "@/components/NumeroStats";
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
      <Navbar />
      <Hero />
      <FeatureBar />
      <ServiciosPrincipales />
      <NumeroStats />
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
