"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Post {
  id: string; title: string; slug: string; excerpt: string; image_url: string;
  pillar: string; published_at: string;
}

export default function BlogClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("posts").select("*").eq("status", "published").order("published_at", { ascending: false })
      .then(({ data }) => { setPosts((data || []) as Post[]); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ff006b] border-t-transparent" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <span className="mb-4 block text-5xl">🐾</span>
        <p className="mb-8 text-[#555]">Pronto encontrarás aquí contenido educativo para cuidar mejor a tu mascota.</p>
        <Link href="/" className="rounded-xl bg-[#ff006b] px-6 py-3 font-bold text-white hover:bg-[#e6005f]">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <article className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
              <div className="relative h-52 overflow-hidden">
                {post.image_url ? (
                  <img src={post.image_url} alt={`${post.title} — Coyotl Can veterinaria Lindavista`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#ff006b]/10 to-[#8b00fb]/10"><span className="text-5xl">🐾</span></div>
                )}
              </div>
              <div className="p-6">
                {post.pillar && <span className="mb-3 inline-block rounded-full bg-[#4bbb00]/10 px-4 py-1 text-xs font-bold text-[#4bbb00]">{post.pillar}</span>}
                <h2 className="mb-2 text-base font-extrabold text-[#2d0057]">{post.title}</h2>
                <p className="mb-4 text-sm text-[#555]">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-[#ff006b]">Leer más <span className="transition-transform group-hover:translate-x-1">→</span></span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/" className="rounded-xl border-2 border-[#ff006b] px-6 py-3 font-bold text-[#ff006b] hover:bg-[#ff006b] hover:text-white">Volver al inicio</Link>
      </div>
    </div>
  );
}
