import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: "https://olympiadao.org",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://olympiadao.org/upgrade",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: "https://olympiadao.org/clients",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
