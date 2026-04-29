import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { ExpenseSubType } from "../Types/ExpenseList.types";

export const useExpenseUrlFilters = () => {
  const [params, setParams] = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string | number | boolean | null, resetPage = true) => {
      const next = new URLSearchParams(params);
      if (value === null || value === "") next.delete(key);
      else next.set(key, String(value));
      if (resetPage && key !== "page") next.delete("page");
      setParams(next, { replace: true });
    },
    [params, setParams]
  );

  const year = useMemo(() => {
    const raw = params.get("year");
    return raw ? Number(raw) : null;
  }, [params]);

  const month = useMemo(() => {
    const raw = params.get("month");
    return raw ? Number(raw) : null;
  }, [params]);

  const type = useMemo(() => {
    const raw = params.get("type");
    if (raw === "Activo" || raw === "Pasivo") return raw as ExpenseSubType;
    return null;
  }, [params]);

  const name = useMemo(() => params.get("name") ?? "", [params]);

  // default: grouped (isShared=true). Only false when explicitly set
  const isShared = useMemo(() => params.get("isShared") !== "false", [params]);

  const page = useMemo(() => {
    const raw = params.get("page");
    return raw ? Math.max(1, Number(raw)) : 1;
  }, [params]);

  const setYear = useCallback((y: number | null) => updateParam("year", y), [updateParam]);
  const setMonth = useCallback((m: number | null) => updateParam("month", m), [updateParam]);
  const setType = useCallback((t: ExpenseSubType | null) => updateParam("type", t), [updateParam]);
  const setName = useCallback((n: string) => updateParam("name", n), [updateParam]);
  const setIsShared = useCallback((v: boolean) => updateParam("isShared", v), [updateParam]);
  const setPage = useCallback((p: number) => updateParam("page", p, false), [updateParam]);

  return { year, month, type, name, isShared, page, setYear, setMonth, setType, setName, setIsShared, setPage };
};
