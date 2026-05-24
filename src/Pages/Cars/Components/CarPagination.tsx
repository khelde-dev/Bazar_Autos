import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import type { CarPagination as CarPaginationType } from "../Types/Cars.types";

interface CarPaginationProps {
  pagination: CarPaginationType;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

/** Smart page list: always shows first, last, and a window around current page. */
function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  const result: (number | "ellipsis")[] = [1];
  if (left > 2) result.push("ellipsis");
  for (let i = left; i <= right; i++) result.push(i);
  if (right < total - 1) result.push("ellipsis");
  result.push(total);

  return result;
}

export const CarPagination: React.FC<CarPaginationProps> = ({
  pagination,
  onPageChange,
  isLoading,
}) => {
  const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;

  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent className="gap-0.5">
        {/* Previous */}
        <PaginationItem>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrevPage || isLoading}
            className="size-9"
            aria-label="Página anterior"
          >
            <ChevronLeft className="size-4" />
          </Button>
        </PaginationItem>

        {/* Mobile: compact current/total indicator */}
        <PaginationItem className="sm:hidden">
          <span className="px-2 text-sm tabular-nums text-muted-foreground">
            {currentPage} / {totalPages}
          </span>
        </PaginationItem>

        {/* Desktop: smart page numbers with ellipsis */}
        {pages.map((page, idx) =>
          page === "ellipsis" ? (
            <PaginationItem key={`e-${idx}`} className="hidden sm:flex">
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page} className="hidden sm:flex">
              <button
                type="button"
                onClick={() => onPageChange(page)}
                disabled={isLoading}
                aria-label={`Página ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-9 text-sm",
                  currentPage === page &&
                    "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                )}
              >
                {page}
              </button>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNextPage || isLoading}
            className="size-9"
            aria-label="Página siguiente"
          >
            <ChevronRight className="size-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
