export type LeadStatus =
  | "nouveau"
  | "a_rappeler"
  | "dossier_incomplet"
  | "rdv_fixe"
  | "offre_envoyee"
  | "signe"
  | "perdu";

export type ClientType = "particulier" | "pro" | "vtc" | "entreprise";
export type LeadIntent = "location" | "achat" | "mandataire";

export interface Lead {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  type: ClientType;
  intent: LeadIntent;
  vehicleSlug?: string;
  vehicleLabel?: string;
  budget?: string;
  duree?: string;
  dateContact: string;
  status: LeadStatus;
  message?: string;
  urgent?: boolean;
}

export interface ReservationRequest {
  vehicleId: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  type: ClientType;
  intent: LeadIntent;
  dateDebut?: string;
  dateFin?: string;
  duree?: string;
  budget?: string;
  message?: string;
  rgpdConsent: boolean;
}
