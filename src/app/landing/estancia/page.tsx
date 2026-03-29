import type { Metadata } from "next";
import { CONTACTO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Estancia Coyotl · Tu mascota en las mejores manos · Lindavista CDMX",
  description:
    "Tú al mar, ellos con nosotros. Estancia profesional para tu mascota en Lindavista, CDMX. Cuidado profesional, alimentación y foto diaria.",
};

export default function LandingEstancia() {
  const whatsappEstancia = `${CONTACTO.whatsappLink}?text=${encodeURIComponent("Hola, quiero reservar una estancia para mi mascota")}`;

  return (
    <main>
      {/* Hero */}
      <section className="relative py-16 sm:py-24" style={{ backgroundColor: "#8002f2" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#8002f2] via-[#6a01cc] to-[#2d0057] opacity-90" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-[#fab200]" />
            Estancia Coyotl · Lindavista
          </div>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            Tú al mar, ellos con nosotros
          </h1>
          <p className="mb-8 text-lg text-white/80">
            Con profesionales que los cuidan como propios
          </p>

          <a
            href={whatsappEstancia}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-bold text-[#8002f2] shadow-lg transition-all hover:bg-white/90 hover:shadow-xl active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="#25D366" className="h-6 w-6">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Reservar Estancia
          </a>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-extrabold text-[#2d0057]">
            ¿Qué incluye la Estancia Coyotl?
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icono: "🐾",
                titulo: "Cuidado profesional",
                texto: "Personal capacitado las 24 horas atendiendo a tu mascota",
              },
              {
                icono: "🍽️",
                titulo: "Alimentación personalizada",
                texto: "Respetamos la dieta y horarios de tu mascota",
              },
              {
                icono: "📸",
                titulo: "Foto diaria",
                texto: "Te enviamos una foto de tu mascota cada día por WhatsApp",
              },
            ].map((item) => (
              <div
                key={item.titulo}
                className="rounded-2xl border border-gray-100 bg-[#f5f5f5] p-6 text-center"
              >
                <span className="mb-3 block text-3xl">{item.icono}</span>
                <p className="mb-2 font-bold text-[#2d0057]">{item.titulo}</p>
                <p className="text-sm text-[#555]">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgencia */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#fab200]/20 px-4 py-2 text-sm font-bold text-[#2d0057]">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#fab200]" />
            Lugares limitados
          </div>
          <h2 className="mb-4 text-2xl font-extrabold text-[#2d0057] sm:text-3xl">
            Reserva con anticipación
          </h2>
          <p className="mb-8 text-[#555]">
            En temporada alta los lugares se llenan rápido. Asegura el espacio de tu mascota hoy.
          </p>
          <a
            href={whatsappEstancia}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#e5006b] px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#cc005f] active:scale-95"
          >
            Reservar ahora por WhatsApp
          </a>
        </div>
      </section>

      {/* Mini footer */}
      <footer className="py-6 text-center" style={{ backgroundColor: "#2d0057" }}>
        <p className="text-xs text-white/50">
          &copy; {new Date().getFullYear()} Coyotl Can · Clínica Veterinaria Integral · Lindavista, CDMX
        </p>
      </footer>
    </main>
  );
}
