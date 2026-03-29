"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CONTACTO } from "@/lib/constants";
import AnimatedCounter from "./animations/AnimatedCounter";

const taglineWords = "Cuidamos a tu familia animal con el trato que merece".split(" ");

export default function Hero() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#ff006b]">
      {/* Gradient background — rosa protagonista */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff006b] via-[#d4005a] to-[#a80047] opacity-90" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pb-28 lg:pt-44">
        {/* Badge */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm"
        >
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
          Clínica Veterinaria Integral · Lindavista, CDMX
        </motion.div>

        {/* Tagline — word by word */}
        <h1 className="mb-6 max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {taglineWords.map((word, i) => (
            <motion.span
              key={i}
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              className="mr-[0.3em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mb-10 max-w-xl text-lg text-white/70 sm:text-xl"
        >
          Atención veterinaria integral con tecnología y empatía. Consulta, estancia, estética y
          servicios preventivos en un solo lugar.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="mb-14 flex flex-col gap-4 sm:flex-row sm:gap-5"
        >
          <a
            href={CONTACTO.whatsappMensaje}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-pulse-soft inline-flex items-center justify-center gap-2 rounded-2xl bg-[#8b00fb] px-8 py-4 text-base font-bold text-white shadow-xl shadow-[#8b00fb]/30 transition-all hover:bg-[#7400d4] hover:shadow-2xl active:scale-95 sm:text-lg"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Agendar cita por WhatsApp
          </a>
          <a
            href={CONTACTO.telefonoLink}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/40 px-8 py-4 text-base font-bold text-white transition-all hover:border-white hover:bg-white/15 active:scale-95 sm:text-lg"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Llamar ahora
          </a>
        </motion.div>

        {/* Stats with animated counters */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex flex-wrap items-center gap-8"
        >
          <div className="flex items-center gap-3">
            <AnimatedCounter target={15} suffix="+" className="text-3xl font-extrabold text-white sm:text-4xl" />
            <span className="text-sm text-white/60">años de<br />experiencia</span>
          </div>
          <div className="h-10 w-px bg-white/20" />
          <div className="flex items-center gap-3">
            <AnimatedCounter target={1000} suffix="+" className="text-3xl font-extrabold text-white sm:text-4xl" />
            <span className="text-sm text-white/60">familias<br />atendidas</span>
          </div>
          <div className="hidden h-10 w-px bg-white/20 sm:block" />
          <div className="hidden items-center gap-3 sm:flex">
            <AnimatedCounter target={500} suffix="+" className="text-3xl font-extrabold text-white sm:text-4xl" />
            <span className="text-sm text-white/60">intervenciones<br />exitosas</span>
          </div>
        </motion.div>

        {/* Address */}
        <motion.p
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          className="mt-8 flex items-center gap-2 text-sm text-white/50"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {CONTACTO.direccionCorta}
        </motion.p>
      </div>
    </section>
  );
}
