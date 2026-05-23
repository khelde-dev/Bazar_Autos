import { Navigate, Outlet } from "react-router-dom";
import { INVESTOR_USER_ID } from "@/lib/constants";
import { useUserProfile } from "@/hooks/use-user-profile";

export const InvestorRoute = () => {
  const { data: user, isLoading } = useUserProfile();

  if (isLoading) return <div className="h-screen bg-background" />;

  const userId = user?.data?.[0]?.user_id;
  if (userId !== INVESTOR_USER_ID) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};
