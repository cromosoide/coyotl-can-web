"use client";

import { useState } from "react";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import FadeIn from "@/components/animations/FadeIn";
import Resenas from "@/components/Resenas";
import MapaContacto from "@/components/MapaContacto";
import AgendaModal from "@/components/AgendaModal";

export default function LandingConsultaClient() {
  const [showAgenda, setShowAgenda] = useState(false);

  return (
    <main>
      <nav className="bg-[#f9fafb] px-4 py-3 text-xs text-[#555] sm:px-6">
        <div className="mx-auto max-w-6xl">
          <a href="/" className="text-[#ff006b] hover:underline">Inicio</a>
          <span className="mx-2">›</span>
          <span>Consulta Veterinaria</span>
        </div>
      </nav>

      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <FadeIn>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#fff0f7] px-5 py-2.5 text-sm font-bold text-[#ff006b]">
                <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-[#ff006b]" />
                Atención hoy · Lindavista, CDMX
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mb-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#ff006b] sm:text-5xl md:text-6xl">¿Tu mascota tiene síntomas?</h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mb-4 text-xl font-bold text-[#2d0057]">Atención veterinaria hoy en Lindavista</p>
              <p className="mb-10 text-[#555]">Revisión completa, estudios y seguimiento personalizado</p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mb-10 inline-flex items-baseline gap-2 rounded-3xl bg-[#f9fafb] px-8 py-4">
                <span className="text-sm text-[#555]">Consulta desde</span>
                <span className="text-4xl font-extrabold text-[#ff006b]">$250</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <button onClick={() => setShowAgenda(true)} className="inline-flex items-center gap-3 rounded-2xl bg-[#ff006b] px-10 py-5 text-lg font-bold text-white shadow-lg shadow-[#ff006b]/20 transition-all hover:bg-[#e6005f] hover:shadow-xl active:scale-95">
                Agendar consulta ahora
              </button>
            </FadeIn>
          </div>
          <FadeIn direction="scale" className="hidden lg:block">
            <img src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&q=80" alt="Consulta veterinaria en Lindavista CDMX — Coyotl Can" className="rounded-2xl shadow-xl" loading="eager" />
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#f9fafb] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { icono: "🩺", titulo: "Revisión completa", texto: "Atención integral desde la primera consulta" },
              { icono: "💜", titulo: "Medicina con alma", texto: "Tecnología y empatía para tu mascota" },
              { icono: "⚡", titulo: "Trato humano", texto: "Calidez y profesionalismo en cada visita" },
            ].map((item, i) => (
              <FadeIn key={item.titulo} delay={i * 0.1}>
                <div className="rounded-3xl border border-[#ff006b]/10 bg-white p-7 text-center">
                  <span className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff006b]/10 text-2xl">{item.icono}</span>
                  <p className="mb-1 font-extrabold text-[#2d0057]">{item.titulo}</p>
                  <p className="text-sm text-[#555]">{item.texto}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn>
            <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl">¿Por qué elegir intervención de mínima invasión?</h2>
          </FadeIn>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { target: 500, suffix: "+", label: "Intervenciones exitosas", color: "#ff006b" },
              { target: 10, suffix: " días", prefix: "8-", label: "Recuperación promedio", sublabel: "vs 30+ días método tradicional", color: "#8b00fb" },
              { target: 90, suffix: "%", label: "Menos molestias", sublabel: "post-procedimiento", color: "#4bbb00" },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="rounded-3xl border border-[#ff006b]/10 bg-[#f9fafb] p-8 text-center shadow-sm">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} prefix={stat.prefix} className="block text-4xl font-extrabold" duration={2} />
                  <div className="mx-auto my-3 h-1 w-10 rounded-full" style={{ backgroundColor: stat.color }} />
                  <p className="text-sm font-bold text-[#2d0057]">{stat.label}</p>
                  {stat.sublabel && <p className="mt-1 text-xs text-[#555]">{stat.sublabel}</p>}
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3} className="mt-10 text-center">
            <button onClick={() => setShowAgenda(true)} className="inline-flex items-center gap-2 rounded-2xl bg-[#ff006b] px-9 py-4 font-bold text-white shadow-xl shadow-[#ff006b]/20 transition-all hover:bg-[#e6005f] active:scale-95">
              Ver disponibilidad de agenda
            </button>
          </FadeIn>
        </div>
      </section>

      <Resenas limit={3} />
      <MapaContacto />

      <footer className="bg-[#ff006b] py-8 text-center">
        <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} Coyotl Can · Clínica Veterinaria Integral · Lindavista, CDMX</p>
      </footer>

      <AgendaModal open={showAgenda} onClose={() => setShowAgenda(false)} defaultService="Consulta General" />
    </main>
  );
}
