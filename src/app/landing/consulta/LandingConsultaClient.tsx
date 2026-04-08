// @ts-nocheck
"use client";

import { useState } from "react";
import FadeIn from "@/components/animations/FadeIn";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import Resenas from "@/components/Resenas";
import MapaContacto from "@/components/MapaContacto";
import AgendaModal from "@/components/AgendaModal";

const WA = "https://wa.me/525634461745?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20consulta%20veterinaria";

export default function LandingConsultaClient() {
  const [showAgenda, setShowAgenda] = useState(false);

  return (
    <main>
      {/* 1. HERO */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <FadeIn>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#ff006b]/10 px-5 py-2.5 text-sm font-bold text-[#ff006b]">
                <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-[#ff006b]" />
                Atención veterinaria hoy · Lindavista, CDMX
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mb-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-[#2d0057] sm:text-4xl md:text-5xl">
                ¿Tu mascota tiene síntomas? <span className="text-[#ff006b]">No esperes más</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mb-6 text-lg text-[#555]">Consulta veterinaria integral con revisión completa, orientación clara y seguimiento personalizado.</p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mb-8 inline-flex items-baseline gap-2 rounded-2xl bg-[#f9fafb] px-6 py-3">
                <span className="text-sm text-[#555]">Consulta desde</span>
                <span className="text-4xl font-extrabold text-[#ff006b]">$250</span>
                <span className="text-sm text-[#555]">MXN</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="mb-8 flex flex-col gap-3 sm:flex-row">
                <a href={WA} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); setShowAgenda(true); }} className="inline-flex items-center justify-center rounded-2xl bg-[#ff006b] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#ff006b]/20 transition-all hover:bg-[#e6005f] hover:shadow-xl active:scale-95">Agendar consulta ahora</a>
                <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#25D366] px-8 py-4 text-base font-bold text-[#25D366] transition-all hover:bg-[#25D366]/5 active:scale-95">Prefiero WhatsApp</a>
              </div>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#555]">
                <span><strong className="text-[#ff006b]">15</strong> años exp</span>
                <span className="h-4 w-px bg-gray-300" />
                <span><strong className="text-[#ff006b]">1,000</strong> familias</span>
                <span className="h-4 w-px bg-gray-300" />
                <span><strong className="text-[#ff006b]">5.0</strong> ⭐ Google</span>
              </div>
            </FadeIn>
          </div>
          <FadeIn direction="scale" className="mt-8 lg:mt-0">
            <img src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&q=80" alt="Consulta veterinaria en Coyotl Can Lindavista CDMX" className="rounded-3xl shadow-xl" />
          </FadeIn>
        </div>
      </section>

      {/* 2. PUNTOS DE DOLOR */}
      <section className="bg-[#f9fafb] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-extrabold text-[#2d0057] sm:text-3xl">¿Te suena familiar?</h2>
            <p className="text-[#555]">Si identificas alguna de estas situaciones, necesitas un veterinario de confianza</p>
          </FadeIn>
          <div className="mb-8 grid gap-3 sm:grid-cols-2">
            {["Tu mascota dejó de comer y no sabes por qué","Lleva días con vómito o diarrea y no mejora","Buscas un veterinario de confianza cerca de Lindavista","Te preocupa que sea algo grave pero no quieres ir a cualquier lado","Ya fuiste a otro veterinario pero no te dieron confianza","No sabes si tu mascota tiene sus vacunas al corriente"].map((p) => (
              <FadeIn key={p}><div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"><span className="mt-0.5 text-[#ff006b]">✗</span><p className="text-sm text-[#333]">{p}</p></div></FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="rounded-2xl border-2 border-[#4bbb00]/30 bg-[#4bbb00]/5 p-6 text-center">
              <p className="text-sm font-bold text-[#4bbb00]">LA BUENA NOTICIA</p>
              <p className="mt-2 text-[#333]">En Coyotl Can te damos <strong>respuestas claras desde la primera consulta</strong>. Médicos con formación UNAM, +15 años de experiencia y seguimiento personalizado.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. QUÉ INCLUYE */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-extrabold text-[#2d0057] sm:text-3xl">Lo que incluye tu consulta por $250</h2>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[{i:"🩺",t:"Revisión completa",d:"Evaluación integral: signos vitales, peso, estado general"},{i:"🔍",t:"Evaluación de síntomas",d:"Análisis detallado con explicación clara de lo que tiene tu mascota"},{i:"📋",t:"Plan de tratamiento",d:"Qué hacer, qué medicamentos y cuándo volver"},{i:"💬",t:"Seguimiento WhatsApp",d:"Después de la consulta escríbenos si tienes dudas"},{i:"🔬",t:"Laboratorio en clínica",d:"Estudios de sangre disponibles el mismo día"},{i:"📍",t:"Ubicación accesible",d:"Irapuato 11, Lindavista — a una cuadra del metro"}].map((x) => (
              <FadeIn key={x.t}><div className="rounded-2xl border border-gray-200 bg-[#f9fafb] p-5"><span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff006b]/10 text-xl">{x.i}</span><h3 className="mb-1 font-bold text-[#2d0057]">{x.t}</h3><p className="text-sm text-[#555]">{x.d}</p></div></FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROCESO */}
      <section className="bg-[#f9fafb] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn className="mb-10 text-center"><h2 className="text-2xl font-extrabold text-[#2d0057] sm:text-3xl">3 pasos para atender a tu mascota</h2></FadeIn>
          <div className="grid gap-6 sm:grid-cols-3">
            {[{n:"1",t:"Agenda tu cita",d:"Selecciona fecha y hora desde aquí o por WhatsApp. Sin filas.",c:"#ff006b"},{n:"2",t:"Trae a tu mascota",d:"Visítanos en Irapuato 11, Lindavista. A una cuadra del metro.",c:"#8b00fb"},{n:"3",t:"Recibe diagnóstico",d:"Te explicamos qué tiene, qué hacer y cuándo volver. Claro y directo.",c:"#4bbb00"}].map((s) => (
              <FadeIn key={s.n}><div className="rounded-2xl bg-white p-6 text-center shadow-sm"><span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full text-xl font-extrabold text-white" style={{backgroundColor:s.c}}>{s.n}</span><h3 className="mb-2 font-bold text-[#2d0057]">{s.t}</h3><p className="text-sm text-[#555]">{s.d}</p></div></FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMPARATIVA */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn className="mb-10 text-center"><h2 className="text-2xl font-extrabold text-[#2d0057] sm:text-3xl">¿Por qué Coyotl Can?</h2></FadeIn>
          <div className="grid gap-6 sm:grid-cols-2">
            <FadeIn><div className="rounded-2xl border border-gray-200 bg-[#f9fafb] p-6"><p className="mb-4 text-sm font-bold uppercase tracking-wider text-[#888]">Sin veterinario de confianza</p><ul className="space-y-3 text-sm text-[#555]"><li className="flex gap-2"><span className="text-[#ff4444]">✗</span>Buscas en Google sin saber a quién ir</li><li className="flex gap-2"><span className="text-[#ff4444]">✗</span>Te cobran sin explicarte</li><li className="flex gap-2"><span className="text-[#ff4444]">✗</span>No hay seguimiento post-consulta</li><li className="flex gap-2"><span className="text-[#ff4444]">✗</span>No sabes si el diagnóstico es correcto</li></ul></div></FadeIn>
            <FadeIn delay={0.1}><div className="rounded-2xl border-2 border-[#ff006b]/20 bg-[#fff0f7] p-6"><p className="mb-4 text-sm font-bold uppercase tracking-wider text-[#ff006b]">Con Coyotl Can</p><ul className="space-y-3 text-sm text-[#333]"><li className="flex gap-2"><span className="text-[#4bbb00]">✓</span>Veterinarios UNAM con +15 años</li><li className="flex gap-2"><span className="text-[#4bbb00]">✓</span>Precio claro: $250 consulta completa</li><li className="flex gap-2"><span className="text-[#4bbb00]">✓</span>Seguimiento por WhatsApp</li><li className="flex gap-2"><span className="text-[#4bbb00]">✓</span>+500 intervenciones exitosas</li></ul></div></FadeIn>
          </div>
        </div>
      </section>

      {/* 6. STATS */}
      <section className="bg-[#ff006b] py-14">
        <div className="mx-auto grid max-w-4xl gap-6 px-4 sm:grid-cols-3 sm:px-6">
          {[{target:500,label:"Intervenciones exitosas",sub:"De mínima invasión"},{target:10,prefix:"8-",suffix:" días",label:"Recuperación promedio",sub:"vs +30 días tradicional"},{target:90,suffix:"%",label:"Menos molestias",sub:"Post-procedimiento"}].map((s) => (
            <FadeIn key={s.label}><div className="rounded-2xl bg-white/10 p-6 text-center"><AnimatedCounter target={s.target} suffix={s.suffix} prefix={s.prefix} className="block text-3xl font-extrabold text-white" duration={2} /><p className="mt-2 text-sm font-bold text-white">{s.label}</p><p className="text-xs text-white/60">{s.sub}</p></div></FadeIn>
          ))}
        </div>
      </section>

      {/* 7. RESEÑAS */}
      <Resenas limit={3} />

      {/* 8. FAQ */}
      <section className="bg-[#f9fafb] py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <FadeIn className="mb-8 text-center"><h2 className="text-2xl font-extrabold text-[#2d0057] sm:text-3xl">Preguntas sobre la consulta</h2></FadeIn>
          {[{q:"¿Cuánto dura la consulta?",a:"Entre 20 y 30 minutos. Incluye revisión completa, evaluación de síntomas y plan de tratamiento."},{q:"¿Necesito llevar algo?",a:"Solo a tu mascota. Si tienes estudios previos, tráelos para más contexto."},{q:"¿Atienden sin cita?",a:"Sí, pero te recomendamos agendar para evitar espera. Por WhatsApp al 56 3446 1745."},{q:"¿Aceptan tarjeta?",a:"Sí, aceptamos efectivo y tarjeta de débito/crédito."},{q:"¿Atienden gatos?",a:"Sí, atendemos perros y gatos con espacios diferenciados."}].map((f,i) => <FaqItem key={i} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* 9. CTA FINAL */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <FadeIn>
            <h2 className="mb-4 text-2xl font-extrabold text-[#2d0057] sm:text-3xl">Tu mascota no puede esperar</h2>
            <p className="mb-8 text-[#555]">Agenda tu consulta hoy y dale la atención que merece.</p>
            <a href={WA} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); setShowAgenda(true); }} className="mb-4 inline-flex items-center justify-center rounded-2xl bg-[#ff006b] px-10 py-4 text-lg font-bold text-white shadow-lg shadow-[#ff006b]/20 transition-all hover:bg-[#e6005f] active:scale-95">Agendar consulta ahora</a>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-[#888]"><span>✓ Sin costo de agenda</span><span>✓ Respuesta inmediata</span><span>✓ Irapuato 11, Lindavista</span></div>
          </FadeIn>
        </div>
      </section>

      <MapaContacto />
      <footer className="bg-[#2d0057] py-6 text-center"><p className="text-xs text-white/40">&copy; {new Date().getFullYear()} Coyotl Can · Clínica Veterinaria Integral · Lindavista, CDMX</p></footer>
      <AgendaModal open={showAgenda} onClose={() => setShowAgenda(false)} defaultService="Consulta General" />
    </main>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-2 rounded-2xl border border-gray-200 bg-white">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between px-5 py-4 text-left"><span className="text-sm font-bold text-[#2d0057]">{q}</span><span className={`shrink-0 text-lg text-[#ff006b] transition-transform duration-200 ${open?"rotate-45":""}`}>+</span></button>
      {open && <p className="px-5 pb-4 text-sm text-[#555]">{a}</p>}
    </div>
  );
}
