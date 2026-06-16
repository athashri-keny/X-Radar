// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://xradar.in", // homepage
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0, // most important
    },
    {
      url: "https://xradar.in/auth/login",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://xradar.in/auth/signup",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://xradar.in/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://xradar.in/privacy", // ← match your EXACT route name
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3, // low priority — legal page
    },
    {
      url: "https://xradar.in/refund-policy", // ← match your EXACT route name
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://xradar.in/terms", // ← match your EXACT route name
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
