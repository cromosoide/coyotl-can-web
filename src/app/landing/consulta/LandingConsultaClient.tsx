"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONTACTO } from "@/lib/constants";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Resenas from "@/components/Resenas";
import MapaContacto from "@/components/MapaContacto";
import AgendaModal from "@/components/AgendaModal";

export default function LandingConsultaClient() {
  const prefersReduced = useReducedMotion();
  const [showAgenda, setShowAgenda] = useState(false);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32" style={{ backgroundColor: "#ff006b" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff006b] via-[#d4005a] to-[#a80047] opacity-90" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }} />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          {/* Pulsing urgency badge */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm"
          >
            <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-white" />
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
            <button
              onClick={() => setShowAgenda(true)}
              className="animate-pulse-soft inline-flex items-center gap-3 rounded-2xl bg-[#8b00fb] px-10 py-5 text-lg font-bold text-white shadow-xl shadow-[#8b00fb]/30 transition-all hover:bg-[#7400d4] hover:shadow-2xl active:scale-95"
            >
              📋 Agendar consulta ahora
            </button>
          </motion.div>
        </div>
      </section>

      {/* Diferenciación */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { icono: "🩺", titulo: "Revisión completa", texto: "Atención integral desde la primera consulta", color: "#ff006b" },
              { icono: "💜", titulo: "Medicina con alma", texto: "Tecnología y empatía para tu mascota", color: "#8b00fb" },
              { icono: "💜", titulo: "Trato humano", texto: "Tecnología y empatía para tu mascota", color: "#4bbb00" },
            ].map((item, i) => (
              <ScrollReveal key={item.titulo} delay={i * 0.1}>
                <div className="rounded-3xl border border-[#ff006b]/10 bg-[#fafafa] p-7 text-center">
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
              { target: 500, suffix: "+", label: "Intervenciones exitosas", color: "#ff006b" },
              { target: 10, suffix: " días", prefix: "8-", label: "Recuperación promedio", sublabel: "vs 30+ días método tradicional", color: "#8b00fb" },
              { target: 90, suffix: "%", label: "Menos molestias", sublabel: "post-procedimiento", color: "#4bbb00" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.12}>
                <div className="rounded-3xl border border-[#ff006b]/10 bg-white p-8 text-center shadow-sm">
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
            <button
              onClick={() => setShowAgenda(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#8b00fb] px-9 py-4 font-bold text-white shadow-xl shadow-[#8b00fb]/20 transition-all hover:bg-[#7400d4] active:scale-95"
            >
              📋 Ver disponibilidad de agenda
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* Reseñas */}
      <Resenas limit={3} />

      {/* Mapa */}
      <MapaContacto />

      {/* Mini footer */}
      <footer className="bg-[#ff006b] py-8 text-center">
        <p className="text-xs text-white/40">
          &copy; {new Date().getFullYear()} Coyotl Can · Clínica Veterinaria Integral · Lindavista, CDMX
        </p>
      </footer>

      <AgendaModal open={showAgenda} onClose={() => setShowAgenda(false)} defaultService="Consulta General" />
    </main>
  );
}
