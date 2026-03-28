export const OPPORTUNITY_CATEGORIES = [
  "casting",
  "workshops",
  "voiceovers",
  "music",
  "other",
] as const;

export type OpportunityCategory = (typeof OPPORTUNITY_CATEGORIES)[number];

export const GENDER_PREFERENCES = ["male", "female", "unisex"] as const;

export type GenderPreference = (typeof GENDER_PREFERENCES)[number];

export const AGE_RANGE_BUCKETS = ["0-20", "21-30", "31-50", "50-70"] as const;

export type AgeRangeBucket = (typeof AGE_RANGE_BUCKETS)[number];

export interface Opportunity {
  _id: string;
  source: "telegram";
  rawText?: string;
  title: string;
  description?: string;
  roles: string[];
  /** e.g. casting, workshops, voiceovers, music, other */
  category?: OpportunityCategory | string;
  /** Casting-style preference shown on cards */
  genderPreference?: GenderPreference | string;
  /** e.g. 0-20, 21-30, 31-50, 50-70 */
  ageRange?: AgeRangeBucket | string;
  location?: string;
  language?: string;
  contact?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OpportunityResponse {
  items: Opportunity[];
  count: number;
}
