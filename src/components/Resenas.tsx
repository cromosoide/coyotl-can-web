// @ts-nocheck
"use client";

import { useState, useEffect, useCallback } from "react";
import { REVIEWS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import FadeIn from "./animations/FadeIn";

interface ResenasProps { limit?: number; }
type ReviewData = { nombre: string; mascota: string; texto: string; rating: number; avatar?: string };

export default function Resenas({ limit }: ResenasProps) {
  const [dbReviews, setDbReviews] = useState<ReviewData[] | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    supabase.from("reviews").select("*").eq("visible", true).order("created_at", { ascending: false }).limit(10)
      .then(({ data }) => {
        if (data && data.length > 0) setDbReviews(data.map((r: any) => ({ nombre: r.name, mascota: "", texto: r.text, rating: r.rating })));
      });
  }, []);

  const fallback: ReviewData[] = REVIEWS.map((r) => ({ ...r }));
  const allReviews = dbReviews && dbReviews.length > 0 ? dbReviews : fallback;
  const reviews = limit ? allReviews.slice(0, limit) : allReviews;

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => setCurrent((c) => (c + 1) % reviews.length), 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <section id="resenas" className="bg-white py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#ff006b]/10 px-5 py-2 text-sm font-bold text-[#ff006b]">Reseñas</span>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl md:text-5xl">Lo que dicen nuestras familias</h2>
          <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-2.5 shadow-sm">
            <span className="text-base font-extrabold text-[#2d0057]">5.0</span>
            <div className="flex text-[#ffab00]">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-[#555]">Google</span>
          </div>
        </FadeIn>

        {/* Desktop grid */}
        <div className="hidden gap-8 sm:grid sm:grid-cols-3">
          {reviews.map((review, i) => (
            <FadeIn key={review.nombre} delay={i * 0.1}>
              <ReviewCard {...review} />
            </FadeIn>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="sm:hidden">
          <ReviewCard {...reviews[current]} />
          <div className="mt-6 flex justify-center gap-2.5">
            {reviews.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`h-2.5 rounded-full transition-all ${i === current ? "w-8 bg-[#ff006b]" : "w-2.5 bg-gray-300"}`} aria-label={`Reseña ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ nombre, mascota, texto, rating, avatar }: ReviewData) {
  return (
    <div className="rounded-3xl border border-[#ff006b]/10 bg-[#fafafa] p-7 transition-shadow hover:shadow-lg hover:shadow-[#ff006b]/5">
      <div className="mb-4 flex text-[#ffab00]">
        {[...Array(rating)].map((_, i) => (
          <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="mb-5 text-sm leading-relaxed text-[#555]">&ldquo;{texto}&rdquo;</p>
      <div className="flex items-center gap-3 border-t border-gray-200 pt-4">
        {avatar && <img src={avatar} alt={mascota} className="h-10 w-10 rounded-full object-cover" loading="lazy" />}
        <div>
          <p className="font-bold text-[#2d0057]">{nombre}</p>
          {mascota && <p className="text-xs text-[#555]">{mascota}</p>}
        </div>
      </div>
    </div>
  );
}
