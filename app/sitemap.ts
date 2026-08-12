import type { MetadataRoute } from "next";
import { execSync } from "child_process";
import { etcClients } from "@/lib/clients";
import { overviewTopics } from "@/lib/overview-topics";

function gitDate(filePath: string): Date {
  try {
    const iso = execSync(`git log -1 --format="%cI" -- "${filePath}"`, {
      encoding: "utf8",
      cwd: process.cwd(),
    }).trim();
    return iso ? new Date(iso) : new Date();
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://olympiadao.org",
      lastModified: gitDate("app/page.tsx"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://olympiadao.org/overview",
      lastModified: gitDate("app/overview/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: "https://olympiadao.org/upgrade",
      lastModified: gitDate("app/upgrade/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: "https://olympiadao.org/governance",
      lastModified: gitDate("app/governance/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://olympiadao.org/clients",
      lastModified: gitDate("app/clients/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...overviewTopics.map((topic) => ({
      url: `https://olympiadao.org/overview/${topic.slug}`,
      lastModified: gitDate(`app/overview/${topic.slug}/page.tsx`),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...etcClients.map((client) => ({
      url: `https://olympiadao.org/clients/${client.slug}`,
      lastModified: gitDate(`app/clients/${client.slug}/page.tsx`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
