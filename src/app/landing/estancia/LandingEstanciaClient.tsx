// @ts-nocheck
"use client";

import { useState } from "react";
import FadeIn from "@/components/animations/FadeIn";
import Resenas from "@/components/Resenas";
import MapaContacto from "@/components/MapaContacto";
import AgendaModal from "@/components/AgendaModal";

const WA = "https://wa.me/525634461745?text=Hola%2C%20quiero%20reservar%20una%20estancia%20para%20mi%20mascota";

export default function LandingEstanciaClient() {
  const [showAgenda, setShowAgenda] = useState(false);

  return (
    <main>
      {/* 1. HERO */}
      <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24" style={{ background: "linear-gradient(135deg, #8b00fb, #7400d4)" }}>
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/5" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <FadeIn>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-bold text-white">
                <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-[#ffab00]" />
                Estancia Coyotl · Lindavista, CDMX
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mb-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
                Tú al mar, <span className="text-[#ffab00]">ellos con nosotros</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mb-6 text-lg text-white/80">Con profesionales que los cuidan como propios. Alimentación, espacio cómodo y foto diaria por WhatsApp.</p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mb-8 inline-flex items-baseline gap-2 rounded-2xl bg-white/10 px-6 py-3">
                <span className="text-sm text-white/70">Desde</span>
                <span className="text-4xl font-extrabold text-white">$350</span>
                <span className="text-sm text-white/70">/noche</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="mb-8 flex flex-col gap-3 sm:flex-row">
                <a href={WA} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); setShowAgenda(true); }} className="inline-flex items-center justify-center rounded-2xl bg-[#ffab00] px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-[#e69a00] hover:shadow-xl active:scale-95">Reservar estancia — $350/noche</a>
                <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/40 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10 active:scale-95">
                  <span>Cotizar por WhatsApp</span>
                  <span className="text-xs font-normal text-white/60">⏰ Respuesta en menos de 5 min</span>
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                <span><strong className="text-white">1,000</strong> familias</span>
                <span className="h-4 w-px bg-white/30" />
                <span><strong className="text-white">5.0</strong> ⭐ Google</span>
                <span className="h-4 w-px bg-white/30" />
                <span><strong className="text-white">📸</strong> Foto diaria</span>
              </div>
            </FadeIn>
          </div>
          <FadeIn direction="scale" className="mt-8 lg:mt-0">
            <img src="/coyotl-hero.png" alt="Mascota feliz en Estancia Coyotl Can Lindavista" className="rounded-3xl border-4 border-white/10 shadow-2xl" />
          </FadeIn>
        </div>
      </section>

      {/* 2. PUNTOS DE DOLOR */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-extrabold text-[#2d0057] sm:text-3xl">¿Te suena familiar?</h2>
            <p className="text-[#555]">Si vas a viajar y sientes esto, necesitas una estancia de confianza</p>
          </FadeIn>
          <div className="mb-8 grid gap-3 sm:grid-cols-2">
            {["Vas a viajar y no sabes con quién dejar a tu mascota","Te da miedo que no la cuiden bien mientras no estás","Quieres saber cómo está tu mascota pero no te mandan fotos","Has tenido malas experiencias en otros lugares","No confías en dejarla con conocidos o vecinos","Te preocupa que se enferme y no haya veterinario cerca"].map((p) => (
              <FadeIn key={p}><div className="flex items-start gap-3 rounded-2xl bg-[#f9fafb] p-4"><span className="mt-0.5 text-[#8b00fb]">✗</span><p className="text-sm text-[#333]">{p}</p></div></FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="rounded-2xl border-2 border-[#4bbb00]/30 bg-[#4bbb00]/5 p-6 text-center">
              <p className="text-sm font-bold text-[#4bbb00]">LA BUENA NOTICIA</p>
              <p className="mt-2 text-[#333]">En Estancia Coyotl tu mascota queda con <strong>profesionales dentro de una clínica veterinaria</strong>. Si algo pasa, hay veterinario en sitio. Y te enviamos foto diaria por WhatsApp.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. QUÉ INCLUYE */}
      <section className="bg-[#f9fafb] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-extrabold text-[#2d0057] sm:text-3xl">Todo incluido por $350/noche</h2>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[{i:"🐾",t:"Cuidado profesional",d:"Personal capacitado atendiendo a tu mascota todo el día"},{i:"🍽️",t:"Alimentación personalizada",d:"Respetamos la dieta y horarios de tu mascota"},{i:"📸",t:"Foto diaria por WhatsApp",d:"Cada día recibes una foto para que veas cómo está"},{i:"🏡",t:"Espacio cómodo sin jaulas",d:"Tu mascota tiene libertad para moverse en un espacio limpio"},{i:"🩺",t:"Veterinario en sitio",d:"Si algo pasa, hay veterinario disponible de inmediato"},{i:"🔄",t:"Check-in/out flexible",d:"Nos adaptamos a tus horarios de viaje"}].map((x) => (
              <FadeIn key={x.t}><div className="rounded-2xl border border-gray-200 bg-white p-5"><span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#8b00fb]/10 text-xl">{x.i}</span><h3 className="mb-1 font-bold text-[#2d0057]">{x.t}</h3><p className="text-sm text-[#555]">{x.d}</p></div></FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROCESO */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn className="mb-10 text-center"><h2 className="text-2xl font-extrabold text-[#2d0057] sm:text-3xl">3 pasos para una estancia tranquila</h2></FadeIn>
          <div className="grid gap-6 sm:grid-cols-3">
            {[{n:"1",t:"Reserva tus fechas",d:"Desde esta página o por WhatsApp. Te confirmamos disponibilidad al instante.",c:"#8b00fb"},{n:"2",t:"Trae a tu mascota",d:"El día del check-in nos conoces, ves las instalaciones y dejas a tu mascota tranquilo.",c:"#ffab00"},{n:"3",t:"Recibe foto diaria",d:"Mientras disfrutas tu viaje, te enviamos una foto cada día. Recógela feliz.",c:"#4bbb00"}].map((s) => (
              <FadeIn key={s.n}><div className="rounded-2xl bg-[#f9fafb] p-6 text-center"><span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full text-xl font-extrabold text-white" style={{backgroundColor:s.c}}>{s.n}</span><h3 className="mb-2 font-bold text-[#2d0057]">{s.t}</h3><p className="text-sm text-[#555]">{s.d}</p></div></FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMPARATIVA */}
      <section className="bg-[#f9fafb] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn className="mb-10 text-center"><h2 className="text-2xl font-extrabold text-[#2d0057] sm:text-3xl">¿Por qué Estancia Coyotl?</h2></FadeIn>
          <div className="grid gap-6 sm:grid-cols-2">
            <FadeIn><div className="rounded-2xl border border-gray-200 bg-white p-6"><p className="mb-4 text-sm font-bold uppercase tracking-wider text-[#888]">Otras opciones</p><ul className="space-y-3 text-sm text-[#555]"><li className="flex gap-2"><span className="text-[#ff4444]">✗</span>No sabes quién cuida a tu mascota</li><li className="flex gap-2"><span className="text-[#ff4444]">✗</span>No te envían fotos ni actualizaciones</li><li className="flex gap-2"><span className="text-[#ff4444]">✗</span>Si se enferma, no hay veterinario cerca</li><li className="flex gap-2"><span className="text-[#ff4444]">✗</span>Usan jaulas o espacios reducidos</li></ul></div></FadeIn>
            <FadeIn delay={0.1}><div className="rounded-2xl border-2 border-[#8b00fb]/20 bg-[#8b00fb]/5 p-6"><p className="mb-4 text-sm font-bold uppercase tracking-wider text-[#8b00fb]">Estancia Coyotl</p><ul className="space-y-3 text-sm text-[#333]"><li className="flex gap-2"><span className="text-[#4bbb00]">✓</span>Profesionales dentro de clínica veterinaria</li><li className="flex gap-2"><span className="text-[#4bbb00]">✓</span>Foto diaria por WhatsApp garantizada</li><li className="flex gap-2"><span className="text-[#4bbb00]">✓</span>Veterinario en sitio ante cualquier situación</li><li className="flex gap-2"><span className="text-[#4bbb00]">✓</span>Espacio cómodo y limpio, sin jaulas</li></ul></div></FadeIn>
          </div>
        </div>
      </section>

      {/* 6. RESEÑAS */}
      <Resenas limit={3} />

      {/* 7. FAQ */}
      <section className="bg-[#f9fafb] py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <FadeIn className="mb-8 text-center"><h2 className="text-2xl font-extrabold text-[#2d0057] sm:text-3xl">Preguntas sobre la estancia</h2></FadeIn>
          {[{q:"¿Puedo visitar las instalaciones antes de reservar?",a:"Sí, puedes venir a conocer el espacio antes de dejar a tu mascota. Te invitamos a visitarnos en Irapuato 11, Lindavista."},{q:"¿Qué pasa si mi mascota se enferma durante la estancia?",a:"Al estar dentro de una clínica veterinaria, cualquier situación se atiende de inmediato por un veterinario. Te avisamos al instante por WhatsApp."},{q:"¿Aceptan perros grandes y pequeños?",a:"Sí, atendemos perros y gatos de todos los tamaños. Los espacios se adaptan según el tamaño de tu mascota."},{q:"¿Con cuánta anticipación debo reservar?",a:"Te recomendamos al menos 1 semana de anticipación. En temporada alta (vacaciones, puentes, fin de año) reserva con 2-3 semanas."},{q:"¿Puedo traer su comida y juguetes?",a:"Sí, puedes traer su alimento habitual y algún juguete o cobija con su olor para que se sienta más cómoda."}].map((f,i) => <FaqItem key={i} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* 8. URGENCIA */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <FadeIn>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ffab00]/30 bg-[#ffab00]/10 px-5 py-2.5 text-sm font-bold text-[#2d0057]">
              <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-[#ffab00]" />
              Lugares limitados
            </div>
            <h2 className="mb-4 text-2xl font-extrabold text-[#2d0057] sm:text-3xl">Tu mascota merece las mejores vacaciones también</h2>
            <p className="mb-8 text-[#555]">En temporada alta los lugares se llenan rápido. Reserva hoy y viaja tranquilo.</p>
            <a href={WA} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); setShowAgenda(true); }} className="mb-4 inline-flex items-center justify-center rounded-2xl bg-[#8b00fb] px-10 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#7400d4] active:scale-95">Reservar estancia — $350/noche</a>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-[#888]"><span>✓ Reserva sin compromiso</span><span>✓ Veterinario en sitio</span><span>✓ Foto diaria garantizada</span></div>
          </FadeIn>
        </div>
      </section>

      <MapaContacto />
      <footer className="bg-[#2d0057] py-6 text-center"><p className="text-xs text-white/40">&copy; {new Date().getFullYear()} Coyotl Can · Clínica Veterinaria Integral · Lindavista, CDMX</p></footer>
      {/* STICKY CTA BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden">
        <a href={WA} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); setShowAgenda(true); }} className="flex w-full items-center justify-center rounded-2xl bg-[#8b00fb] py-3.5 text-base font-bold text-white shadow-lg">
          Reservar estancia — $350/noche
        </a>
      </div>

      <AgendaModal open={showAgenda} onClose={() => setShowAgenda(false)} defaultService="Estancia Coyotl" />
    </main>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-2 rounded-2xl border border-gray-200 bg-white">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between px-5 py-4 text-left"><span className="text-sm font-bold text-[#2d0057]">{q}</span><span className={`shrink-0 text-lg text-[#8b00fb] transition-transform duration-200 ${open?"rotate-45":""}`}>+</span></button>
      {open && <p className="px-5 pb-4 text-sm text-[#555]">{a}</p>}
    </div>
  );
}
