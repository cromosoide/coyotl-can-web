"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CONTACTO } from "@/lib/constants";
import ScrollReveal from "./animations/ScrollReveal";

const features = [
  { icono: "🐾", texto: "Cuidado profesional las 24 horas" },
  { icono: "🍽️", texto: "Alimentación personalizada" },
  { icono: "📸", texto: "Foto diaria de tu mascota" },
];

export default function EstanciaDestacada() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="animate-gradient-shift relative overflow-hidden py-20 sm:py-28"
      style={{ background: "linear-gradient(135deg, #8b00fb, #7400d4, #8b00fb, #a033fc)" }}
    >
      {/* Decorative circles */}
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/5" />
      <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/5" />
      <div className="absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-[#ff006b]/10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold text-white/90 backdrop-blur-sm">
              Estancia Coyotl
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              Con profesionales que los cuidan como propios
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mb-12 text-lg text-white/70">
              Mientras tú descansas o viajas, tu mascota está en las mejores manos.
            </p>
          </ScrollReveal>

          {/* Features from sides */}
          <div className="mb-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-10">
            {features.map((f, i) => (
              <motion.div
                key={f.texto}
                initial={prefersReduced ? {} : {
                  opacity: 0,
                  x: i === 0 ? -40 : i === 2 ? 40 : 0,
                  y: i === 1 ? 20 : 0,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 backdrop-blur-sm"
              >
                <span className="text-2xl">{f.icono}</span>
                <span className="text-sm font-semibold text-white">{f.texto}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA — violeta botón sobre fondo violeta = blanco */}
          <ScrollReveal delay={0.4}>
            <a
              href={`${CONTACTO.whatsappLink}?text=${encodeURIComponent("Hola, quiero reservar una estancia para mi mascota")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl bg-white px-9 py-4 text-base font-bold text-[#8b00fb] shadow-xl transition-all hover:bg-white/90 hover:shadow-2xl active:scale-95 sm:text-lg"
            >
              <svg viewBox="0 0 24 24" fill="#25D366" className="h-5 w-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Reservar Estancia
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
