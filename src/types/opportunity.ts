export interface Opportunity {
  _id: string;
  source: "telegram";
  rawText?: string;
  title: string;
  description?: string;
  roles: string[];
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