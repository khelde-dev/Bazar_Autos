import { useUserProfile } from "@/hooks/use-user-profile";

interface UseUserRoleResult {
  isAdmin: boolean;
  isLoading: boolean;
  userId: string | undefined;
  username: string | undefined;
  role: string | undefined;
}

export const useUserRole = (): UseUserRoleResult => {
  const { data, isLoading } = useUserProfile();
  const profile = data?.data?.[0];

  return {
    isAdmin: profile?.role === "admin",
    isLoading,
    userId: profile?.user_id,
    username: profile?.username,
    role: profile?.role,
  };
};
