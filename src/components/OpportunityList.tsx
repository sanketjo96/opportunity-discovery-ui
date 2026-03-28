import type { Opportunity } from "../types/opportunity";
import { OpportunityCard } from "./OpportunityCard";

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft">
      <div className="h-5 w-3/4 rounded bg-slate-200" />
      <div className="mt-4 flex flex-wrap gap-2">
        <div className="h-6 w-16 rounded-full bg-slate-200" />
        <div className="h-6 w-20 rounded-full bg-slate-200" />
        <div className="h-6 w-14 rounded-full bg-slate-200" />
      </div>
      <div className="mt-4 h-4 w-1/2 rounded bg-slate-200" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full rounded bg-slate-100" />
        <div className="h-3 w-5/6 rounded bg-slate-100" />
        <div className="h-3 w-2/3 rounded bg-slate-100" />
      </div>
    </div>
  );
}

interface OpportunityListProps {
  opportunities: Opportunity[];
  loading: boolean;
  error: string | null;
  onSelect: (opportunity: Opportunity) => void;
  skeletonCount?: number;
}

export function OpportunityList({
  opportunities,
  loading,
  error,
  onSelect,
  skeletonCount = 8,
}: OpportunityListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: skeletonCount }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-2xl border border-red-200 bg-red-50 px-5 py-6 text-red-800 shadow-soft"
        role="alert"
      >
        <p className="font-semibold">Something went wrong</p>
        <p className="mt-1 text-sm opacity-90">{error}</p>
      </div>
    );
  }

  if (opportunities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-20 text-center shadow-sm">
        <p className="text-lg font-medium text-slate-700">
          No opportunities found
        </p>
        <p className="mt-2 max-w-md text-sm text-slate-500">
          Try adjusting filters or refresh to load the latest listings.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {opportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity._id}
          opportunity={opportunity}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
