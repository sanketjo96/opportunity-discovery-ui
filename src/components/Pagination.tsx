interface PaginationProps {
  /** 1-based */
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export function Pagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  if (totalItems <= 0) return null;

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const from = (safePage - 1) * pageSize + 1;
  const to = Math.min(safePage * pageSize, totalItems);

  const go = (next: number) => {
    const clamped = Math.min(Math.max(1, next), totalPages);
    if (clamped !== page) onPageChange(clamped);
  };

  const windowSize = 5;
  let start = Math.max(1, safePage - Math.floor(windowSize / 2));
  let end = Math.min(totalPages, start + windowSize - 1);
  if (end - start + 1 < windowSize) {
    start = Math.max(1, end - windowSize + 1);
  }
  const pageNumbers: number[] = [];
  for (let i = start; i <= end; i++) pageNumbers.push(i);

  return (
    <nav
      className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row"
      aria-label="Pagination"
    >
      <p className="text-sm text-slate-600">
        Showing{" "}
        <span className="font-medium text-slate-900">
          {from}–{to}
        </span>{" "}
        of <span className="font-medium text-slate-900">{totalItems}</span>
      </p>
      <div className="flex flex-wrap items-center gap-1">
        <button
          type="button"
          onClick={() => go(1)}
          disabled={disabled || safePage <= 1}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          First
        </button>
        <button
          type="button"
          onClick={() => go(safePage - 1)}
          disabled={disabled || safePage <= 1}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <div className="flex items-center gap-0.5 px-1">
          {start > 1 ? (
            <>
              <PageButton
                page={1}
                current={safePage}
                onSelect={go}
                disabled={disabled}
              />
              {start > 2 ? (
                <span className="px-1 text-slate-400" aria-hidden>
                  …
                </span>
              ) : null}
            </>
          ) : null}
          {pageNumbers.map((n) => (
            <PageButton
              key={n}
              page={n}
              current={safePage}
              onSelect={go}
              disabled={disabled}
            />
          ))}
          {end < totalPages ? (
            <>
              {end < totalPages - 1 ? (
                <span className="px-1 text-slate-400" aria-hidden>
                  …
                </span>
              ) : null}
              <PageButton
                page={totalPages}
                current={safePage}
                onSelect={go}
                disabled={disabled}
              />
            </>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => go(safePage + 1)}
          disabled={disabled || safePage >= totalPages}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
        <button
          type="button"
          onClick={() => go(totalPages)}
          disabled={disabled || safePage >= totalPages}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Last
        </button>
      </div>
    </nav>
  );
}

function PageButton({
  page,
  current,
  onSelect,
  disabled,
}: {
  page: number;
  current: number;
  onSelect: (p: number) => void;
  disabled?: boolean;
}) {
  const isCurrent = page === current;
  return (
    <button
      type="button"
      onClick={() => onSelect(page)}
      disabled={disabled}
      aria-current={isCurrent ? "page" : undefined}
      className={`min-w-[2.25rem] rounded-lg px-2 py-1.5 text-sm font-medium transition ${
        isCurrent
          ? "bg-indigo-600 text-white shadow-sm"
          : "text-slate-700 hover:bg-slate-100"
      } disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {page}
    </button>
  );
}
