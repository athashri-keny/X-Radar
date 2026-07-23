// app/sitemap.ts
import { MetadataRoute } from "next";

const baseUrl = "https://www.xradar.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl, // homepage
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0, // most important
    },
     {
      url: `${baseUrl}/how-to-find-clients-on-twitter-x`, // homepage
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0, // most important
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/auth/signup`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`, // ← match your EXACT route name
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3, // low priority — legal page
    },
    {
      url: `${baseUrl}/refund-policy`, // ← match your EXACT route name
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`, // ← match your EXACT route name
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}