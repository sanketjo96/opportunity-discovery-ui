import type { Opportunity } from "../types/opportunity";

const DESCRIPTION_LEN = 140;

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
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
      <div className="mt-3 flex flex-wrap gap-2">
        {opportunity.roles.map((role) => (
          <span
            key={role}
            className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-800 ring-1 ring-inset ring-indigo-600/15"
          >
            {role}
          </span>
        ))}
      </div>
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
