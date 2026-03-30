"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ESPECIALIDADES } from "@/lib/constants";
import ScrollReveal from "./animations/ScrollReveal";

export default function EquipoCoyotl() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="nosotros" className="bg-[#f9fafb] py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#ff006b]/10 px-5 py-2 text-sm font-bold text-[#ff006b]">
            Equipo Coyotl Can
          </span>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl md:text-5xl">
            Un equipo de expertos respaldando a tu mascota
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#555]">
            Médicos con formación UNAM y red de especialistas certificados, liderados por nuestra
            Directora Médica, para brindar atención integral en cada área.
          </p>
        </ScrollReveal>

        {/* Specialties grid — bounce-in staggered */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {ESPECIALIDADES.map((esp, i) => (
            <motion.div
              key={esp.nombre}
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              whileHover={prefersReduced ? {} : { y: -4 }}
              className="flex flex-col items-center rounded-3xl border border-[#ff006b]/10 bg-[#fafafa] p-7 text-center transition-shadow will-change-transform hover:shadow-lg hover:shadow-[#ff006b]/10"
            >
              <motion.span
                whileHover={prefersReduced ? {} : { rotate: 10, scale: 1.1 }}
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ff006b]/10 text-3xl"
              >
                {esp.icono}
              </motion.span>
              <h3 className="mb-2 text-sm font-extrabold text-[#2d0057]">{esp.nombre}</h3>
              <p className="text-xs leading-relaxed text-[#555]">{esp.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
