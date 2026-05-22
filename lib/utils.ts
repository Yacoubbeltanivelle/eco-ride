import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = "€") {
  return new Intl.NumberFormat("fr-FR").format(price) + " " + currency;
}

export function formatMileage(km: number) {
  return new Intl.NumberFormat("fr-FR").format(km) + " km";
}

export const fuelLabels: Record<string, string> = {
  essence: "Essence",
  diesel: "Diesel",
  hybride: "Hybride",
  electrique: "Électrique",
};

export const fuelColors: Record<string, string> = {
  essence: "bg-orange-100 text-orange-700",
  diesel: "bg-slate-100 text-slate-700",
  hybride: "bg-emerald-100 text-emerald-700",
  electrique: "bg-blue-100 text-blue-700",
};

export const statusLabels: Record<string, string> = {
  available: "Disponible",
  reserved: "Réservé",
  coming_soon: "Bientôt dispo",
};

export const statusColors: Record<string, string> = {
  available: "bg-green-100 text-green-700",
  reserved: "bg-red-100 text-red-700",
  coming_soon: "bg-amber-100 text-amber-700",
};

export const leadStatusLabels: Record<string, string> = {
  nouveau: "Nouveau",
  a_rappeler: "À rappeler",
  dossier_incomplet: "Dossier incomplet",
  rdv_fixe: "RDV fixé",
  offre_envoyee: "Offre envoyée",
  signe: "Signé",
  perdu: "Perdu",
};

export const leadStatusColors: Record<string, string> = {
  nouveau: "bg-blue-100 text-blue-700",
  a_rappeler: "bg-amber-100 text-amber-700",
  dossier_incomplet: "bg-orange-100 text-orange-700",
  rdv_fixe: "bg-purple-100 text-purple-700",
  offre_envoyee: "bg-indigo-100 text-indigo-700",
  signe: "bg-green-100 text-green-700",
  perdu: "bg-red-100 text-red-700",
};
