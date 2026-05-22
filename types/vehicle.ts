export type VehicleIntent = "sale" | "rental" | "both";
export type VehicleCategory = "berline" | "suv" | "citadine" | "van" | "electrique" | "hybride";
export type VehicleStatus = "available" | "reserved" | "coming_soon";

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  version?: string;
  year: number;
  mileageKm: number;
  fuel: "essence" | "diesel" | "hybride" | "electrique";
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

  images: string[];
  highlights: string[];
  includedServices: string[];
  eligibilityTags: string[];

  isVtcCompatible: boolean;
  isEcoHighlighted: boolean;
  location: string;

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
