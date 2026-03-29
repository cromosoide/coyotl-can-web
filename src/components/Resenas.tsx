"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { REVIEWS } from "@/lib/constants";
import ScrollReveal from "./animations/ScrollReveal";

interface ResenasProps {
  limit?: number;
}

export default function Resenas({ limit }: ResenasProps) {
  const reviews = limit ? REVIEWS.slice(0, limit) : REVIEWS;
  const [current, setCurrent] = useState(0);
  const prefersReduced = useReducedMotion();

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % reviews.length);
  }, [reviews.length]);

  // Autoplay
  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, prefersReduced]);

  return (
    <section id="resenas" className="bg-white py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#e5006b]/10 px-5 py-2 text-sm font-bold text-[#e5006b]">
            Reseñas
          </span>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl md:text-5xl">
            Lo que dicen nuestras familias
          </h2>

          {/* Google badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-2.5 shadow-sm">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="text-base font-extrabold text-[#2d0057]">5.0</span>
            <div className="flex text-[#fab200]">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-[#555]">8 reseñas</span>
          </div>
        </ScrollReveal>

        {/* Desktop: grid */}
        <div className="hidden gap-8 sm:grid sm:grid-cols-3">
          {reviews.map((review, i) => (
            <ScrollReveal key={review.nombre} delay={i * 0.12}>
              <ReviewCard {...review} />
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile: animated carousel */}
        <div className="sm:hidden">
          <div className="relative min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={prefersReduced ? {} : { opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReduced ? {} : { opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <ReviewCard {...reviews[current]} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex justify-center gap-2.5">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === current ? "w-8 bg-[#e5006b]" : "w-2.5 bg-gray-300"
                }`}
                aria-label={`Ver reseña ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({
  nombre,
  mascota,
  texto,
  rating,
}: {
  nombre: string;
  mascota: string;
  texto: string;
  rating: number;
}) {
  return (
    <div className="rounded-3xl border border-[#e5006b]/10 bg-[#fafafa] p-7 transition-shadow hover:shadow-lg hover:shadow-[#e5006b]/5">
      <div className="mb-4 flex text-[#fab200]">
        {[...Array(rating)].map((_, i) => (
          <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="mb-5 text-sm leading-relaxed text-[#555]">&ldquo;{texto}&rdquo;</p>
      <div className="border-t border-gray-200 pt-4">
        <p className="font-bold text-[#2d0057]">{nombre}</p>
        <p className="text-xs text-[#555]">{mascota}</p>
      </div>
    </div>
  );
}
