import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../../../Services/expenseVehicle.service";
import { useDebounce } from "../../Investments/Hooks/useDebounce";
import type { ExpenseSubType } from "../Types/ExpenseList.types";

const DEBOUNCE_MS = 500;

interface Filters {
  isShared: boolean;
  year: number | null;
  month: number | null;
  type: ExpenseSubType | null;
  name: string;
  page: number;
}

export const useExpenseList = (filters: Filters) => {
  const debouncedYear = useDebounce(filters.year, DEBOUNCE_MS);
  const debouncedMonth = useDebounce(filters.month, DEBOUNCE_MS);
  const debouncedName = useDebounce(filters.name, DEBOUNCE_MS);

  const isDebouncing =
    filters.year !== debouncedYear ||
    filters.month !== debouncedMonth ||
    filters.name !== debouncedName;

  const query = useQuery({
    queryKey: [
      "expenses-list",
      filters.isShared,
      filters.type,
      filters.page,
      debouncedYear,
      debouncedMonth,
      debouncedName,
    ],
    queryFn: () =>
      getExpenses({
        limit: 20,
        page: filters.page,
        isShared: filters.isShared,
        ...(debouncedYear !== null && { year: debouncedYear }),
        ...(debouncedMonth !== null && { month: debouncedMonth }),
        ...(filters.type && { type: filters.type }),
        ...(debouncedName && { name: debouncedName }),
      }),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1_000,
  });

  return { ...query, isDebouncing };
};
