"use client";

import { motion, useReducedMotion } from "framer-motion";
import { OTROS_SERVICIOS, CONTACTO } from "@/lib/constants";
import ScrollReveal from "./animations/ScrollReveal";

export default function OtrosServicios() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-[#fafafa] py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-16 text-center">
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl">
            Otros Servicios
          </h2>
          <p className="text-lg text-[#555]">Todo lo que tu mascota necesita, en un solo lugar.</p>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OTROS_SERVICIOS.map((servicio, i) => (
            <motion.div
              key={servicio.nombre}
              initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={prefersReduced ? {} : { y: -4 }}
              className="flex flex-col items-center rounded-3xl border border-[#e5006b]/10 bg-white p-7 text-center shadow-sm transition-shadow will-change-transform hover:shadow-lg hover:shadow-[#e5006b]/10"
            >
              <motion.span
                whileHover={prefersReduced ? {} : { rotate: 8, scale: 1.1 }}
                className="mb-4 text-4xl"
              >
                {servicio.icono}
              </motion.span>
              <h3 className="mb-2 font-extrabold text-[#2d0057]">{servicio.nombre}</h3>
              <p className="mb-5 flex-1 text-sm text-[#555]">{servicio.descripcion}</p>
              <a
                href={CONTACTO.whatsappMensaje}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border-2 border-[#e5006b] px-5 py-2.5 text-sm font-bold text-[#e5006b] transition-all hover:bg-[#e5006b] hover:text-white active:scale-95"
              >
                Agendar
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
