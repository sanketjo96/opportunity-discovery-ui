import {
  AGE_RANGE_BUCKETS,
  GENDER_PREFERENCES,
  OPPORTUNITY_CATEGORIES,
} from "../types/opportunity";

function labelCategory(id: string): string {
  if (id === "voiceovers") return "Voiceovers";
  return id.charAt(0).toUpperCase() + id.slice(1);
}

function labelGender(id: string): string {
  if (id === "unisex") return "Unisex";
  return id.charAt(0).toUpperCase() + id.slice(1);
}

function labelAgeRange(id: string): string {
  return id.replace(/-/g, "–");
}

interface FiltersPanelProps {
  locationOptions: string[];
  languageOptions: string[];
  selectedCategories: string[];
  onCategoriesChange: (values: string[]) => void;
  selectedGenders: string[];
  onGendersChange: (values: string[]) => void;
  selectedAgeRanges: string[];
  onAgeRangesChange: (values: string[]) => void;
  location: string;
  onLocationChange: (value: string) => void;
  language: string;
  onLanguageChange: (value: string) => void;
}

export function FiltersPanel({
  locationOptions,
  languageOptions,
  selectedCategories,
  onCategoriesChange,
  selectedGenders,
  onGendersChange,
  selectedAgeRanges,
  onAgeRangesChange,
  location,
  onLocationChange,
  language,
  onLanguageChange,
}: FiltersPanelProps) {
  const toggle = (value: string, selected: string[], set: (v: string[]) => void) => {
    if (selected.includes(value)) {
      set(selected.filter((x) => x !== value));
    } else {
      set([...selected, value]);
    }
  };

  return (
    <aside className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Filters
      </h2>
      <p className="mt-1 text-xs text-slate-500">
        Refine listings; values are sent as API query parameters.
      </p>

      <div className="mt-5 space-y-5">
        <fieldset>
          <legend className="text-sm font-medium text-slate-800">Category</legend>
          <p className="mt-0.5 text-xs text-slate-500">Multi-select</p>
          <ul className="mt-3 space-y-2">
            {OPPORTUNITY_CATEGORIES.map((id) => {
              const inputId = `cat-${id}`;
              const checked = selectedCategories.includes(id);
              return (
                <li key={id}>
                  <label
                    htmlFor={inputId}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-slate-50"
                  >
                    <input
                      id={inputId}
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        toggle(id, selectedCategories, onCategoriesChange)
                      }
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700">{labelCategory(id)}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium text-slate-800">
            Gender preference
          </legend>
          <p className="mt-0.5 text-xs text-slate-500">Multi-select</p>
          <ul className="mt-3 space-y-2">
            {GENDER_PREFERENCES.map((id) => {
              const inputId = `gender-${id}`;
              const checked = selectedGenders.includes(id);
              return (
                <li key={id}>
                  <label
                    htmlFor={inputId}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-slate-50"
                  >
                    <input
                      id={inputId}
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        toggle(id, selectedGenders, onGendersChange)
                      }
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700">{labelGender(id)}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium text-slate-800">Age range</legend>
          <p className="mt-0.5 text-xs text-slate-500">Multi-select</p>
          <ul className="mt-3 space-y-2">
            {AGE_RANGE_BUCKETS.map((id) => {
              const inputId = `age-${id}`;
              const checked = selectedAgeRanges.includes(id);
              return (
                <li key={id}>
                  <label
                    htmlFor={inputId}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-slate-50"
                  >
                    <input
                      id={inputId}
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        toggle(id, selectedAgeRanges, onAgeRangesChange)
                      }
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700">{labelAgeRange(id)}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <div>
          <label
            htmlFor="filter-location"
            className="text-sm font-medium text-slate-800"
          >
            Location
          </label>
          <select
            id="filter-location"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="">All locations</option>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          {locationOptions.length === 0 ? (
            <p className="mt-1 text-xs italic text-slate-400">
              Load data to populate locations
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="filter-language"
            className="text-sm font-medium text-slate-800"
          >
            Language
          </label>
          <select
            id="filter-language"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="">All languages</option>
            {languageOptions.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          {languageOptions.length === 0 ? (
            <p className="mt-1 text-xs italic text-slate-400">
              Load data to populate languages
            </p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
