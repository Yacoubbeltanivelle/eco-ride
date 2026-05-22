import type { MetadataRoute } from "next";
import { vehicles } from "@/data/vehicles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ecoride.pro";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/catalogue`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/location-vtc`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/achat-occasion`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/mandataire-auto`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/simulateur`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/demande`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/comparer`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.5 },
    { url: `${baseUrl}/mentions-legales`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/cgv`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/confidentialite`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const vehiclePages = vehicles.map(v => ({
    url: `${baseUrl}/vehicules/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...vehiclePages];
}
