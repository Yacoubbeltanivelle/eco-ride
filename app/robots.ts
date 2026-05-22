import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin-demo", "/espace-client", "/api/"],
      },
    ],
    sitemap: "https://ecoride.pro/sitemap.xml",
  };
}
