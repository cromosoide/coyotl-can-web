"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import ScrollReveal from "./animations/ScrollReveal";

interface Post {
  id: string; title: string; slug: string; excerpt: string;
  image_url: string; pillar: string; published_at: string;
}

const FALLBACK_POSTS = [
  {
    id: "1", slug: "cuando-vacunar-cachorro",
    title: "¿Cuándo vacunar a tu cachorro? Guía completa",
    excerpt: "Conoce el esquema de vacunación ideal para proteger a tu cachorro desde los primeros meses.",
    pillar: "P1 Educativo",
    image_url: "https://images.unsplash.com/photo-1587764379873-97837921fd44?w=600&q=80",
    published_at: new Date().toISOString(),
  },
  {
    id: "2", slug: "cuidado-dental-mascotas",
    title: "¿Por qué es importante la limpieza dental de tu mascota?",
    excerpt: "El cuidado dental previene enfermedades y mejora la calidad de vida de tu compañero.",
    pillar: "P2 Tips",
    image_url: "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=600&q=80",
    published_at: new Date().toISOString(),
  },
  {
    id: "3", slug: "cuidados-despues-intervencion",
    title: "Cuidados post-intervención de mínima invasión",
    excerpt: "Tu mascota se recupera más rápido con estos cuidados esenciales en casa.",
    pillar: "P1 Educativo",
    image_url: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&q=80",
    published_at: new Date().toISOString(),
  },
];

export default function BlogPreview() {
  const prefersReduced = useReducedMotion();
  const [posts, setPosts] = useState<Post[]>(FALLBACK_POSTS);

  useEffect(() => {
    supabase
      .from("posts")
      .select("id, title, slug, excerpt, image_url, pillar, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data && data.length > 0) {
          // Pad with fallbacks if we have fewer than 3 real posts
          const real = data as Post[];
          const padded = [...real, ...FALLBACK_POSTS.filter((f) => !real.some((r) => r.slug === f.slug))].slice(0, 3);
          setPosts(padded);
        }
      });
  }, []);

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
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={prefersReduced ? {} : { y: -4 }}
              className="group overflow-hidden rounded-3xl border border-[#ff006b]/10 bg-white shadow-sm transition-shadow will-change-transform hover:shadow-lg hover:shadow-[#ff006b]/5"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-52 overflow-hidden">
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#ff006b]/10 to-[#8b00fb]/10">
                      <span className="text-5xl">🐾</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  {post.pillar && (
                    <span className="mb-3 inline-block rounded-full bg-[#4bbb00]/10 px-4 py-1 text-xs font-bold text-[#4bbb00]">
                      {post.pillar}
                    </span>
                  )}
                  <h3 className="mb-2 text-base font-extrabold text-[#2d0057]">{post.title}</h3>
                  <p className="mb-4 text-sm text-[#555]">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-[#ff006b]">
                    Leer más
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
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
