import { useQueryClient } from "@tanstack/react-query";
import type { CarListItem, CarListResponse } from "../Types/Cars.types";

// Busca un carro por id en cualquier query cacheada de ["cars", *]
export const useCarFromCache = (id: string): CarListItem | null => {
  const queryClient = useQueryClient();
  if (!id) return null;
  const queries = queryClient.getQueriesData<CarListResponse>({ queryKey: ["cars"] });
  for (const [, data] of queries) {
    const found = data?.data?.rows?.find((c) => c.car_id === id);
    if (found) return found;
  }
  return null;
};
