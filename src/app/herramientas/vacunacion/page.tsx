// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "next/link";

const ESQUEMA_PERRO = [
  { edad: "6-8 semanas", vacuna: "Múltiple (1a dosis) + Desparasitación", aplicada: false },
  { edad: "10-12 semanas", vacuna: "Múltiple (2a dosis) + Leptospirosis", aplicada: false },
  { edad: "14-16 semanas", vacuna: "Múltiple (3a dosis) + Antirrábica", aplicada: false },
  { edad: "12 meses", vacuna: "Refuerzo anual de todas las vacunas", aplicada: false },
];

const ESQUEMA_GATO = [
  { edad: "8-9 semanas", vacuna: "Triple felina (1a dosis) + Desparasitación", aplicada: false },
  { edad: "12 semanas", vacuna: "Triple felina (2a dosis)", aplicada: false },
  { edad: "16 semanas", vacuna: "Antirrábica", aplicada: false },
  { edad: "12 meses", vacuna: "Refuerzo anual", aplicada: false },
];

export default function VacunacionPage() {
  const [step, setStep] = useState(1);
  const [tipo, setTipo] = useState("");
  const [edad, setEdad] = useState("");
  const [vacunas, setVacunas] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  function getEsquema() {
    return tipo === "Gato" ? ESQUEMA_GATO : ESQUEMA_PERRO;
  }

  function getRecomendacion() {
    if (vacunas === "todas") return "Tu mascota está al corriente. Recuerda el refuerzo anual.";
    if (vacunas === "algunas") return "Tu mascota necesita completar su esquema. Agenda una cita para revisión.";
    return "Tu mascota necesita iniciar su esquema de vacunación lo antes posible.";
  }

  function getWhatsAppMsg() {
    return `https://wa.me/525634461745?text=${encodeURIComponent(
      `Hola, usé la calculadora de vacunación en su web.\n\nMascota: ${tipo}\nEdad: ${edad}\nVacunas: ${vacunas}\nNombre: ${nombre}\nTeléfono: ${telefono}\n\nMe gustaría agendar una cita de vacunación.`
    )}`;
  }

  async function saveLead() {
    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("leads").insert({
        name: nombre, phone: telefono, tool: "vacunacion",
        data: { tipo, edad, vacunas },
      });
    } catch {}
  }

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <nav className="bg-white px-4 py-3 text-xs text-[#555] shadow-sm">
        <div className="mx-auto max-w-2xl">
          <Link href="/" className="text-[#ff006b] hover:underline">Inicio</Link>
          <span className="mx-2">›</span>
          <span>Calculadora de vacunación</span>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-8 flex gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${step >= s ? "bg-[#ff006b]" : "bg-gray-200"}`} />
          ))}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          {step === 1 && (
            <>
              <h1 className="mb-2 text-2xl font-extrabold text-[#2d0057]">Calculadora de vacunación</h1>
              <p className="mb-6 text-sm text-[#555]">Descubre qué vacunas necesita tu mascota según su edad.</p>
              <p className="mb-4 font-bold text-[#2d0057]">¿Qué tipo de mascota tienes?</p>
              <div className="flex gap-4">
                {["Perro", "Gato"].map((t) => (
                  <button key={t} onClick={() => { setTipo(t); setStep(2); }}
                    className="flex-1 rounded-2xl border-2 border-gray-200 py-6 text-center text-lg font-bold text-[#2d0057] transition-all hover:border-[#ff006b] hover:bg-[#fff0f7]">
                    {t === "Perro" ? "🐕" : "🐈"} {t}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="mb-4 font-bold text-[#2d0057]">¿Cuántos meses o años tiene tu {tipo.toLowerCase()}?</p>
              <div className="mb-6 grid grid-cols-2 gap-2">
                {["Menos de 2 meses", "2-4 meses", "4-6 meses", "6-12 meses", "1-3 años", "3-7 años", "Más de 7 años"].map((e) => (
                  <button key={e} onClick={() => { setEdad(e); setStep(3); }}
                    className="rounded-xl border-2 border-gray-200 px-4 py-3 text-sm font-semibold text-[#333] transition-all hover:border-[#ff006b]/50">
                    {e}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <p className="mb-4 font-bold text-[#2d0057]">¿Ha recibido alguna vacuna?</p>
              <div className="mb-6 space-y-2">
                {[{ label: "Sí, todas las de su edad", value: "todas" }, { label: "Algunas, pero no todas", value: "algunas" }, { label: "Ninguna", value: "ninguna" }, { label: "No estoy seguro", value: "no se" }].map((o) => (
                  <button key={o.value} onClick={() => { setVacunas(o.value); setStep(4); }}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-left text-sm font-semibold text-[#333] transition-all hover:border-[#ff006b]/50">
                    {o.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <p className="mb-4 font-bold text-[#2d0057]">¿Tu nombre y teléfono?</p>
              <input placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}
                className="mb-3 w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm" />
              <input placeholder="Tu teléfono (10 dígitos)" value={telefono} onChange={(e) => setTelefono(e.target.value)}
                className="mb-6 w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm" />
              <button onClick={() => { saveLead(); setStep(5); }} disabled={nombre.length < 2 || telefono.length < 10}
                className="w-full rounded-2xl bg-[#ff006b] py-3 font-bold text-white disabled:opacity-40">Ver esquema recomendado →</button>
            </>
          )}

          {step === 5 && (
            <div>
              <h2 className="mb-2 text-xl font-extrabold text-[#2d0057]">Esquema de vacunación para {tipo}</h2>
              <p className="mb-6 text-sm font-semibold" style={{ color: vacunas === "todas" ? "#4bbb00" : "#ff006b" }}>{getRecomendacion()}</p>

              <div className="mb-6 space-y-3">
                {getEsquema().map((v, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-200 p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff006b]/10 text-sm font-bold text-[#ff006b]">{i + 1}</span>
                    <div>
                      <p className="text-sm font-bold text-[#2d0057]">{v.edad}</p>
                      <p className="text-xs text-[#555]">{v.vacuna}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href={getWhatsAppMsg()} target="_blank" rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ff006b] py-4 font-bold text-white">
                Agendar vacunación por WhatsApp
              </a>
              <p className="mt-4 text-center text-xs text-[#888]">Vacunación desde $200 MXN · Irapuato 11, Lindavista, CDMX</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
