import { Car, Loader2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { YearMonthFilter } from "../Investments/Components/YearMonthFilter";
import { CarListItem } from "./Components/CarListItem";
import { CarPagination } from "./Components/CarPagination";
import { CarSearchBar } from "./Components/CarSearchBar";
import { DeleteConfirmModal } from "./Components/DeleteConfirmModal";
import { useCarFilters } from "./Hooks/useCarFilters";
import { useCars } from "./Hooks/useCars";
import { useDeleteCar } from "./Hooks/useDeleteCar";
import type { CarListItem as CarListItemType, CarPagination as CarPaginationType } from "./Types/Cars.types";

const DEFAULT_PAGINATION: CarPaginationType = {
  total: 0, totalPages: 1, currentPage: 1,
  limit: 10, hasNextPage: false, hasPrevPage: false,
};

export const CarListPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    filters, availableYears, setPage,
    handleSearchChange, handleYearChange, handleMonthChange,
  } = useCarFilters();

  const { data, isLoading, isFetching } = useCars(filters);
  const [carToDelete, setCarToDelete] = useState<CarListItemType | null>(null);
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteCar();

  const rows = data?.data.rows ?? [];
  const pagination = data?.data.pagination ?? DEFAULT_PAGINATION;

  const handleDeleteConfirm = () => {
    if (!carToDelete) return;
    deleteMutate(carToDelete.car_id, { onSuccess: () => setCarToDelete(null) });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 pb-10 font-sans transition-colors">
      <main className="max-w-md mx-auto p-4 space-y-4">
        <CarSearchBar value={filters.search} onChange={handleSearchChange} />

        <YearMonthFilter
          years={availableYears}
          selectedYear={filters.year ?? null}
          selectedMonth={filters.month ?? null}
          onYearChange={handleYearChange}
          onMonthChange={handleMonthChange}
        />

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-blue-500 dark:text-blue-400" size={32} strokeWidth={2.5} />
          </div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="w-14 h-14 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <Car className="text-gray-400 dark:text-slate-500" size={26} />
            </div>
            <p className="font-bold text-slate-600 dark:text-slate-300 text-sm">Sin resultados</p>
            <p className="text-gray-400 dark:text-slate-500 text-xs">
              No hay vehículos que coincidan con tu búsqueda.
            </p>
          </div>
        ) : (
          <div className={`space-y-3 transition-opacity ${isFetching ? "opacity-60" : ""}`}>
            {rows.map((car) => (
              <CarListItem
                key={car.car_id}
                car={car}
                onClick={() => navigate(`/cars/${car.car_id}/edit`, { state: { listItem: car } })}
                onDeleteRequest={setCarToDelete}
              />
            ))}
          </div>
        )}

        <CarPagination
          pagination={pagination}
          onPageChange={setPage}
          isLoading={isFetching}
        />
      </main>

      <DeleteConfirmModal
        car={carToDelete}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setCarToDelete(null)}
      />
    </div>
  );
};
