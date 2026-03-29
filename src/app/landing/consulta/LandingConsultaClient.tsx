"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CONTACTO } from "@/lib/constants";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Resenas from "@/components/Resenas";
import MapaContacto from "@/components/MapaContacto";

export default function LandingConsultaClient() {
  const prefersReduced = useReducedMotion();

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32" style={{ backgroundColor: "#2d0057" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d0057] via-[#3d0077] to-[#8002f2] opacity-80" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle, #e5006b 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }} />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          {/* Pulsing urgency badge */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#e5006b]/40 bg-[#e5006b]/15 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm"
          >
            <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-[#e5006b]" />
            Atención hoy · Lindavista, CDMX
          </motion.div>

          <motion.h1
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            ¿Tu mascota tiene síntomas?
          </motion.h1>

          <motion.p
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-4 text-xl font-bold text-white/90"
          >
            Atención veterinaria hoy en Lindavista
          </motion.p>

          <motion.p
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-10 text-white/60"
          >
            Revisión completa, estudios y seguimiento personalizado
          </motion.p>

          {/* Price */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mb-10 inline-flex items-baseline gap-2 rounded-3xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-sm"
          >
            <span className="text-sm text-white/60">Consulta desde</span>
            <span className="text-4xl font-extrabold text-white">$250</span>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <a
              href={CONTACTO.whatsappMensaje}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-pulse-soft inline-flex items-center gap-3 rounded-2xl bg-[#8002f2] px-10 py-5 text-lg font-bold text-white shadow-xl shadow-[#8002f2]/30 transition-all hover:bg-[#6a01cc] hover:shadow-2xl active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Agendar consulta por WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Diferenciación */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { icono: "🩺", titulo: "Revisión completa", texto: "Atención integral desde la primera consulta", color: "#e5006b" },
              { icono: "⚡", titulo: "Resultados el mismo día", texto: "Estudios y laboratorio interno", color: "#8002f2" },
              { icono: "💜", titulo: "Trato humano", texto: "Tecnología y empatía para tu mascota", color: "#70b62c" },
            ].map((item, i) => (
              <ScrollReveal key={item.titulo} delay={i * 0.1}>
                <div className="rounded-3xl border border-[#e5006b]/10 bg-[#fafafa] p-7 text-center">
                  <span className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-2xl" style={{ backgroundColor: `${item.color}15` }}>
                    {item.icono}
                  </span>
                  <p className="mb-1 font-extrabold text-[#2d0057]">{item.titulo}</p>
                  <p className="text-sm text-[#555]">{item.texto}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ¿Por qué intervención de mínima invasión? */}
      <section className="bg-[#fafafa] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl">
              ¿Por qué elegir intervención de mínima invasión?
            </h2>
          </ScrollReveal>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { target: 500, suffix: "+", label: "Intervenciones exitosas", color: "#e5006b" },
              { target: 10, suffix: " días", prefix: "8-", label: "Recuperación promedio", sublabel: "vs 30+ días método tradicional", color: "#8002f2" },
              { target: 90, suffix: "%", label: "Menos molestias", sublabel: "post-procedimiento", color: "#70b62c" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.12}>
                <div className="rounded-3xl border border-[#e5006b]/10 bg-white p-8 text-center shadow-sm">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    className="block text-4xl font-extrabold"
                    duration={2}
                  />
                  <div className="mx-auto my-3 h-1 w-10 rounded-full" style={{ backgroundColor: stat.color }} />
                  <p className="text-sm font-bold text-[#2d0057]">{stat.label}</p>
                  {stat.sublabel && <p className="mt-1 text-xs text-[#555]">{stat.sublabel}</p>}
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3} className="mt-10 text-center">
            <a
              href={CONTACTO.whatsappMensaje}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#8002f2] px-9 py-4 font-bold text-white shadow-xl shadow-[#8002f2]/20 transition-all hover:bg-[#6a01cc] active:scale-95"
            >
              Ver disponibilidad de agenda
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Reseñas */}
      <Resenas limit={3} />

      {/* Mapa */}
      <MapaContacto />

      {/* Mini footer */}
      <footer className="bg-[#2d0057] py-8 text-center">
        <p className="text-xs text-white/40">
          &copy; {new Date().getFullYear()} Coyotl Can · Clínica Veterinaria Integral · Lindavista, CDMX
        </p>
      </footer>
    </main>
  );
}
