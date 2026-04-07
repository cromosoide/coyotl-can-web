import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog · Consejos Veterinarios · Coyotl Can · Lindavista CDMX",
  description: "Tips de salud animal, prevención y cuidados para tu mascota. Contenido educativo de Coyotl Can, clínica veterinaria en Lindavista, CDMX.",
  openGraph: { title: "Blog · Consejos Veterinarios · Coyotl Can", description: "Tips de salud animal y cuidados para tu mascota en Lindavista, CDMX." },
  twitter: { card: "summary_large_image", title: "Blog · Coyotl Can · Veterinaria Lindavista" },
  alternates: { canonical: "https://coyotl-can.vercel.app/blog" },
};

export default function BlogPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <main className="min-h-screen bg-[#fafafa] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <nav className="mb-8 text-xs text-[#555]">
          <a href="/" className="text-[#ff006b] hover:underline">Inicio</a>
          <span className="mx-2">›</span>
          <span>Blog</span>
        </nav>
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-extrabold text-[#2d0057] sm:text-4xl">Blog Coyotl Can</h1>
          <p className="text-[#555]">Consejos y tips para cuidar mejor a tu mascota en Lindavista, CDMX</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
                <div className="relative h-52 overflow-hidden">
                  <img src={post.image} alt={`${post.title} — Coyotl Can veterinaria Lindavista`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6">
                  <span className="mb-3 inline-block rounded-full bg-[#4bbb00]/10 px-4 py-1 text-xs font-bold text-[#4bbb00]">{post.pillar}</span>
                  <h2 className="mb-2 text-base font-extrabold text-[#2d0057]">{post.title}</h2>
                  <p className="mb-4 text-sm text-[#555]">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-[#ff006b]">Leer más <span className="transition-transform group-hover:translate-x-1">→</span></span>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href="/" className="rounded-xl border-2 border-[#ff006b] px-6 py-3 font-bold text-[#ff006b] hover:bg-[#ff006b] hover:text-white">Volver al inicio</a>
        </div>
      </div>
    </main>
  );
}
