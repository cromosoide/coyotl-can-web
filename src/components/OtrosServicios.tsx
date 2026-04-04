"use client";

import { OTROS_SERVICIOS, CONTACTO } from "@/lib/constants";
import FadeIn from "./animations/FadeIn";
import ServiceIcon from "./ServiceIcon";

export default function OtrosServicios() {
  return (
    <section className="bg-white py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl">Otros Servicios</h2>
          <p className="text-lg text-[#555]">Todo lo que tu mascota necesita, en un solo lugar.</p>
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OTROS_SERVICIOS.map((servicio, i) => (
            <FadeIn key={servicio.nombre} delay={i * 0.1}>
              <div className="card-hover flex flex-col items-center rounded-3xl border border-[#ff006b]/10 bg-white p-7 text-center shadow-sm">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff006b]/10 text-[#ff006b]">
                  <ServiceIcon service={servicio.iconKey} className="h-7 w-7" />
                </span>
                <h3 className="mb-2 font-extrabold text-[#2d0057]">{servicio.nombre}</h3>
                <p className="mb-5 flex-1 text-sm text-[#555]">{servicio.descripcion}</p>
                <a href={CONTACTO.whatsappMensaje} target="_blank" rel="noopener noreferrer" className="rounded-2xl border-2 border-[#ff006b] px-5 py-2.5 text-sm font-bold text-[#ff006b] transition-all hover:bg-[#ff006b] hover:text-white active:scale-95">
                  Agendar
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
