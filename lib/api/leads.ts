import { apiFetch } from "./client";

export type LeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  intent: "location" | "achat" | "mandataire";
  clientType?: "vtc" | "particulier" | "pro" | "entreprise";
  vehicleBrand?: string;
  vehicleModel?: string;
  vehicleSlug?: string;
  budget?: string;
  startDate?: string;
  duration?: string;
  message?: string;
  sourcePage?: string;
  rgpdConsent: boolean;
};

export type LeadCreated = {
  id: string;
  status: string;
  createdAt: string;
};

export async function submitLead(payload: LeadPayload) {
  return apiFetch<LeadCreated>("/leads", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
