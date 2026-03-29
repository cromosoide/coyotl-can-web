"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CONTACTO } from "@/lib/constants";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function LandingEstanciaClient() {
  const prefersReduced = useReducedMotion();
  const whatsappEstancia = `${CONTACTO.whatsappLink}?text=${encodeURIComponent("Hola, quiero reservar una estancia para mi mascota")}`;

  return (
    <main>
      {/* Hero */}
      <section
        className="animate-gradient-shift relative overflow-hidden py-20 sm:py-28 lg:py-32"
        style={{ background: "linear-gradient(135deg, #8002f2, #6a01cc, #8002f2, #9a33f5)" }}
      >
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute right-1/4 top-1/2 h-40 w-40 rounded-full bg-[#e5006b]/10" />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-bold text-white/90 backdrop-blur-sm"
          >
            <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-[#fab200]" />
            Estancia Coyotl · Lindavista
          </motion.div>

          <motion.h1
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Tú al mar, ellos con nosotros
          </motion.h1>

          <motion.p
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-10 text-xl text-white/70"
          >
            Con profesionales que los cuidan como propios
          </motion.p>

          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <a
              href={whatsappEstancia}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-5 text-lg font-bold text-[#8002f2] shadow-xl transition-all hover:bg-white/90 hover:shadow-2xl active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="#25D366" className="h-6 w-6">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Reservar Estancia
            </a>
          </motion.div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl">
              ¿Qué incluye la Estancia Coyotl?
            </h2>
          </ScrollReveal>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { icono: "🐾", titulo: "Cuidado profesional", texto: "Personal capacitado las 24 horas atendiendo a tu mascota" },
              { icono: "🍽️", titulo: "Alimentación personalizada", texto: "Respetamos la dieta y horarios de tu mascota" },
              { icono: "📸", titulo: "Foto diaria", texto: "Te enviamos una foto de tu mascota cada día por WhatsApp" },
            ].map((item, i) => (
              <ScrollReveal key={item.titulo} delay={i * 0.12}>
                <div className="rounded-3xl border border-[#8002f2]/10 bg-[#fafafa] p-7 text-center transition-shadow hover:shadow-lg">
                  <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8002f2]/10 text-2xl">
                    {item.icono}
                  </span>
                  <p className="mb-2 font-extrabold text-[#2d0057]">{item.titulo}</p>
                  <p className="text-sm text-[#555]">{item.texto}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Urgencia */}
      <section className="bg-[#fafafa] py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <ScrollReveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#fab200]/30 bg-[#fab200]/10 px-5 py-2.5 text-sm font-bold text-[#2d0057]">
              <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-[#fab200]" />
              Lugares limitados
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl">
              Reserva con anticipación
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mb-10 text-lg text-[#555]">
              En temporada alta los lugares se llenan rápido. Asegura el espacio de tu mascota hoy.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <a
              href={whatsappEstancia}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#8002f2] px-9 py-4 font-bold text-white shadow-xl shadow-[#8002f2]/20 transition-all hover:bg-[#6a01cc] active:scale-95"
            >
              Reservar ahora por WhatsApp
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Mini footer */}
      <footer className="bg-[#2d0057] py-8 text-center">
        <p className="text-xs text-white/40">
          &copy; {new Date().getFullYear()} Coyotl Can · Clínica Veterinaria Integral · Lindavista, CDMX
        </p>
      </footer>
    </main>
  );
}
