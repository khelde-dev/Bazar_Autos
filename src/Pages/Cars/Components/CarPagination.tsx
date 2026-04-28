import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import type { CarPagination as CarPaginationType } from "../Types/Cars.types";

interface CarPaginationProps {
  pagination: CarPaginationType;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const CarPagination: React.FC<CarPaginationProps> = ({
  pagination,
  onPageChange,
  isLoading,
}) => {
  const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;

  if (totalPages <= 1) return null;

  const visiblePages = Array.from(
    { length: Math.min(totalPages, 7) },
    (_, i) => i + 1
  );

  return (
    <div className="flex items-center justify-between px-2 pt-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage || isLoading}
        aria-label="Página anterior"
        className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-500 dark:text-slate-400 shadow-sm hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex items-center gap-1.5">
        {visiblePages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            disabled={isLoading}
            className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
              currentPage === p
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-50"
            }`}
          >
            {p}
          </button>
        ))}
        {totalPages > 7 && (
          <span className="text-gray-400 dark:text-slate-500 text-xs font-bold px-1">… {totalPages}</span>
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage || isLoading}
        aria-label="Página siguiente"
        className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-500 dark:text-slate-400 shadow-sm hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};
