import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { TransactionTypeFilter } from "../Types/Investments.types";

/**
 * Sincroniza los filtros (año/mes/type) con la query string de la URL.
 * Esto permite compartir links y conservar filtros al navegar.
 */
export const useUrlFilters = () => {
  const [params, setParams] = useSearchParams();

  const year = useMemo(() => {
    const raw = params.get("year");
    return raw ? Number(raw) : null;
  }, [params]);

  const month = useMemo(() => {
    const raw = params.get("month");
    return raw ? Number(raw) : null; // 1-12
  }, [params]);

  const type = useMemo(() => {
    const raw = params.get("type");
    if (raw === "Entrada" || raw === "Salida") return raw as TransactionTypeFilter;
    return null;
  }, [params]);

  const updateParam = useCallback(
    (key: string, value: string | number | null) => {
      const next = new URLSearchParams(params);
      if (value === null || value === "") next.delete(key);
      else next.set(key, String(value));
      setParams(next, { replace: true });
    },
    [params, setParams]
  );

  const setYear = useCallback((y: number | null) => updateParam("year", y), [updateParam]);
  const setMonth = useCallback((m: number | null) => updateParam("month", m), [updateParam]);
  const setType = useCallback(
    (t: TransactionTypeFilter | null) => updateParam("type", t),
    [updateParam]
  );

  return { year, month, type, setYear, setMonth, setType };
};
