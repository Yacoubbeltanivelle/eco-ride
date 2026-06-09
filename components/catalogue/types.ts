export type AdvancedFilters = {
  category: "" | "berline" | "suv" | "break" | "citadine" | "hybride" | "electrique" | "utilitaire" | "premium";
  transmission: "" | "automatique" | "manuelle";
  seats: number;
  critair: "" | "1" | "2" | "E";
  priceMin: number;
  priceMax: number;
  kmMax: number;
  yearMin: number;
  yearMax: number;
  vtc: boolean;
  available: boolean;
};

export const defaultAdvancedFilters: AdvancedFilters = {
  category: "",
  transmission: "",
  seats: 0,
  critair: "",
  priceMin: 100,
  priceMax: 1500,
  kmMax: 300000,
  yearMin: 2010,
  yearMax: 2026,
  vtc: false,
  available: false,
};
