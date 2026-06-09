import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/api/settings";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    title: `Catalogue — Véhicules disponibles à ${s.address_city}`,
    description: `Parcourez le catalogue ${s.seo_site_name} : berlines, SUV, électriques et hybrides disponibles en location VTC ou à la vente à ${s.address_city}. Prix transparents, véhicules contrôlés.`,
    keywords: [
      `catalogue voitures ${s.address_city}`,
      "location VTC 92",
      `voiture occasion ${s.address_city}`,
      "berline hybride location",
      "Tesla location VTC Île-de-France",
      "mandataire auto 92",
    ],
    alternates: { canonical: "https://ecoride.pro/catalogue" },
    openGraph: {
      title: `Catalogue ${s.seo_site_name} — Location VTC & Vente Occasion ${s.address_city}`,
      description: `Tous les véhicules ${s.seo_site_name} disponibles : location VTC, vente occasion, mandataire. ${s.address_city} (92).`,
      url: "https://ecoride.pro/catalogue",
      type: "website",
    },
  };
}

export default async function CatalogueLayout({ children }: { children: React.ReactNode }) {
  const s = await getSiteSettings();

  return (
    <>
      {/* Feature banners si service désactivé */}
      {!s.feature_vtc && !s.feature_occasion && !s.feature_mandataire && (
        <div className="bg-yellow-50 border-b border-yellow-200 text-yellow-800 text-sm text-center py-2 px-4">
          Catalogue temporairement indisponible — revenez bientôt.
        </div>
      )}
      {children}
    </>
  );
}
