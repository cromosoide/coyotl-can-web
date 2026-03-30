"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ESPECIALIDADES } from "@/lib/constants";
import ScrollReveal from "./animations/ScrollReveal";
import ServiceIcon from "./ServiceIcon";

export default function EquipoCoyotl() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="nosotros" className="bg-[#f9fafb] py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#ff006b]/10 px-5 py-2 text-sm font-bold text-[#ff006b]">
            Equipo Coyotl Can
          </span>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl md:text-5xl">
            Un equipo de expertos respaldando a tu mascota
          </h2>
        </ScrollReveal>

        {/* Extended text block — SEO/GEO rich */}
        <ScrollReveal className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-4 text-base leading-relaxed text-[#555]">
            En Coyotl Can contamos con un equipo de médicos veterinarios con formación en la
            Facultad de Medicina Veterinaria y Zootecnia de la UNAM, una de las instituciones más
            reconocidas de Latinoamérica. Nuestra Directora Médica lidera una red de especialistas
            certificados en áreas como ortopedia, oftalmología, radiología y atención de aves y
            especies exóticas.
          </p>
          <p className="mb-4 text-base leading-relaxed text-[#555]">
            Desde hace más de 15 años atendemos a las familias de Lindavista, colonia Vallejo,
            Tepeyac, Industrial, Ticoman y toda la alcaldía Gustavo A. Madero en la Ciudad de
            México. Nos hemos convertido en una clínica veterinaria de referencia en la zona norte
            de la CDMX gracias a nuestro enfoque integral: no solo tratamos enfermedades, sino que
            acompañamos a cada familia en la prevención, nutrición y bienestar completo de sus
            mascotas.
          </p>
          <p className="text-base leading-relaxed text-[#555]">
            Nuestro compromiso es ofrecer atención veterinaria de calidad con calidez humana.
            Creemos que cada mascota merece el mismo cuidado que le daríamos a un miembro de nuestra
            propia familia. Por eso nuestro lema es <strong className="text-[#ff006b]">Medicina con alma</strong>.
          </p>
        </ScrollReveal>

        {/* Specialties grid */}
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
              className="flex flex-col items-center rounded-3xl border border-[#ff006b]/10 bg-white p-7 text-center transition-shadow will-change-transform hover:shadow-lg hover:shadow-[#ff006b]/10"
            >
              <motion.span
                whileHover={prefersReduced ? {} : { rotate: 10, scale: 1.1 }}
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ff006b]/10 text-[#ff006b]"
              >
                <ServiceIcon service={esp.iconKey} className="h-7 w-7" />
              </motion.span>
              <h3 className="mb-2 text-sm font-extrabold text-[#2d0057]">{esp.nombre}</h3>
              <p className="text-xs leading-relaxed text-[#555]">{esp.descripcion}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional SEO paragraph */}
        <ScrollReveal className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-sm leading-relaxed text-[#888]">
            Si buscas un veterinario en Lindavista, veterinario cerca de Indios Verdes, clínica
            veterinaria en Gustavo A. Madero o atención veterinaria en la zona norte de la Ciudad
            de México, en Coyotl Can encontrarás profesionales comprometidos con la salud de tu
            mascota. Estamos en Irapuato 11, a una cuadra del metro Lindavista.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
