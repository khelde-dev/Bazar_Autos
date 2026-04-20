import { useQuery } from "@tanstack/react-query";
import { getInvestmentsByUser } from "../../../Services/investors.service";
import { useDebounce } from "./useDebounce";

interface Filters {
  year: number | null;
  month: number | null;
}

const FILTER_DEBOUNCE_MS = 500;

export const useInvestmentsList = (userId: string, filters: Filters) => {
  const debouncedYear = useDebounce(filters.year, FILTER_DEBOUNCE_MS);
  const debouncedMonth = useDebounce(filters.month, FILTER_DEBOUNCE_MS);

  const isDebouncing = filters.year !== debouncedYear || filters.month !== debouncedMonth;

  const query = useQuery({
    queryKey: ["investments", userId, debouncedYear, debouncedMonth],
    queryFn: () =>
      getInvestmentsByUser(userId, {
        year: debouncedYear,
        month: debouncedMonth,
      }),
    enabled: Boolean(userId),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1_000, // 2 min en caché antes de considerar stale
  });

  return { ...query, isDebouncing };
};
