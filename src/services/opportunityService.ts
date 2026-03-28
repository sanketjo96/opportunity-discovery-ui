import axios from "axios";
import type { Opportunity, OpportunityResponse } from "../types/opportunity";

export interface OpportunityFilters {
  categories?: string[];
  genders?: string[];
  ageRanges?: string[];
  location?: string;
  language?: string;
}

function apiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_BASE_URL ?? "";
  return raw.trim().replace(/\/+$/, "");
}

const client = axios.create({
  baseURL: apiBaseUrl(),
});

function buildSearchParams(filters?: OpportunityFilters): string {
  const params = new URLSearchParams();
  for (const c of filters?.categories?.filter(Boolean) ?? []) {
    params.append("category", c);
  }
  for (const g of filters?.genders?.filter(Boolean) ?? []) {
    params.append("gender", g);
  }
  for (const a of filters?.ageRanges?.filter(Boolean) ?? []) {
    params.append("ageRange", a);
  }
  const loc = filters?.location?.trim();
  if (loc) params.set("location", loc);
  const lang = filters?.language?.trim();
  if (lang) params.set("language", lang);
  const q = params.toString();
  return q ? `?${q}` : "";
}

export async function fetchOpportunities(
  filters?: OpportunityFilters,
): Promise<Opportunity[]> {
  const query = buildSearchParams(filters);
  const { data } = await client.get<OpportunityResponse>(
    `/api/opportunities${query}`,
  );
  if (!Array.isArray(data.items)) {
    throw new Error("Invalid response: expected an array of opportunities");
  }
  return data.items as Opportunity[];
}
