import { apiFetch } from "./client";

export interface SiteSettings {
  // Contact
  phone: string;
  phone_display: string;
  email_contact: string;
  whatsapp: string;
  address_street: string;
  address_city: string;
  address_zip: string;
  address_full: string;
  latitude: string;
  longitude: string;
  // Horaires
  hours_weekday: string;
  hours_sunday: string;
  hours_note: string;
  // SEO
  seo_site_name: string;
  seo_title_suffix: string;
  seo_description: string;
  seo_keywords: string;
  seo_og_image: string;
  // Features
  feature_vtc: boolean;
  feature_mandataire: boolean;
  feature_occasion: boolean;
  feature_blog: boolean;
  feature_comparator: boolean;
  feature_simulator: boolean;
  // Social
  social_instagram: string;
  social_facebook: string;
  social_linkedin: string;
  // Mentions légales / footer bas de page
  company_name: string;
  company_siren: string;
  company_rcs: string;
  hosting_name: string;
  hosting_address: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  phone: "+33 6 67 48 95 62",
  phone_display: "06 67 48 95 62",
  email_contact: "contact@ecoride.pro",
  whatsapp: "+33667489562",
  address_street: "20 bis Rue Louis Philippe",
  address_city: "Neuilly-sur-Seine",
  address_zip: "92200",
  address_full: "20 bis Rue Louis Philippe, 92200 Neuilly-sur-Seine",
  latitude: "48.8845",
  longitude: "2.2754",
  hours_weekday: "Lun – Sam : 9h – 19h",
  hours_sunday: "Dim : sur RDV",
  hours_note: "Déplacements possibles en Île-de-France",
  seo_site_name: "ECO RIDE",
  seo_title_suffix: " | ECO RIDE Neuilly-sur-Seine",
  seo_description:
    "Location de véhicules premium, vente occasion et mandataire automobile à Neuilly-sur-Seine. Tesla, BMW, Mercedes disponibles. Idéal VTC.",
  seo_keywords:
    "location voiture Neuilly, VTC premium, occasion Mercedes Neuilly, mandataire auto Île-de-France",
  seo_og_image: "/og-ecoride.jpg",
  feature_vtc: true,
  feature_mandataire: true,
  feature_occasion: true,
  feature_blog: false,
  feature_comparator: true,
  feature_simulator: false,
  social_instagram: "",
  social_facebook: "",
  social_linkedin: "",
  company_name: "ECO RIDE",
  company_siren: "838 273 910",
  company_rcs: "Nanterre",
  hosting_name: "OVH SAS",
  hosting_address: "2 rue Kellermann, 59100 Roubaix",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const res = await apiFetch<SiteSettings>("/settings");
  if (!res.ok) return DEFAULT_SETTINGS;

  // Merge avec defaults pour les clés manquantes
  return { ...DEFAULT_SETTINGS, ...res.data };
}
