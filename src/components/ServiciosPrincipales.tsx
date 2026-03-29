import { SERVICIOS } from "@/lib/constants";
import ServiceCard from "./ServiceCard";

export default function ServiciosPrincipales() {
  return (
    <section id="servicios" className="bg-[#fafafa] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#e5006b]">
            Nuestros Servicios
          </p>
          <h2 className="mb-4 text-2xl font-extrabold text-[#2d0057] sm:text-3xl md:text-4xl">
            Atención veterinaria integral
          </h2>
          <p className="mx-auto max-w-2xl text-[#555]">
            Tecnología de vanguardia con el cariño y calidez que tu mascota merece
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICIOS.map((servicio) => (
            <ServiceCard key={servicio.id} {...servicio} />
          ))}
        </div>
      </div>
    </section>
  );
}
