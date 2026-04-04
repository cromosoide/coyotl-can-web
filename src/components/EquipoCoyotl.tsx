"use client";

import { ESPECIALIDADES } from "@/lib/constants";
import FadeIn from "./animations/FadeIn";
import ServiceIcon from "./ServiceIcon";

export default function EquipoCoyotl() {
  return (
    <section id="nosotros" className="bg-[#f9fafb] py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#ff006b]/10 px-5 py-2 text-sm font-bold text-[#ff006b]">Equipo Coyotl Can</span>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl md:text-5xl">Un equipo de expertos respaldando a tu mascota</h2>
        </FadeIn>

        <FadeIn className="mx-auto mb-16 max-w-3xl text-center" delay={0.1}>
          <p className="mb-4 text-base leading-relaxed text-[#555]">
            En Coyotl Can contamos con un equipo de médicos veterinarios con formación en la Facultad de Medicina Veterinaria y Zootecnia de la UNAM. Nuestra Directora Médica lidera una red de especialistas certificados en áreas como ortopedia, oftalmología, radiología y atención de aves y especies exóticas.
          </p>
          <p className="mb-4 text-base leading-relaxed text-[#555]">
            Desde hace más de 15 años atendemos a las familias de Lindavista, colonia Vallejo, Tepeyac, Industrial, Ticoman y toda la alcaldía Gustavo A. Madero en la Ciudad de México. Nos hemos convertido en una clínica veterinaria de referencia en la zona norte de la CDMX.
          </p>
          <p className="text-base leading-relaxed text-[#555]">
            Nuestro compromiso es ofrecer atención veterinaria de calidad con calidez humana. Creemos que cada mascota merece el mismo cuidado que le daríamos a un miembro de nuestra propia familia. Por eso nuestro lema es <strong className="text-[#ff006b]">Medicina con alma</strong>.
          </p>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {ESPECIALIDADES.map((esp, i) => (
            <FadeIn key={esp.nombre} delay={i * 0.1}>
              <div className="card-hover flex flex-col items-center rounded-3xl border border-[#ff006b]/10 bg-white p-7 text-center">
                <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ff006b]/10 text-[#ff006b]">
                  <ServiceIcon service={esp.iconKey} className="h-7 w-7" />
                </span>
                <h3 className="mb-2 text-sm font-extrabold text-[#2d0057]">{esp.nombre}</h3>
                <p className="text-xs leading-relaxed text-[#555]">{esp.descripcion}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mx-auto mt-14 max-w-xl text-center" delay={0.3}>
          <div className="rounded-2xl border border-[#ff006b]/10 bg-white p-8 shadow-sm">
            <p className="mb-2 text-lg font-extrabold text-[#2d0057]">¿No encuentras lo que buscas?</p>
            <p className="mb-5 text-sm text-[#555]">Nuestro equipo puede orientarte sobre el servicio que tu mascota necesita.</p>
            <a href="https://wa.me/525634461745?text=Hola%2C%20tengo%20una%20duda%20sobre%20los%20servicios%20de%20Coyotl%20Can" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#20b858] active:scale-95">
              Contáctanos por WhatsApp
            </a>
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-3xl text-center">
          <p className="text-sm leading-relaxed text-[#888]">
            Si buscas un veterinario en Lindavista, veterinario cerca de Indios Verdes, clínica veterinaria en Gustavo A. Madero o atención veterinaria en la zona norte de la Ciudad de México, en Coyotl Can encontrarás profesionales comprometidos con la salud de tu mascota.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
