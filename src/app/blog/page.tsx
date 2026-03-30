"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Post {
  id: string; title: string; slug: string; excerpt: string; image_url: string;
  pillar: string; published_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("posts").select("*").eq("status", "published").order("published_at", { ascending: false })
      .then(({ data }) => { setPosts((data || []) as Post[]); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fafafa]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ff006b] border-t-transparent" />
      </main>
    );
  }

  if (posts.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#fafafa] px-4 py-20">
        <span className="mb-4 text-5xl">🐾</span>
        <h1 className="mb-4 text-center text-3xl font-extrabold text-[#2d0057]">Blog Coyotl Can</h1>
        <p className="mb-8 max-w-md text-center text-[#555]">
          Pronto encontrarás aquí consejos, tips y contenido educativo para cuidar mejor a tu mascota.
        </p>
        <Link href="/" className="rounded-xl bg-[#ff006b] px-6 py-3 font-bold text-white transition-colors hover:bg-[#e6005f]">
          Volver al inicio
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-extrabold text-[#2d0057] sm:text-4xl">Blog Coyotl Can</h1>
          <p className="text-[#555]">Consejos y tips para cuidar mejor a tu mascota</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
              <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#ff006b]/10 to-[#8b00fb]/10">
                {post.image_url ? (
                  <img src={post.image_url} alt={post.title} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex h-full items-center justify-center"><span className="text-5xl">🐾</span></div>
                )}
              </div>
              <div className="p-6">
                {post.pillar && (
                  <span className="mb-3 inline-block rounded-full bg-[#4bbb00]/10 px-4 py-1 text-xs font-bold text-[#4bbb00]">{post.pillar}</span>
                )}
                <h2 className="mb-2 text-base font-extrabold text-[#2d0057]">{post.title}</h2>
                <p className="mb-4 text-sm text-[#555]">{post.excerpt}</p>
                <p className="text-xs text-[#888]">{new Date(post.published_at).toLocaleDateString("es-MX")}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="rounded-xl border-2 border-[#ff006b] px-6 py-3 font-bold text-[#ff006b] transition-colors hover:bg-[#ff006b] hover:text-white">
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
