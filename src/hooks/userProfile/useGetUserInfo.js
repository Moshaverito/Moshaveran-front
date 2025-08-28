import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../../services/apiUserInfo";
import toast from "react-hot-toast";

export function useGetUserInfo() {
  const { data: userInfoData, isLoading: isUserInfoDataLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    onError: (error) => {
      toast.error("Error fetching user info:", error);
    },
  });

  return { userInfoData, isUserInfoDataLoading };
}
