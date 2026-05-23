import { useQuery } from "@tanstack/react-query";
import { getListUser, getUser } from "@/Services/auth.service";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 60,
  });
};

export const useUserList = () => {
  return useQuery({
    queryKey: ["users-List"],
    queryFn: getListUser,
    staleTime: 1000 * 60 * 60,
  });
};
