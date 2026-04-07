import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, BLOG_POSTS } from "@/lib/blog-posts";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post no encontrado" };
  return {
    title: `${post.title} · Coyotl Can · Lindavista CDMX`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.image] },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
    alternates: { canonical: `https://coyotl-can.vercel.app/blog/${post.slug}` },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white">
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
        <span className="mb-4 inline-block rounded-full bg-[#ff006b]/10 px-4 py-1.5 text-xs font-bold text-[#ff006b]">{post.pillar}</span>
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-[#2d0057] sm:text-4xl md:text-5xl">{post.title}</h1>
        <p className="mb-8 text-lg text-[#555]">{post.excerpt}</p>
        <p className="mb-8 text-xs text-[#888]">
          Publicado el {new Date(post.publishedAt + "T12:00:00").toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="mb-10 overflow-hidden rounded-2xl">
          <img src={post.image} alt={`${post.title} — Coyotl Can veterinaria Lindavista CDMX`} className="w-full object-cover" loading="lazy" />
        </div>

        <div className="prose prose-lg max-w-none text-[#333]" style={{ lineHeight: 1.8 }}>
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) return <h2 key={i} className="mb-4 mt-10 text-2xl font-extrabold text-[#2d0057]">{paragraph.replace("## ", "")}</h2>;
            if (paragraph.startsWith("### ")) return <h3 key={i} className="mb-3 mt-8 text-xl font-bold text-[#2d0057]">{paragraph.replace("### ", "")}</h3>;
            if (paragraph.startsWith("- ")) return (
              <ul key={i} className="mb-4 ml-5 list-disc space-y-2">
                {paragraph.split("\n").map((li, j) => <li key={j} className="text-[#555]">{li.replace("- ", "")}</li>)}
              </ul>
            );
            return <p key={i} className="mb-5 text-[#555]">{paragraph}</p>;
          })}
        </div>

        <div className="mt-12 rounded-2xl bg-[#fff0f7] p-8 text-center">
          <h3 className="mb-3 text-xl font-extrabold text-[#2d0057]">¿Tu mascota necesita atención?</h3>
          <p className="mb-5 text-sm text-[#555]">Agenda tu cita hoy en Coyotl Can. Estamos en Lindavista, CDMX.</p>
          <a href="https://wa.me/525634461745?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-2xl bg-[#ff006b] px-8 py-3.5 font-bold text-white transition-all hover:bg-[#e6005f]">
            Agendar cita ahora
          </a>
        </div>

        <div className="mt-10">
          <Link href="/blog" className="text-sm font-semibold text-[#ff006b] hover:underline">← Ver todos los artículos</Link>
        </div>
      </article>
    </main>
  );
}
