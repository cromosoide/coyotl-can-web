"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "./animations/ScrollReveal";

const PLACEHOLDER_POSTS = [
  {
    slug: "cuando-vacunar-cachorro",
    titulo: "¿Cuándo vacunar a tu cachorro? Guía completa",
    extracto: "Conoce el esquema de vacunación ideal para proteger a tu cachorro desde los primeros meses.",
    pilar: "Educativo",
    imagen: "https://images.unsplash.com/photo-1587764379873-97837921fd44?w=600&q=80",
  },
  {
    slug: "cuidado-dental-mascotas",
    titulo: "¿Por qué es importante la limpieza dental de tu mascota?",
    extracto: "El cuidado dental previene enfermedades y mejora la calidad de vida de tu compañero.",
    pilar: "Tips",
    imagen: "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=600&q=80",
  },
  {
    slug: "cuidados-despues-intervencion",
    titulo: "Cuidados post-intervención de mínima invasión",
    extracto: "Tu mascota se recupera más rápido con estos cuidados esenciales en casa.",
    pilar: "Educativo",
    imagen: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&q=80",
  },
];

export default function BlogPreview() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-[#f9fafb] py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#4bbb00]/10 px-5 py-2 text-sm font-bold text-[#4bbb00]">
            Blog
          </span>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl">
            Contenido para cuidar mejor a tu mascota
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_POSTS.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={prefersReduced ? {} : { y: -4 }}
              className="overflow-hidden rounded-3xl border border-[#ff006b]/10 bg-white shadow-sm transition-shadow will-change-transform hover:shadow-lg hover:shadow-[#ff006b]/5"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.imagen}
                  alt={post.titulo}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="mb-3 inline-block rounded-full bg-[#4bbb00]/10 px-4 py-1 text-xs font-bold text-[#4bbb00]">
                  {post.pilar}
                </span>
                <h3 className="mb-2 text-base font-extrabold text-[#2d0057]">{post.titulo}</h3>
                <p className="mb-5 text-sm text-[#555]">{post.extracto}</p>
                <span className="group inline-flex items-center gap-1 text-sm font-bold text-[#ff006b]">
                  Leer más
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <ScrollReveal delay={0.3} className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#ff006b] px-7 py-3.5 text-sm font-bold text-[#ff006b] transition-all hover:bg-[#ff006b] hover:text-white active:scale-95"
          >
            Ver todos los artículos
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
