import { CONTACTO, STATS } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative bg-violeta-oscuro overflow-hidden" style={{ backgroundColor: "#2d0057" }}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d0057] via-[#3d0077] to-[#8002f2] opacity-80" />

      <div className="relative mx-auto max-w-6xl px-4 pb-6 pt-20 sm:px-6 sm:pb-12 sm:pt-28 lg:px-8">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-[#70b62c]" />
          Clínica Veterinaria Integral · Lindavista, CDMX
        </div>

        {/* Heading */}
        <h1 className="mb-4 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Cuidamos a tu familia animal con el trato que merece
        </h1>

        <p className="mb-8 max-w-xl text-base text-white/80 sm:text-lg">
          Atención veterinaria integral con tecnología y empatía. Consulta, estancia, estética y
          servicios preventivos en un solo lugar.
        </p>

        {/* CTAs */}
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href={CONTACTO.whatsappMensaje}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e5006b] px-7 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-[#cc005f] hover:shadow-xl active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Agendar cita por WhatsApp
          </a>
          <a
            href={CONTACTO.telefonoLink}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-7 py-4 text-base font-bold text-white transition-all hover:border-white/60 hover:bg-white/10 active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Llamar ahora
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 text-white/70">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-white">{STATS.experiencia}</span>
            <span className="text-sm">años de<br />experiencia</span>
          </div>
          <div className="h-10 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-white">{STATS.familias}</span>
            <span className="text-sm">familias<br />atendidas</span>
          </div>
        </div>

        {/* Address */}
        <p className="mt-6 flex items-center gap-2 text-sm text-white/60">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {CONTACTO.direccionCorta}
        </p>
      </div>
    </section>
  );
}
