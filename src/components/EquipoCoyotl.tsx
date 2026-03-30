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

        {/* CTA — "¿No encuentras lo que buscas?" */}
        <ScrollReveal className="mx-auto mt-14 max-w-xl text-center">
          <div className="rounded-2xl border border-[#ff006b]/10 bg-white p-8 shadow-sm">
            <p className="mb-2 text-lg font-extrabold text-[#2d0057]">¿No encuentras lo que buscas?</p>
            <p className="mb-5 text-sm text-[#555]">
              Nuestro equipo puede orientarte sobre el servicio que tu mascota necesita. Escríbenos y te respondemos de inmediato.
            </p>
            <a
              href="https://wa.me/525534461745?text=Hola%2C%20tengo%20una%20duda%20sobre%20los%20servicios%20de%20Coyotl%20Can"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#20b858] active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contáctanos por WhatsApp
            </a>
          </div>
        </ScrollReveal>

        {/* Additional SEO paragraph */}
        <ScrollReveal className="mx-auto mt-8 max-w-3xl text-center">
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
