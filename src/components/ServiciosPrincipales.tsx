"use client";

import { SERVICIOS } from "@/lib/constants";
import ServiceCard from "./ServiceCard";
import FadeIn from "./animations/FadeIn";

export default function ServiciosPrincipales() {
  return (
    <section id="servicios" className="bg-white py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#ff006b]/10 px-5 py-2 text-sm font-bold text-[#ff006b]">Nuestros Servicios</span>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl md:text-5xl">Atención veterinaria integral</h2>
          <p className="mx-auto max-w-2xl text-lg text-[#555]">Tecnología de vanguardia con el cariño y calidez que tu mascota merece</p>
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-7"><ServiceCard {...SERVICIOS[0]} index={0} /></div>
          <div className="lg:col-span-5"><ServiceCard {...SERVICIOS[1]} index={1} /></div>
          <div className="lg:col-span-5"><ServiceCard {...SERVICIOS[2]} index={2} /></div>
          <div className="lg:col-span-7"><ServiceCard {...SERVICIOS[3]} index={3} /></div>
        </div>
      </div>
    </section>
  );
}
