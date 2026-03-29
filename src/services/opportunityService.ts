import axios from "axios";
import type { Opportunity, OpportunityResponse } from "../types/opportunity";

export const OPPORTUNITIES_PAGE_SIZE = 25;

export interface OpportunityFilters {
  /** Sent as a single `category` query param: `a,b,c` */
  categories?: string[];
  gender?: string;
  ageRange?: string;
  location?: string;
  language?: string;
  /** 1-based page index */
  page?: number;
  limit?: number;
}

export interface FetchOpportunitiesResult {
  items: Opportunity[];
  /** Total matching the current filters (for pagination), from API `count` */
  total: number;
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
  const cats = filters?.categories?.filter(Boolean) ?? [];
  if (cats.length > 0) {
    params.set("category", cats.join(","));
  }
  const g = filters?.gender?.trim();
  if (g) params.set("gender", g);
  const a = filters?.ageRange?.trim();
  if (a) params.set("ageRange", a);
  const loc = filters?.location?.trim();
  if (loc) params.set("location", loc);
  const lang = filters?.language?.trim();
  if (lang) params.set("language", lang);
  if (filters?.page != null && filters.page > 0) {
    params.set("page", String(filters.page));
  }
  if (filters?.limit != null && filters.limit > 0) {
    params.set("limit", String(filters.limit));
  }
  const q = params.toString();
  return q ? `?${q}` : "";
}

export async function fetchOpportunities(
  filters?: OpportunityFilters,
): Promise<FetchOpportunitiesResult> {
  const query = buildSearchParams(filters);
  const { data } = await client.get<OpportunityResponse>(
    `/api/opportunities${query}`,
  );
  if (!Array.isArray(data.items)) {
    throw new Error("Invalid response: expected an array of opportunities");
  }
  const total =
    typeof data.count === "number" && Number.isFinite(data.count)
      ? data.count
      : data.items.length;
  return { items: data.items as Opportunity[], total };
}
