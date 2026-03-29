import type { Metadata } from "next";
import { CONTACTO, STATS } from "@/lib/constants";
import Resenas from "@/components/Resenas";
import MapaContacto from "@/components/MapaContacto";

export const metadata: Metadata = {
  title: "Veterinaria en Lindavista · Consulta desde $250 · Coyotl Can",
  description:
    "¿Tu mascota tiene síntomas? Atención veterinaria integral hoy en Lindavista, CDMX. Consulta desde $250. Intervención de mínima invasión con +500 casos exitosos.",
};

export default function LandingConsulta() {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-16 sm:py-24" style={{ backgroundColor: "#2d0057" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d0057] via-[#3d0077] to-[#8002f2] opacity-80" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-[#70b62c]" />
            Lindavista, CDMX
          </div>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            ¿Tu mascota tiene síntomas?
          </h1>
          <p className="mb-3 text-xl font-bold text-white/90">
            Atención veterinaria hoy en Lindavista
          </p>
          <p className="mb-8 text-white/70">
            Revisión completa, estudios y seguimiento personalizado
          </p>

          {/* Price */}
          <div className="mb-8 inline-flex items-baseline gap-1 rounded-2xl bg-white/10 px-6 py-3 backdrop-blur-sm">
            <span className="text-sm text-white/70">Consulta desde</span>
            <span className="text-3xl font-extrabold text-white">$250</span>
          </div>

          {/* CTA */}
          <div>
            <a
              href={CONTACTO.whatsappMensaje}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl bg-[#e5006b] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#cc005f] hover:shadow-xl active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Agendar consulta por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Diferenciación */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icono: "🩺", titulo: "Revisión completa", texto: "Atención integral desde la primera consulta" },
              { icono: "⚡", titulo: "Resultados el mismo día", texto: "Estudios y laboratorio interno" },
              { icono: "💜", titulo: "Trato humano", texto: "Tecnología y empatía para tu mascota" },
            ].map((item) => (
              <div key={item.titulo} className="text-center">
                <span className="mb-2 block text-3xl">{item.icono}</span>
                <p className="font-bold text-[#2d0057]">{item.titulo}</p>
                <p className="text-sm text-[#555]">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ¿Por qué intervención de mínima invasión? */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-extrabold text-[#2d0057] sm:text-3xl">
            ¿Por qué elegir intervención de mínima invasión?
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <p className="mb-1 text-3xl font-extrabold text-[#e5006b]">{STATS.intervenciones}</p>
              <p className="text-sm font-bold text-[#2d0057]">Intervenciones exitosas</p>
            </div>
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <p className="mb-1 text-3xl font-extrabold text-[#8002f2]">8-10 días</p>
              <p className="text-sm font-bold text-[#2d0057]">Recuperación promedio</p>
              <p className="mt-1 text-xs text-[#555]">vs 30+ días método tradicional</p>
            </div>
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <p className="mb-1 text-3xl font-extrabold text-[#70b62c]">90%</p>
              <p className="text-sm font-bold text-[#2d0057]">Menos molestias</p>
              <p className="mt-1 text-xs text-[#555]">post-procedimiento</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href={CONTACTO.whatsappMensaje}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#e5006b] px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#cc005f] active:scale-95"
            >
              Ver disponibilidad de agenda
            </a>
          </div>
        </div>
      </section>

      {/* Reseñas */}
      <Resenas limit={3} />

      {/* Mapa */}
      <MapaContacto />

      {/* Mini footer */}
      <footer className="py-6 text-center text-xs text-[#555]" style={{ backgroundColor: "#2d0057" }}>
        <p className="text-white/50">
          &copy; {new Date().getFullYear()} Coyotl Can · Clínica Veterinaria Integral · Lindavista, CDMX
        </p>
      </footer>
    </main>
  );
}
