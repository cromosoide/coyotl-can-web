// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "next/link";

const SINTOMAS = [
  "No come o come menos", "Vomita", "Diarrea", "Está decaído o sin energía",
  "Tos o estornudos", "Se rasca mucho", "Pierde pelo", "Ojos llorosos o rojos",
  "Cojea o no quiere caminar", "Otro",
];

const DURACION = [
  { label: "Hoy empezó", value: "hoy", nivel: 1 },
  { label: "1-3 días", value: "1-3 días", nivel: 2 },
  { label: "Más de 3 días", value: "+3 días", nivel: 3 },
  { label: "Más de una semana", value: "+1 semana", nivel: 4 },
];

export default function SintomasPage() {
  const [step, setStep] = useState(1);
  const [tipo, setTipo] = useState("");
  const [sintomas, setSintomas] = useState<string[]>([]);
  const [duracion, setDuracion] = useState("");
  const [vacunado, setVacunado] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  function toggleSintoma(s: string) {
    setSintomas((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  }

  function getNivel(): { color: string; texto: string; emoji: string } {
    const dur = DURACION.find((d) => d.value === duracion);
    const n = (dur?.nivel || 1) + (sintomas.length > 3 ? 1 : 0) + (vacunado === "no" ? 1 : 0);
    if (n >= 4) return { color: "#ff4444", texto: "Te recomendamos acudir lo antes posible al veterinario", emoji: "🔴" };
    if (n >= 2) return { color: "#ffab00", texto: "Es importante agendar una consulta pronto", emoji: "🟡" };
    return { color: "#4bbb00", texto: "Monitorea a tu mascota y agenda una consulta preventiva", emoji: "🟢" };
  }

  function getWhatsAppMsg() {
    return `https://wa.me/525634461745?text=${encodeURIComponent(
      `Hola, hice el test de síntomas en su web.\n\nMascota: ${tipo}\nSíntomas: ${sintomas.join(", ")}\nDuración: ${duracion}\nVacunado: ${vacunado}\nNombre: ${nombre}\nTeléfono: ${telefono}\n\nMe gustaría agendar una consulta.`
    )}`;
  }

  async function saveLead() {
    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("leads").insert({
        name: nombre, phone: telefono, tool: "sintomas",
        data: { tipo, sintomas, duracion, vacunado },
      });
    } catch {}
  }

  const nivel = getNivel();

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <nav className="bg-white px-4 py-3 text-xs text-[#555] shadow-sm">
        <div className="mx-auto max-w-2xl">
          <Link href="/" className="text-[#ff006b] hover:underline">Inicio</Link>
          <span className="mx-2">›</span>
          <span>¿Mi mascota está enferma?</span>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* Progress */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${step >= s ? "bg-[#ff006b]" : "bg-gray-200"}`} />
          ))}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          {step === 1 && (
            <>
              <h1 className="mb-2 text-2xl font-extrabold text-[#2d0057]">¿Mi mascota está enferma?</h1>
              <p className="mb-6 text-sm text-[#555]">Responde estas preguntas y te orientamos.</p>
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
              <p className="mb-4 font-bold text-[#2d0057]">¿Qué síntomas presenta tu {tipo.toLowerCase()}?</p>
              <p className="mb-4 text-xs text-[#555]">Selecciona todos los que apliquen</p>
              <div className="mb-6 grid grid-cols-2 gap-2">
                {SINTOMAS.map((s) => (
                  <button key={s} onClick={() => toggleSintoma(s)}
                    className={`rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${sintomas.includes(s) ? "border-2 border-[#ff006b] bg-[#fff0f7] text-[#ff006b]" : "border-2 border-gray-200 text-[#333] hover:border-[#ff006b]/50"}`}>
                    {s}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(3)} disabled={sintomas.length === 0}
                className="w-full rounded-2xl bg-[#ff006b] py-3 font-bold text-white disabled:opacity-40">Continuar →</button>
            </>
          )}

          {step === 3 && (
            <>
              <p className="mb-4 font-bold text-[#2d0057]">¿Desde cuándo tiene estos síntomas?</p>
              <div className="mb-6 space-y-2">
                {DURACION.map((d) => (
                  <button key={d.value} onClick={() => { setDuracion(d.value); setStep(4); }}
                    className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${duracion === d.value ? "border-2 border-[#ff006b] bg-[#fff0f7] text-[#ff006b]" : "border-2 border-gray-200 text-[#333] hover:border-[#ff006b]/50"}`}>
                    {d.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <p className="mb-4 font-bold text-[#2d0057]">¿Tu {tipo.toLowerCase()} está vacunado y desparasitado?</p>
              <div className="mb-6 space-y-2">
                {[{ label: "Sí, al corriente", value: "si" }, { label: "No", value: "no" }, { label: "No estoy seguro", value: "no se" }].map((o) => (
                  <button key={o.value} onClick={() => { setVacunado(o.value); setStep(5); }}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-left text-sm font-semibold text-[#333] transition-all hover:border-[#ff006b]/50">
                    {o.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <p className="mb-4 font-bold text-[#2d0057]">¿Cómo te llamas y cuál es tu teléfono?</p>
              <p className="mb-4 text-xs text-[#555]">Para poder contactarte y darte seguimiento</p>
              <input placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}
                className="mb-3 w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm" />
              <input placeholder="Tu teléfono (10 dígitos)" value={telefono} onChange={(e) => setTelefono(e.target.value)}
                className="mb-6 w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm" />
              <button onClick={() => { saveLead(); setStep(6); }} disabled={nombre.length < 2 || telefono.length < 10}
                className="w-full rounded-2xl bg-[#ff006b] py-3 font-bold text-white disabled:opacity-40">Ver resultado →</button>
            </>
          )}

          {step === 6 && (
            <div className="text-center">
              <span className="mb-4 block text-5xl">{nivel.emoji}</span>
              <h2 className="mb-3 text-xl font-extrabold text-[#2d0057]">Resultado de la evaluación</h2>
              <p className="mb-2 font-bold" style={{ color: nivel.color }}>{nivel.texto}</p>
              <div className="my-6 rounded-2xl bg-[#f9fafb] p-4 text-left text-sm">
                <p><strong>Mascota:</strong> {tipo}</p>
                <p><strong>Síntomas:</strong> {sintomas.join(", ")}</p>
                <p><strong>Duración:</strong> {duracion}</p>
                <p><strong>Vacunado:</strong> {vacunado}</p>
              </div>
              <p className="mb-6 text-sm text-[#555]">Agenda una consulta en Coyotl Can para que un veterinario evalúe a tu mascota en persona.</p>
              <a href={getWhatsAppMsg()} target="_blank" rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ff006b] py-4 font-bold text-white">
                Agendar consulta por WhatsApp
              </a>
              <p className="mt-4 text-xs text-[#888]">Consulta desde $250 MXN · Irapuato 11, Lindavista, CDMX</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
