// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "next/link";

const PRECIO_NOCHE = 350;

export default function EstanciaCalculadoraPage() {
  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  const today = new Date().toISOString().split("T")[0];

  function getNoches(): number {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(0, Math.ceil(diff / 86400000));
  }

  const noches = getNoches();
  const total = noches * PRECIO_NOCHE;

  function getWhatsAppMsg() {
    return `https://wa.me/525634461745?text=${encodeURIComponent(
      `Hola, usé la calculadora de estancia en su web.\n\nMascota: ${tipo}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nNoches: ${noches}\nCosto estimado: $${total.toLocaleString()} MXN\nNombre: ${nombre}\nTeléfono: ${telefono}\n\nMe gustaría reservar la estancia.`
    )}`;
  }

  async function saveLead() {
    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("leads").insert({
        name: nombre, phone: telefono, tool: "estancia",
        data: { tipo, checkIn, checkOut, noches, total },
      });
    } catch {}
  }

  function formatDate(d: string) {
    return new Date(d + "T12:00:00").toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" });
  }

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <nav className="bg-white px-4 py-3 text-xs text-[#555] shadow-sm">
        <div className="mx-auto max-w-2xl">
          <Link href="/" className="text-[#ff006b] hover:underline">Inicio</Link>
          <span className="mx-2">›</span>
          <span>Calculadora de Estancia</span>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-8 flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${step >= s ? "bg-[#8b00fb]" : "bg-gray-200"}`} />
          ))}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          {step === 1 && (
            <>
              <h1 className="mb-2 text-2xl font-extrabold text-[#2d0057]">Calculadora de Estancia Coyotl</h1>
              <p className="mb-6 text-sm text-[#555]">Calcula el costo de la estancia de tu mascota mientras viajas.</p>
              <p className="mb-3 font-bold text-[#2d0057]">¿Cuándo sales de viaje?</p>
              <input type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                className="mb-4 w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm" />
              <p className="mb-3 font-bold text-[#2d0057]">¿Cuándo regresas?</p>
              <input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                className="mb-6 w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm" />

              {noches > 0 && (
                <div className="mb-6 rounded-2xl bg-[#8b00fb]/5 p-5 text-center">
                  <p className="text-sm text-[#555]">{noches} noche{noches > 1 ? "s" : ""} × ${PRECIO_NOCHE} MXN</p>
                  <p className="text-3xl font-extrabold text-[#8b00fb]">${total.toLocaleString()} MXN</p>
                  <p className="text-xs text-[#888]">Precio estimado</p>
                </div>
              )}

              <button onClick={() => setStep(2)} disabled={noches < 1}
                className="w-full rounded-2xl bg-[#8b00fb] py-3 font-bold text-white disabled:opacity-40">Continuar →</button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="mb-4 font-bold text-[#2d0057]">¿Qué tipo de mascota?</p>
              <div className="flex gap-4">
                {["Perro", "Gato"].map((t) => (
                  <button key={t} onClick={() => { setTipo(t); setStep(3); }}
                    className="flex-1 rounded-2xl border-2 border-gray-200 py-6 text-center text-lg font-bold text-[#2d0057] transition-all hover:border-[#8b00fb] hover:bg-[#8b00fb]/5">
                    {t === "Perro" ? "🐕" : "🐈"} {t}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <p className="mb-4 font-bold text-[#2d0057]">¿Tu nombre y teléfono?</p>
              <input placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}
                className="mb-3 w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm" />
              <input placeholder="Tu teléfono (10 dígitos)" value={telefono} onChange={(e) => setTelefono(e.target.value)}
                className="mb-6 w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm" />
              <button onClick={() => { saveLead(); setStep(4); }} disabled={nombre.length < 2 || telefono.length < 10}
                className="w-full rounded-2xl bg-[#8b00fb] py-3 font-bold text-white disabled:opacity-40">Ver resumen →</button>
            </>
          )}

          {step === 4 && (
            <div className="text-center">
              <span className="mb-4 block text-5xl">🏡</span>
              <h2 className="mb-4 text-xl font-extrabold text-[#2d0057]">Resumen de tu Estancia</h2>

              <div className="my-6 rounded-2xl bg-[#f9fafb] p-5 text-left text-sm">
                <div className="mb-2 flex justify-between"><span className="text-[#555]">Check-in:</span><span className="font-bold text-[#2d0057]">{formatDate(checkIn)}</span></div>
                <div className="mb-2 flex justify-between"><span className="text-[#555]">Check-out:</span><span className="font-bold text-[#2d0057]">{formatDate(checkOut)}</span></div>
                <div className="mb-2 flex justify-between"><span className="text-[#555]">Noches:</span><span className="font-bold text-[#2d0057]">{noches}</span></div>
                <div className="mb-2 flex justify-between"><span className="text-[#555]">Mascota:</span><span className="font-bold text-[#2d0057]">{tipo}</span></div>
                <div className="flex justify-between border-t border-gray-200 pt-2"><span className="font-bold text-[#555]">Total estimado:</span><span className="text-lg font-extrabold text-[#8b00fb]">${total.toLocaleString()} MXN</span></div>
              </div>

              <p className="mb-6 text-sm text-[#555]">Incluye cuidado profesional, alimentación y foto diaria por WhatsApp.</p>

              <a href={getWhatsAppMsg()} target="_blank" rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8b00fb] py-4 font-bold text-white">
                Reservar Estancia por WhatsApp
              </a>
              <p className="mt-4 text-xs text-[#888]">Estancia Coyotl · Irapuato 11, Lindavista, CDMX</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
