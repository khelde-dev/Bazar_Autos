import { Navigate, Outlet } from "react-router-dom";
import { useUserProfile } from "../../Pages/Menu/Hooks/UserProfile";

const INVESTOR_USER_ID = "f272776e-7033-44c4-82de-f7c668f17cf0";

export const InvestorRoute = () => {
  const { data: user, isLoading } = useUserProfile();

  if (isLoading) return <div className="h-screen bg-[#F8FAFC]" />;

  const userId = user?.data?.[0]?.user_id;
  if (userId !== INVESTOR_USER_ID) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};
