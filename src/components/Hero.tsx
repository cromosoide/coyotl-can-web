"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CONTACTO } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import AnimatedCounter from "./animations/AnimatedCounter";

const taglineWords = "Cuidamos a tu familia animal con el trato que merece".split(" ");

export default function Hero() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pb-28 lg:pt-44">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            {/* Badge */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#fff0f7] px-5 py-2.5 text-sm font-semibold text-[#ff006b]"
            >
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#ff006b]" />
              Clínica Veterinaria Integral · Lindavista, CDMX
            </motion.div>

            {/* Tagline */}
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#ff006b] sm:text-5xl md:text-6xl lg:text-7xl">
              {taglineWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="mr-[0.3em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="mb-10 max-w-xl text-lg text-[#555] sm:text-xl"
            >
              Atención veterinaria integral con tecnología y empatía. Consulta, estancia, estética y
              servicios preventivos en un solo lugar.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="mb-14 flex flex-col gap-4 sm:flex-row sm:gap-5"
            >
              <Link
                href="/landing/consulta"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ff006b] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#ff006b]/20 transition-all hover:bg-[#e6005f] hover:shadow-xl active:scale-95 sm:text-lg"
              >
                Agendar cita
              </Link>
              <a
                href={CONTACTO.telefonoLink}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#ff006b] px-8 py-4 text-base font-bold text-[#ff006b] transition-all hover:bg-[#ff006b]/5 active:scale-95 sm:text-lg"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Llamar ahora
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="flex flex-wrap items-center gap-8"
            >
              <div className="flex items-center gap-3">
                <AnimatedCounter target={15} suffix="+" className="text-3xl font-extrabold text-[#ff006b] sm:text-4xl" />
                <span className="text-sm text-[#555]">años de<br />experiencia</span>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div className="flex items-center gap-3">
                <AnimatedCounter target={1000} suffix="+" className="text-3xl font-extrabold text-[#ff006b] sm:text-4xl" />
                <span className="text-sm text-[#555]">familias<br />atendidas</span>
              </div>
            </motion.div>

            <motion.p
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="mt-8 flex items-center gap-2 text-sm text-[#888]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {CONTACTO.direccionCorta}
            </motion.p>
          </div>

          {/* Hero image */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#ff006b]/10">
              <Image
                src="/coyotl-hero.png"
                alt="Mascota feliz en Coyotl Can clínica veterinaria Lindavista"
                width={600}
                height={500}
                className="h-[500px] w-full object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
