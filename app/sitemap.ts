import type { MetadataRoute } from "next";
import { getAllVehicles } from "@/lib/api/vehicles";

export const dynamic = "force-dynamic";

const BASE = "https://ecoride.pro";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                              lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/catalogue`,               lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/catalogue?intent=rental`, lastModified: new Date(), changeFrequency: "weekly",  priority: 0.75 },
    { url: `${BASE}/catalogue?intent=sale`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.75 },
    { url: `${BASE}/catalogue?fuel=electrique`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/catalogue?fuel=hybride`,  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/location-vtc`,            lastModified: new Date(), changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE}/achat-occasion`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/mandataire-auto`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.75 },
    { url: `${BASE}/demande`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/mentions-legales`,        lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE}/cgv`,                     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE}/confidentialite`,         lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
  ];

  let vehiclePages: MetadataRoute.Sitemap = [];
  try {
    const vehicles = await getAllVehicles();
    vehiclePages = vehicles
      .filter(v => v.status === "available" || v.status === "coming_soon")
      .map(v => ({
        url: `${BASE}/vehicules/${v.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
  } catch {
    // API indisponible au build — sitemap ne contient que les pages statiques
  }

  return [...staticPages, ...vehiclePages];
}
