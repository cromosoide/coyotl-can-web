import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://coyotlcan.mx";

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/landing/consulta`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/landing/estancia`, lastModified: new Date(), priority: 0.8 },
  ];
}
