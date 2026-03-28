import { useEffect } from "react";
import type { Opportunity } from "../types/opportunity";

interface OpportunityDetailProps {
  opportunity: Opportunity | null;
  onClose: () => void;
}

function titleCaseCategory(value: string): string {
  const lower = value.trim().toLowerCase();
  if (lower === "voiceovers") return "Voiceovers";
  return lower ? lower.charAt(0).toUpperCase() + lower.slice(1) : value;
}

function formatGenderPreference(value: string): string {
  const t = value.trim();
  const lower = t.toLowerCase();
  if (lower === "unisex") return "Unisex";
  return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}

export function OpportunityDetail({
  opportunity,
  onClose,
}: OpportunityDetailProps) {
  useEffect(() => {
    if (!opportunity) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [opportunity, onClose]);

  useEffect(() => {
    if (opportunity) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [opportunity]);

  if (!opportunity) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close details"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="opportunity-detail-title"
        className="relative z-10 flex max-h-[min(90vh,700px)] w-full max-w-2xl flex-col rounded-t-3xl border border-slate-200 bg-white shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <h2
            id="opportunity-detail-title"
            className="text-xl font-semibold tracking-tight text-slate-900"
          >
            {opportunity.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path d="M6.22 6.22a.75.75 0 0 1 1.06 0L10 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L11.06 10l2.72 2.72a.75.75 0 1 1-1.06 1.06L10 11.06l-2.72 2.72a.75.75 0 0 1-1.06-1.06L8.94 10 6.22 7.28a.75.75 0 0 1 0-1.06Z" />
            </svg>
          </button>
        </div>
        <div className="space-y-6 overflow-y-auto px-6 py-6">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </dt>
              <dd className="mt-1 text-sm text-slate-800">
                {opportunity.category?.trim() ? (
                  titleCaseCategory(opportunity.category)
                ) : (
                  <span className="italic text-slate-400">Not specified</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Gender preference
              </dt>
              <dd className="mt-1 text-sm text-slate-800">
                {opportunity.genderPreference?.trim() ? (
                  formatGenderPreference(opportunity.genderPreference)
                ) : (
                  <span className="italic text-slate-400">Not specified</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Age range
              </dt>
              <dd className="mt-1 text-sm text-slate-800">
                {opportunity.ageRange?.trim() ? (
                  opportunity.ageRange.trim().replace(/-/g, "–")
                ) : (
                  <span className="italic text-slate-400">Not specified</span>
                )}
              </dd>
            </div>
          </dl>
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Description
            </h3>
            {opportunity.description?.trim() ? (
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                {opportunity.description.trim()}
              </p>
            ) : (
              <p className="mt-2 text-sm italic text-slate-400">No description</p>
            )}
          </section>
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Roles
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {opportunity.roles.length === 0 ? (
                <span className="text-sm italic text-slate-400">—</span>
              ) : (
                opportunity.roles.map((role) => (
                  <span
                    key={role}
                    className="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-800 ring-1 ring-inset ring-indigo-600/15"
                  >
                    {role}
                  </span>
                ))
              )}
            </div>
          </section>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Location
              </dt>
              <dd className="mt-1 text-sm text-slate-800">
                {opportunity.location?.trim() || (
                  <span className="italic text-slate-400">Not specified</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Language
              </dt>
              <dd className="mt-1 text-sm text-slate-800">
                {opportunity.language?.trim() || (
                  <span className="italic text-slate-400">Not specified</span>
                )}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Contact
              </dt>
              <dd className="mt-1 break-all text-sm text-slate-800">
                {opportunity.contact?.trim() || (
                  <span className="italic text-slate-400">Not specified</span>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
