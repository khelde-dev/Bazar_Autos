import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { validateSession } from "../auth.service";

export const ProtectedRoute = () => {
  const isAuthSignal = localStorage.getItem("isAuthenticated") === "true";

  const { isLoading, isError } = useQuery({
    queryKey: ["check-auth"],
    queryFn: validateSession,
    enabled: isAuthSignal,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  if (!isAuthSignal) return <Navigate to="/login" replace />;
  if (isLoading) return <div className="h-screen bg-[#F8FAFC] dark:bg-slate-900" />;
  if (isError) {
    localStorage.removeItem("isAuthenticated");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
