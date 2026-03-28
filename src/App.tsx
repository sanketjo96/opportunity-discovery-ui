import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FiltersPanel } from "./components/FiltersPanel";
import { OpportunityDetail } from "./components/OpportunityDetail";
import { OpportunityList } from "./components/OpportunityList";
import {
  fetchOpportunities,
  type OpportunityFilters,
} from "./services/opportunityService";
import type { Opportunity } from "./types/opportunity";

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function collectTrimmed(items: (string | undefined)[]): string[] {
  return items
    .map((s) => s?.trim())
    .filter((s): s is string => Boolean(s && s.length > 0));
}

function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const msg = err.response?.data;
    if (typeof msg === "string" && msg.trim()) return msg;
    if (msg && typeof msg === "object" && "message" in msg) {
      const m = (msg as { message?: unknown }).message;
      if (typeof m === "string") return m;
    }
    return err.message || `Request failed (${err.response?.status ?? "—"})`;
  }
  if (err instanceof Error) return err.message;
  return "Unexpected error";
}

export default function App() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationCatalog, setLocationCatalog] = useState<string[]>([]);
  const [languageCatalog, setLanguageCatalog] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);

  const filters: OpportunityFilters = useMemo(
    () => ({
      categories:
        selectedCategories.length > 0 ? selectedCategories : undefined,
      genders: selectedGenders.length > 0 ? selectedGenders : undefined,
      ageRanges: selectedAgeRanges.length > 0 ? selectedAgeRanges : undefined,
      location: locationFilter.trim() || undefined,
      language: languageFilter.trim() || undefined,
    }),
    [
      selectedCategories,
      selectedGenders,
      selectedAgeRanges,
      locationFilter,
      languageFilter,
    ],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOpportunities(filters);
      setOpportunities(data);
      setLocationCatalog((prev) =>
        uniqueSorted([
          ...prev,
          ...collectTrimmed(data.map((o) => o.location)),
        ]),
      );
      setLanguageCatalog((prev) =>
        uniqueSorted([
          ...prev,
          ...collectTrimmed(data.map((o) => o.language)),
        ]),
      );
    } catch (e) {
      setError(getErrorMessage(e));
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  }, [filters, refreshToken]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleRefresh = () => setRefreshToken((t) => t + 1);

  return (
    <div className="min-h-full">
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Opportunity Discovery
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Browse listings from your feed — filter, refresh, open details.
            </p>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <svg
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.278-.473-1.08 1.885.277.473a7.5 7.5 0 0 0 12.56-3.346l-1.858-.975Zm-4.85 4.37a5.5 5.5 0 0 1-7.783-7.05l.473-.277 1.884 1.08-.473.278a5.5 5.5 0 0 0 6.88 6.314l.856-1.564Zm4.65-9.89-.471-.24.93-1.82.472.238a7.5 7.5 0 0 1-10.17 8.43l-.89-1.55a5.5 5.5 0 0 0 7.23-6.44l-1.302-.672Z"
                clipRule="evenodd"
              />
            </svg>
            Refresh
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="w-full shrink-0 lg:w-80">
            <FiltersPanel
              locationOptions={locationCatalog}
              languageOptions={languageCatalog}
              selectedCategories={selectedCategories}
              onCategoriesChange={setSelectedCategories}
              selectedGenders={selectedGenders}
              onGendersChange={setSelectedGenders}
              selectedAgeRanges={selectedAgeRanges}
              onAgeRangesChange={setSelectedAgeRanges}
              location={locationFilter}
              onLocationChange={setLocationFilter}
              language={languageFilter}
              onLanguageChange={setLanguageFilter}
            />
          </div>
          <div className="min-w-0 flex-1">
            <OpportunityList
              opportunities={opportunities}
              loading={loading}
              error={error}
              onSelect={setSelected}
            />
          </div>
        </div>
      </main>

      <OpportunityDetail
        opportunity={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
