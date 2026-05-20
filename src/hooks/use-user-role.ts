import { INVESTOR_USER_ID } from "@/lib/constants";
import { useUserProfile } from "@/hooks/use-user-profile";

interface UseUserRoleResult {
  isInvestor: boolean;
  isLoading: boolean;
  userId: string | undefined;
  username: string | undefined;
}

/**
 * Resolves current user role (temporary client-side check).
 * TODO: migrate to backend role middleware.
 */
export const useUserRole = (): UseUserRoleResult => {
  const { data, isLoading } = useUserProfile();
  const profile = data?.data?.[0];

  return {
    isInvestor: profile?.user_id === INVESTOR_USER_ID,
    isLoading,
    userId: profile?.user_id,
    username: profile?.username,
  };
};
