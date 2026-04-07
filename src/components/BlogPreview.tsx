import Link from "next/link";
import { getRecentPosts } from "@/lib/blog-posts";
import FadeIn from "./animations/FadeIn";

export default function BlogPreview() {
  const posts = getRecentPosts(3);

  return (
    <section className="bg-[#f9fafb] py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#4bbb00]/10 px-5 py-2 text-sm font-bold text-[#4bbb00]">Blog</span>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl">Contenido para cuidar mejor a tu mascota</h2>
        </FadeIn>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block overflow-hidden rounded-3xl border border-[#ff006b]/10 bg-white shadow-sm transition-shadow hover:shadow-lg">
                <div className="relative h-52 overflow-hidden">
                  <img src={post.image} alt={`${post.title} — Coyotl Can veterinaria Lindavista`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6">
                  <span className="mb-3 inline-block rounded-full bg-[#4bbb00]/10 px-4 py-1 text-xs font-bold text-[#4bbb00]">{post.pillar}</span>
                  <h3 className="mb-2 text-base font-extrabold text-[#2d0057]">{post.title}</h3>
                  <p className="mb-4 text-sm text-[#555]">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-[#ff006b]">Leer más <span className="transition-transform group-hover:translate-x-1">→</span></span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3} className="mt-12 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#ff006b] px-7 py-3.5 text-sm font-bold text-[#ff006b] transition-all hover:bg-[#ff006b] hover:text-white active:scale-95">
            Ver todos los artículos
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
