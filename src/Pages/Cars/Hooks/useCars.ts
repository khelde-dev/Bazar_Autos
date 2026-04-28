import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCars } from "../../../Services/cars.service";
import type { CarFilters } from "../Types/Cars.types";

export const useCars = (filters: CarFilters) =>
  useQuery({
    queryKey: ["cars", filters],
    queryFn: () => getCars(filters),
    staleTime: 1000 * 60 * 3,
    placeholderData: keepPreviousData,
  });
