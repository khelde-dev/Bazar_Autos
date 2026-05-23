import { useQuery } from "@tanstack/react-query";
import { getTransactionsByInvestment } from "../../../Services/investors.service";
import type { TransactionTypeFilter } from "../Types/Investments.types";
import { useDebounce } from "./useDebounce";

interface Filters {
  year: number | null;
  month: number | null;
  type: TransactionTypeFilter | null;
}

const FILTER_DEBOUNCE_MS = 500;

export const useInvestmentHistory = (investorId: string, filters: Filters) => {
  const debouncedYear = useDebounce(filters.year, FILTER_DEBOUNCE_MS);
  const debouncedMonth = useDebounce(filters.month, FILTER_DEBOUNCE_MS);
  const debouncedType = useDebounce(filters.type, FILTER_DEBOUNCE_MS);

  const isDebouncing =
    filters.year !== debouncedYear ||
    filters.month !== debouncedMonth ||
    filters.type !== debouncedType;

  const query = useQuery({
    queryKey: ["investment-history", investorId, debouncedYear, debouncedMonth, debouncedType],
    queryFn: () =>
      getTransactionsByInvestment(investorId, {
        year: debouncedYear,
        month: debouncedMonth,
        type: debouncedType ?? undefined,
      }),
    enabled: Boolean(investorId),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1_000, // 2 min en caché antes de considerar stale
  });

  return { ...query, isDebouncing };
};
