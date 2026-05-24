import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/Services/dashboard.service";
import type { DashboardParams } from "../Types/Dashboard.types";

export const useDashboard = (params: DashboardParams) => {
  return useQuery({
    queryKey: ["dashboard", params],
    queryFn: () => getDashboard(params),
    staleTime: 1000 * 60 * 5, // 5 min — dashboard data doesn't change second-by-second
    placeholderData: (prev) => prev, // keep previous data while refetching (no flicker on filter change)
  });
};
