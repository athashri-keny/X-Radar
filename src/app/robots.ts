import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // applies to ALL search engines (Google, Bing, etc.)
      allow: "/", // allow crawling everything by default
      disallow: [
        "/dashboard", // logged-in area — Google can't access anyway
        "/api/", // your API routes — no point indexing these
        // lead results — private user data
        "/payment-success",
        "/payment-page",
        "/user-info",
      ],
    },
    sitemap: "https://www.xradar.in/sitemap.xml", // tells Google where your sitemap is
  };
}
