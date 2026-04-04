"use client";

import Image from "next/image";
import Link from "next/link";
import { trackWhatsAppClick } from "@/lib/analytics";
import ServiceIcon from "./ServiceIcon";
import FadeIn from "./animations/FadeIn";

interface ServiceCardProps {
  nombre: string;
  subtitulo: string;
  descripcion: string;
  precio: string;
  icono: string;
  iconKey?: string;
  imagen?: string;
  ctaText: string;
  ctaHref: string;
  ctaExternal: boolean;
  index?: number;
}

export default function ServiceCard({
  nombre, subtitulo, descripcion, precio, icono, iconKey,
  imagen, ctaText, ctaHref, ctaExternal, index = 0,
}: ServiceCardProps) {
  const buttonClass = "inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ff006b] px-5 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#e6005f] hover:shadow-lg hover:shadow-[#ff006b]/25 active:scale-95";

  return (
    <FadeIn delay={index * 0.1}>
      <div className="card-hover group flex flex-col overflow-hidden rounded-3xl border border-[#ff006b]/10 bg-white shadow-sm">
        {imagen && (
          <div className="relative h-48 overflow-hidden">
            <Image src={imagen} alt={`${nombre} — Coyotl Can veterinaria Lindavista CDMX`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
            <span className="absolute right-4 top-4 rounded-full bg-[#ff006b] px-4 py-1.5 text-xs font-bold text-white shadow-lg">{precio}</span>
          </div>
        )}
        <div className="flex flex-1 flex-col p-7">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff006b]/10 text-[#ff006b]">
            {iconKey ? <ServiceIcon service={iconKey} className="h-6 w-6" /> : <span className="text-2xl">{icono}</span>}
          </span>
          <h3 className="mb-1 text-lg font-extrabold text-[#2d0057]">{nombre}</h3>
          <p className="mb-3 text-sm font-semibold text-[#ff006b]">{subtitulo}</p>
          <p className="mb-7 flex-1 text-sm leading-relaxed text-[#555]">{descripcion}</p>
          {ctaExternal ? (
            <a href={ctaHref} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick(nombre)} className={buttonClass}>{ctaText}</a>
          ) : (
            <Link href={ctaHref} className={buttonClass}>{ctaText}</Link>
          )}
        </div>
      </div>
    </FadeIn>
  );
}
