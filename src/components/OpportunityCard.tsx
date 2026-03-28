import type { Opportunity } from "../types/opportunity";

const DESCRIPTION_LEN = 250;

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

function formatGender(value: string | undefined): string {
  if (!value?.trim()) return "—";
  const v = value.trim().toLowerCase();
  if (v === "unisex") return "Unisex";
  return v.charAt(0).toUpperCase() + v.slice(1);
}

function formatAgeRange(value: string | undefined): string {
  if (!value?.trim()) return "—";
  return value.trim().replace(/-/g, "–");
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  onSelect: (opportunity: Opportunity) => void;
}

export function OpportunityCard({
  opportunity,
  onSelect,
}: OpportunityCardProps) {
  const desc = opportunity.description?.trim();
  const preview = desc ? truncate(desc, DESCRIPTION_LEN) : null;

  return (
    <button
      type="button"
      onClick={() => onSelect(opportunity)}
      className="group flex h-full w-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
    >
      <h2 className="text-lg font-semibold tracking-tight text-slate-900 transition group-hover:text-indigo-700">
        {opportunity.title}
      </h2>
      <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Gender
          </dt>
          <dd className="mt-0.5 text-slate-800">
            {formatGender(opportunity.genderPreference)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Age range
          </dt>
          <dd className="mt-0.5 text-slate-800">
            {formatAgeRange(opportunity.ageRange)}
          </dd>
        </div>
      </dl>
      {opportunity.location ? (
        <p className="mt-3 text-sm text-slate-600">
          <span className="font-medium text-slate-700">Location:</span>{" "}
          {opportunity.location}
        </p>
      ) : (
        <p className="mt-3 text-sm italic text-slate-400">Location not listed</p>
      )}
      {preview ? (
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
          {preview}
        </p>
      ) : (
        <p className="mt-3 flex-1 text-sm italic text-slate-400">
          No description
        </p>
      )}
    </button>
  );
}
