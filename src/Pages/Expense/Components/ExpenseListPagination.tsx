import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ExpensePagination } from "../Types/ExpenseList.types";

interface Props {
  pagination: ExpensePagination;
  onPageChange: (page: number) => void;
}

export const ExpenseListPagination = ({ pagination, onPageChange }: Props) => {
  const { currentPage, totalPages, hasPrevPage, hasNextPage, total } = pagination;

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-2">
      <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
        {total} resultado{total !== 1 ? "s" : ""}
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
          aria-label="Página anterior"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 min-w-[3rem] text-center">
          {currentPage} / {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
          aria-label="Página siguiente"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
