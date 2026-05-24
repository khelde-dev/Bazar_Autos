import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const CURRENT_YEAR = new Date().getFullYear();

/**
 * URL-persisted dashboard filters (year, month).
 * - `year` defaults to current year if absent
 * - `month` defaults to "all" if absent
 *
 * Stored as strings to plug directly into shadcn Select.
 */
export const useDashboardUrlFilters = () => {
  const [params, setParams] = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(params);
      if (value === null || value === "") next.delete(key);
      else next.set(key, value);
      setParams(next, { replace: true });
    },
    [params, setParams]
  );

  const year = useMemo(() => params.get("year") ?? String(CURRENT_YEAR), [params]);
  const month = useMemo(() => params.get("month") ?? "all", [params]);

  const setYear = useCallback((y: string) => updateParam("year", y), [updateParam]);
  const setMonth = useCallback(
    (m: string) => updateParam("month", m === "all" ? null : m),
    [updateParam]
  );

  return { year, month, setYear, setMonth };
};
