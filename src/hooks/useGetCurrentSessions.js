import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchCurrentSessions } from "../services/apiSessions";

export function useGetCurrentSessions() {
  /* ---------------- using react query to fetch notifications ---------------- */
  const {
    isLoadingCurrentSessions,
    data: currentSessions,
    refetch: refetchCurrentSessions,
  } = useQuery({
    queryKey: ["currentSessions"],
    queryFn: fetchCurrentSessions,
    onError: (error) => {
      toast.error(
        error?.message || "خطا در بارگذاری اعلان‌ها. لطفاً دوباره تلاش کنید."
      );
    },
  });

  return {
    isLoadingCurrentSessions,
    currentSessions,
    refetchCurrentSessions,
  };
}
