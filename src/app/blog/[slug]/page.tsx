import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import BlogPostClient from "./BlogPostClient";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

async function getPost(slug: string) {
  if (!supabaseUrl || !supabaseKey) return null;
  const sb = createClient(supabaseUrl, supabaseKey);
  const { data } = await sb
    .from("posts")
    .select("title, excerpt, image_url, slug")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post no encontrado · Coyotl Can" };
  }

  return {
    title: `${post.title} · Coyotl Can · Veterinaria Lindavista`,
    description: post.excerpt || `${post.title} — Contenido educativo de Coyotl Can, clínica veterinaria en Lindavista, CDMX.`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image_url ? [{ url: post.image_url, width: 1200, height: 630, alt: post.title }] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://coyotl-can.vercel.app/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
