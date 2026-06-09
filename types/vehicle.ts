export type VehicleIntent = "sale" | "rental" | "both";
export type VehicleCategory = "berline" | "suv" | "break" | "citadine" | "hybride" | "electrique" | "utilitaire" | "premium";
export type VehicleStatus = "available" | "reserved" | "coming_soon" | "rented" | "sold";

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  version?: string;
  year: number;
  mileageKm: number;
  fuel: "essence" | "diesel" | "hybride" | "hybride_rechargeable" | "electrique" | "gpl";
  transmission: "automatique" | "manuelle";
  category: VehicleCategory;
  intent: VehicleIntent;
  status: VehicleStatus;

  salePriceTtc?: number;
  rentalPriceWeeklyHt?: number;
  rentalPriceMonthlyHt?: number;
  depositAmount?: number;
  includedKmWeekly?: number;

  co2?: number;
  powerHp?: number;
  seats: number;
  doors: number;
  color?: string;
  critair?: string;
  description?: string;

  images: string[];
  highlights: string[];
  includedServices: string[];
  eligibilityTags: string[];
  requiredDocuments?: string[];

  isVtcCompatible: boolean;
  isEcoHighlighted: boolean;
  location: string;
  rentalMinDuration?: string;
  availabilityNote?: string;

  seoTitle: string;
  seoDescription: string;

  score?: {
    economie: number;
    confort: number;
    vtc: number;
    ecologie: number;
    disponibilite: number;
  };
}
