import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { CarFilters } from "../Types/Cars.types";

const LIMIT = 10;

const AVAILABLE_YEARS = Array.from(
  { length: new Date().getFullYear() - 2000 + 1 },
  (_, i) => new Date().getFullYear() - i
);

export const useCarFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const page = Number(searchParams.get("page")) || 1;
  const year = searchParams.get("year") ? Number(searchParams.get("year")) : null;
  const month = searchParams.get("month") ? Number(searchParams.get("month")) : null;

  const filters: CarFilters = { search, page, limit: LIMIT, year, month };

  const setPage = useCallback(
    (p: number) => {
      setSearchParams(
        (prev) => {
          const current = Number(prev.get("page")) || 1;
          if (current === p) return prev;
          const next = new URLSearchParams(prev);
          p > 1 ? next.set("page", String(p)) : next.delete("page");
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchParams(
        (prev) => {
          if ((prev.get("search") ?? "") === value) return prev;
          const next = new URLSearchParams(prev);
          value ? next.set("search", value) : next.delete("search");
          next.delete("page");
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const handleYearChange = useCallback(
    (y: number | null) => {
      setSearchParams(
        (prev) => {
          const currentRaw = prev.get("year");
          const current = currentRaw ? Number(currentRaw) : null;
          if (current === y) return prev;
          const next = new URLSearchParams(prev);
          y !== null ? next.set("year", String(y)) : next.delete("year");
          next.delete("page");
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const handleMonthChange = useCallback(
    (m: number | null) => {
      setSearchParams(
        (prev) => {
          const currentRaw = prev.get("month");
          const current = currentRaw ? Number(currentRaw) : null;
          if (current === m) return prev;
          const next = new URLSearchParams(prev);
          m !== null ? next.set("month", String(m)) : next.delete("month");
          next.delete("page");
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  return {
    filters,
    availableYears: AVAILABLE_YEARS,
    setPage,
    handleSearchChange,
    handleYearChange,
    handleMonthChange,
  };
};
