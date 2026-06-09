import { apiFetch } from "./client";
import type { Vehicle } from "@/types/vehicle";
import { vehicles as mockVehicles } from "@/data/vehicles";

// TODO_PROD: retirer les fallbacks mock quand Laravel API est connectée

export async function getAllVehicles(params?: {
  intent?: string;
  fuel?: string;
  status?: string;
  vtc?: boolean;
  category?: string;
}): Promise<Vehicle[]> {
  const res = await fetchVehicles(params);
  if (res.ok && Array.isArray(res.data) && res.data.length > 0) return res.data;
  return mockVehicles;
}

export async function getAllVehiclesOrThrow(params?: {
  intent?: string;
  fuel?: string;
  status?: string;
  vtc?: boolean;
  category?: string;
}): Promise<Vehicle[]> {
  const res = await fetchVehicles(params);
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}

async function fetchVehicles(params?: {
  intent?: string;
  fuel?: string;
  status?: string;
  vtc?: boolean;
  category?: string;
}) {
  const qs = new URLSearchParams();
  if (params?.intent)   qs.set("intent",   params.intent);
  if (params?.fuel)     qs.set("fuel",     params.fuel);
  if (params?.status)   qs.set("status",   params.status);
  if (params?.vtc)      qs.set("vtc",      "1");
  if (params?.category) qs.set("category", params.category);

  const query = qs.toString() ? `?${qs.toString()}` : "";
  return apiFetch<Vehicle[]>(`/vehicles${query}`);
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  const res = await apiFetch<Vehicle[]>("/vehicles/featured");
  if (res.ok && Array.isArray(res.data) && res.data.length > 0) return res.data;
  return mockVehicles.filter(v => v.isEcoHighlighted || v.status === "available").slice(0, 3);
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const safeSlug = encodeURIComponent(slug);
  const res = await apiFetch<Vehicle>(`/vehicles/${safeSlug}`);
  if (res.ok && res.data) return res.data;
  return mockVehicles.find(v => v.slug === slug) ?? null;
}

export async function getSimilarVehicles(slug: string): Promise<Vehicle[]> {
  const safeSlug = encodeURIComponent(slug);
  const res = await apiFetch<Vehicle[]>(`/vehicles/${safeSlug}/similar`);
  if (res.ok && Array.isArray(res.data) && res.data.length > 0) return res.data;
  return mockVehicles.filter(v => v.slug !== slug).slice(0, 3);
}

export async function getVtcVehicles(): Promise<Vehicle[]> {
  return getAllVehicles({ vtc: true });
}
