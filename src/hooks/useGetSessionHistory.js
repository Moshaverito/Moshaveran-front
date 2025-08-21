import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { fetchSessionHistory } from "../services/apiSessions";

export function useGetSessionHistory() {
  /* ---------------- using react query to fetch notifications ---------------- */
  const {
    isLoading: isLoadingSessionHistory,
    data: sessionHistory,
    refetch: refetchSessionHistory,
  } = useQuery({
    queryKey: ["sessionHistory"],
    queryFn: fetchSessionHistory,
    onError: () => {
      toast.error("خطا در بارگذاری اعلان‌ها. لطفاً دوباره تلاش کنید.");
    },
  });

  return {
    isLoadingSessionHistory,
    sessionHistory,
    refetchSessionHistory,
  };
}
