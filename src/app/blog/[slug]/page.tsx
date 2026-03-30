"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import AgendaModal from "@/components/AgendaModal";

interface Post {
  id: string; title: string; slug: string; excerpt: string; content: string;
  image_url: string; pillar: string; published_at: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAgenda, setShowAgenda] = useState(false);

  useEffect(() => {
    supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single()
      .then(({ data }) => {
        setPost(data as Post | null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ff006b] border-t-transparent" />
      </main>
    );
  }

  if (!post) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-20">
        <span className="mb-4 text-5xl">🐾</span>
        <h1 className="mb-4 text-2xl font-extrabold text-[#2d0057]">Post no encontrado</h1>
        <Link href="/blog" className="rounded-xl bg-[#ff006b] px-6 py-3 font-bold text-white">
          Ver todos los artículos
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-[#f9fafb] px-4 py-3 text-xs text-[#555] sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="text-[#ff006b] hover:underline">Inicio</Link>
          <span className="mx-2">›</span>
          <Link href="/blog" className="text-[#ff006b] hover:underline">Blog</Link>
          <span className="mx-2">›</span>
          <span>{post.title}</span>
        </div>
      </nav>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Header */}
        {post.pillar && (
          <span className="mb-4 inline-block rounded-full bg-[#ff006b]/10 px-4 py-1.5 text-xs font-bold text-[#ff006b]">
            {post.pillar}
          </span>
        )}
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-[#2d0057] sm:text-4xl md:text-5xl">
          {post.title}
        </h1>
        <p className="mb-8 text-lg text-[#555]">{post.excerpt}</p>
        <p className="mb-8 text-xs text-[#888]">
          Publicado el {new Date(post.published_at).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        {/* Featured image */}
        {post.image_url && (
          <div className="mb-10 overflow-hidden rounded-2xl">
            <img src={post.image_url} alt={post.title} className="w-full object-cover" loading="lazy" />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none text-[#333]" style={{ lineHeight: 1.8 }}>
          {post.content?.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return <h2 key={i} className="mb-4 mt-10 text-2xl font-extrabold text-[#2d0057]">{paragraph.replace("## ", "")}</h2>;
            }
            if (paragraph.startsWith("### ")) {
              return <h3 key={i} className="mb-3 mt-8 text-xl font-bold text-[#2d0057]">{paragraph.replace("### ", "")}</h3>;
            }
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={i} className="mb-4 ml-5 list-disc space-y-2">
                  {paragraph.split("\n").map((li, j) => (
                    <li key={j} className="text-[#555]">{li.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i} className="mb-5 text-[#555]">{paragraph}</p>;
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-[#fff0f7] p-8 text-center">
          <h3 className="mb-3 text-xl font-extrabold text-[#2d0057]">¿Tu mascota necesita atención?</h3>
          <p className="mb-5 text-sm text-[#555]">Agenda tu cita hoy en Coyotl Can. Estamos en Lindavista, CDMX.</p>
          <button onClick={() => setShowAgenda(true)} className="inline-flex rounded-2xl bg-[#ff006b] px-8 py-3.5 font-bold text-white transition-all hover:bg-[#e6005f]">
            Agendar cita ahora
          </button>
        </div>
        <AgendaModal open={showAgenda} onClose={() => setShowAgenda(false)} defaultService="Consulta General" />

        {/* Back */}
        <div className="mt-10">
          <Link href="/blog" className="text-sm font-semibold text-[#ff006b] hover:underline">
            ← Ver todos los artículos
          </Link>
        </div>
      </article>
    </main>
  );
}
