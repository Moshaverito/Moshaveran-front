import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { fetchPendingSessions } from "../services/apiSessions";

export function useGetPendingSessions() {
  /* ---------------- using react query to fetch notifications ---------------- */
  const {
    isLoading: isLoadingPendingSessions,
    data: pendingSessions,
    refetch: refetchPendingSessions,
  } = useQuery({
    queryKey: ["pendingSessions"],
    queryFn: fetchPendingSessions,
    onError: () => {
      toast.error("خطا در بارگذاری اعلان‌ها. لطفاً دوباره تلاش کنید.");
    },
  });

  return {
    isLoadingPendingSessions,
    pendingSessions,
    refetchPendingSessions,
  };
}
