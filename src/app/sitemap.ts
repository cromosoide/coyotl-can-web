import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://coyotl-can.vercel.app";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/landing/consulta`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/landing/estancia`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  // Dynamically add blog posts from Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const sb = createClient(supabaseUrl, supabaseKey);
      const { data: posts } = await sb
        .from("posts")
        .select("slug, published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (posts) {
        for (const post of posts) {
          staticPages.push({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.published_at),
            changeFrequency: "monthly",
            priority: 0.7,
          });
        }
      }
    } catch {
      // Silently fail if Supabase is unavailable during build
    }
  }

  return staticPages;
}
