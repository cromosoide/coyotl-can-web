"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ScrollReveal from "./animations/ScrollReveal";

const FAQS = [
  {
    q: "¿Cuánto cuesta la consulta veterinaria?",
    a: "La consulta general tiene un costo de $250 MXN. Incluye revisión completa de tu mascota y seguimiento personalizado.",
  },
  {
    q: "¿Necesito hacer cita o puedo llegar directamente?",
    a: "Te recomendamos agendar tu cita desde nuestra web o por WhatsApp para garantizar tu horario. También puedes llegar directamente pero podrías tener que esperar.",
  },
  {
    q: "¿Qué es la Estancia Coyotl?",
    a: "Es nuestro servicio de cuidado para tu mascota cuando necesitas salir de viaje o no puedes estar con ella. Tu mascota queda con profesionales que la cuidan como propia, con alimentación incluida y te enviamos foto diaria.",
  },
  {
    q: "¿Atienden gatos?",
    a: "Sí, atendemos perros y gatos. Contamos con espacios diferenciados para que los felinos se sientan cómodos durante su visita.",
  },
  {
    q: "¿Qué servicios de estética ofrecen?",
    a: "Ofrecemos baño, corte y cuidado integral del pelaje. Todo en un espacio donde también hay veterinario — si detectamos algo durante el servicio, te avisamos en ese momento.",
  },
  {
    q: "¿Cuál es el horario de atención?",
    a: "Lunes a viernes de 9:00 a 18:00 hrs (con pausa de 13:00 a 16:00). Sábados de 9:00 a 13:00 hrs. Domingos cerrado.",
  },
  {
    q: "¿Dónde están ubicados?",
    a: "Estamos en Irapuato 11, colonia Lindavista, alcaldía Gustavo A. Madero, Ciudad de México. A una cuadra del metro Lindavista.",
  },
  {
    q: "¿Qué incluye la Estancia Coyotl?",
    a: "Incluye cuidado profesional, alimentación, espacio cómodo y limpio, y una foto diaria que te enviamos por WhatsApp para que veas cómo está tu mascota.",
  },
  {
    q: "¿Puedo pagar con tarjeta?",
    a: "Sí, aceptamos efectivo y tarjeta de débito/crédito.",
  },
  {
    q: "¿Cómo agendo mi cita?",
    a: "Puedes agendar directamente desde nuestra página web seleccionando fecha y hora disponible, o si prefieres, escríbenos por WhatsApp al 55 3446 1745.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();

  function toggle(i: number) {
    setOpen(open === i ? null : i);
  }

  return (
    <section className="bg-white py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#fff0f7] px-5 py-2 text-sm font-bold text-[#ff006b]">
            FAQ
          </span>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl">
            Preguntas frecuentes
          </h2>
          <p className="text-[#555]">Lo que más nos preguntan nuestros clientes</p>
        </ScrollReveal>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <div className="rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-sm">
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="pr-4 text-sm font-bold text-[#333] sm:text-base">{faq.q}</span>
                  <span
                    className={`shrink-0 text-lg text-[#ff006b] transition-transform ${
                      open === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={prefersReduced ? {} : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={prefersReduced ? {} : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-[#555]">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
