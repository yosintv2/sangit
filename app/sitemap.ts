import type { MetadataRoute } from "next";
import { getAllDistricts, getAllRoadSlugs } from "@/lib/data";

export const dynamic = "force-static";

const BASE = "https://www.sgpostalcode.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/district/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/road/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/search/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/about/`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/privacy-policy/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms-of-service/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/disclaimer/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const districtRoutes: MetadataRoute.Sitemap = getAllDistricts().map((id) => ({
    url: `${BASE}/district/${id}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const roadRoutes: MetadataRoute.Sitemap = getAllRoadSlugs().map((slug) => ({
    url: `${BASE}/road/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...districtRoutes, ...roadRoutes];
}
