import { Navigate, Outlet } from "react-router-dom";
import { useUserProfile } from "@/hooks/use-user-profile";

export const InvestorRoute = () => {
  const { data: profile, isLoading } = useUserProfile();

  if (isLoading) return <div className="h-screen bg-background" />;

  const role = profile?.data?.[0]?.role;
  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};
