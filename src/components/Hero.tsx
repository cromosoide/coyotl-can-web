"use client";

import { useState } from "react";
import Image from "next/image";
import { CONTACTO } from "@/lib/constants";
import AnimatedCounter from "./animations/AnimatedCounter";
import FadeIn from "./animations/FadeIn";
import AgendaModal from "./AgendaModal";

const WA_AGENDAR = "https://wa.me/525634461745?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita";

export default function Hero() {
  const [showAgenda, setShowAgenda] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fff0f7] via-white to-[#f9fafb]">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#ff006b]/5" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#ff006b]/5" />

      <div className="mx-auto max-w-6xl px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-28">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <FadeIn>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#ff006b]/10 px-5 py-2.5 text-sm font-semibold text-[#ff006b]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#ff006b]" />
                Clínica Veterinaria Integral · Lindavista, CDMX
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mb-5 text-3xl font-extrabold leading-[1.1] tracking-tight text-[#ff006b] sm:text-4xl md:text-5xl lg:text-6xl">
                Cuidamos a tu familia animal con el trato que merece
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mb-8 max-w-xl text-base text-[#555] sm:text-lg">
                Atención veterinaria integral con tecnología y empatía. Consulta, estancia, estética y
                servicios preventivos en un solo lugar.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                {/* Progressive enhancement: <a> fallback + onClick override */}
                <a
                  href={WA_AGENDAR}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => { e.preventDefault(); setShowAgenda(true); }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ff006b] px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-[#ff006b]/20 transition-all hover:bg-[#e6005f] hover:shadow-xl active:scale-95"
                >
                  Agendar cita
                </a>
                <a
                  href={CONTACTO.telefonoLink}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#ff006b] px-7 py-3.5 text-base font-bold text-[#ff006b] transition-all hover:bg-[#ff006b]/5 active:scale-95"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Llamar ahora
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <AnimatedCounter target={15} className="text-2xl font-extrabold text-[#ff006b] sm:text-3xl" />
                  <span className="text-xs text-[#555]">años de<br />experiencia</span>
                </div>
                <div className="h-8 w-px bg-gray-200" />
                <div className="flex items-center gap-2">
                  <AnimatedCounter target={1000} className="text-2xl font-extrabold text-[#ff006b] sm:text-3xl" />
                  <span className="text-xs text-[#555]">familias<br />atendidas</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Hero image — VISIBLE on ALL devices */}
          <FadeIn direction="scale" className="mt-8 lg:mt-0">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#ff006b]/10">
              <Image
                src="/coyotl-hero.png"
                alt="Mascota feliz en Coyotl Can clínica veterinaria Lindavista CDMX"
                width={600}
                height={480}
                className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[480px]"
                priority
              />
              <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white p-3 shadow-lg sm:bottom-5 sm:left-5 sm:right-5 sm:p-5">
                <div className="flex items-center gap-3">
                  <img src="/icon-consulta.svg" alt="" className="h-8 w-8 rounded-lg bg-[#ff006b] p-1.5 sm:h-10 sm:w-10 sm:rounded-xl sm:p-2" />
                  <div>
                    <p className="text-xs font-extrabold text-[#2d0057] sm:text-sm">Clínica de Referencia Lindavista</p>
                    <p className="text-[10px] text-[#555] sm:text-xs">Atención integral · Medicina con alma</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <AgendaModal open={showAgenda} onClose={() => setShowAgenda(false)} defaultService="Consulta General" />
    </section>
  );
}
