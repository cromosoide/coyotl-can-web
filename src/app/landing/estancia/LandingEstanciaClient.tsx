"use client";

import { useState } from "react";
import FadeIn from "@/components/animations/FadeIn";
import AgendaModal from "@/components/AgendaModal";

export default function LandingEstanciaClient() {
  const [showAgenda, setShowAgenda] = useState(false);

  return (
    <main>
      <nav className="bg-[#f9fafb] px-4 py-3 text-xs text-[#555] sm:px-6">
        <div className="mx-auto max-w-6xl">
          <a href="/" className="text-[#ff006b] hover:underline">Inicio</a>
          <span className="mx-2">›</span>
          <span>Estancia Coyotl</span>
        </div>
      </nav>

      <section className="animate-gradient-shift relative overflow-hidden py-20 sm:py-28 lg:py-32" style={{ background: "linear-gradient(135deg, #8b00fb, #7400d4, #8b00fb, #a033fc)" }}>
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/5" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <FadeIn>
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-bold text-white/90">
                  <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-[#ffab00]" />
                  Estancia Coyotl · Lindavista
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="mb-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">Tú al mar, ellos con nosotros</h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mb-10 text-xl text-white/70">Con profesionales que los cuidan como propios</p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <button onClick={() => setShowAgenda(true)} className="inline-flex items-center gap-3 rounded-2xl bg-[#ffab00] px-10 py-5 text-lg font-bold text-white shadow-xl transition-all hover:bg-[#e69a00] hover:shadow-2xl active:scale-95">
                  Reservar Estancia
                </button>
              </FadeIn>
            </div>
            <FadeIn direction="scale" className="hidden lg:block">
              <img src="/coyotl-hero.png" alt="Mascota feliz en Estancia Coyotl Can Lindavista CDMX" className="rounded-3xl border-4 border-white/10 shadow-2xl" loading="eager" />
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn>
            <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl">¿Qué incluye la Estancia Coyotl?</h2>
          </FadeIn>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { icono: "🐾", titulo: "Cuidado profesional", texto: "Personal capacitado atendiendo a tu mascota" },
              { icono: "🍽️", titulo: "Alimentación personalizada", texto: "Respetamos la dieta y horarios de tu mascota" },
              { icono: "📸", titulo: "Foto diaria", texto: "Te enviamos una foto por WhatsApp cada día" },
            ].map((item, i) => (
              <FadeIn key={item.titulo} delay={i * 0.1}>
                <div className="card-hover rounded-3xl border border-[#8b00fb]/10 bg-[#f9fafb] p-7 text-center">
                  <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8b00fb]/10 text-2xl">{item.icono}</span>
                  <p className="mb-2 font-extrabold text-[#2d0057]">{item.titulo}</p>
                  <p className="text-sm text-[#555]">{item.texto}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f9fafb] py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ffab00]/30 bg-[#ffab00]/10 px-5 py-2.5 text-sm font-bold text-[#2d0057]">
              <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-[#ffab00]" />
              Lugares limitados
            </div>
            <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl">Reserva con anticipación</h2>
            <p className="mb-10 text-lg text-[#555]">En temporada alta los lugares se llenan rápido. Asegura el espacio de tu mascota hoy.</p>
            <button onClick={() => setShowAgenda(true)} className="inline-flex items-center gap-2 rounded-2xl bg-[#ff006b] px-9 py-4 font-bold text-white shadow-xl shadow-[#ff006b]/20 transition-all hover:bg-[#e6005f] active:scale-95">
              Reservar ahora
            </button>
          </FadeIn>
        </div>
      </section>

      <footer className="bg-[#ff006b] py-8 text-center">
        <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} Coyotl Can · Clínica Veterinaria Integral · Lindavista, CDMX</p>
      </footer>

      <AgendaModal open={showAgenda} onClose={() => setShowAgenda(false)} defaultService="Estancia Coyotl" />
    </main>
  );
}
