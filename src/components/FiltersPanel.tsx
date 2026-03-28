interface FiltersPanelProps {
  roleOptions: string[];
  selectedRoles: string[];
  onRolesChange: (roles: string[]) => void;
  location: string;
  onLocationChange: (value: string) => void;
  language: string;
  onLanguageChange: (value: string) => void;
}

export function FiltersPanel({
  roleOptions,
  selectedRoles,
  onRolesChange,
  location,
  onLocationChange,
  language,
  onLanguageChange,
}: FiltersPanelProps) {
  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      onRolesChange(selectedRoles.filter((r) => r !== role));
    } else {
      onRolesChange([...selectedRoles, role]);
    }
  };

  return (
    <aside className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Filters
      </h2>
      <p className="mt-1 text-xs text-slate-500">
        Updates query parameters on the opportunities request.
      </p>

      <div className="mt-5 space-y-5">
        <fieldset>
          <legend className="text-sm font-medium text-slate-800">
            Role
          </legend>
          <p className="mt-0.5 text-xs text-slate-500">Multi-select</p>
          {roleOptions.length === 0 ? (
            <p className="mt-2 text-sm italic text-slate-400">
              No roles loaded yet
            </p>
          ) : (
            <ul className="mt-3 max-h-40 space-y-2 overflow-y-auto pr-1">
              {roleOptions.map((role) => {
                const id = `role-${role}`;
                const checked = selectedRoles.includes(role);
                return (
                  <li key={role}>
                    <label
                      htmlFor={id}
                      className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-slate-50"
                    >
                      <input
                        id={id}
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleRole(role)}
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-slate-700">{role}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </fieldset>

        <div>
          <label
            htmlFor="filter-location"
            className="text-sm font-medium text-slate-800"
          >
            Location
          </label>
          <input
            id="filter-location"
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="e.g. Remote, Berlin"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div>
          <label
            htmlFor="filter-language"
            className="text-sm font-medium text-slate-800"
          >
            Language
          </label>
          <input
            id="filter-language"
            type="text"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            placeholder="e.g. English"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>
    </aside>
  );
}
