import { useQuery } from "@tanstack/react-query";
import { ApiGetNotifications } from "../../services/apiNotifications";
import toast from "react-hot-toast";

export function useGetNotifications() {
  /* ---------------- using react query to fetch notifications ---------------- */
  const {
    isLoading,
    data: notifications,
    refetch: refetchNotifications,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: ApiGetNotifications,
    onError: () => {
      toast.error("خطا در بارگذاری اعلان‌ها. لطفاً دوباره تلاش کنید.");
    },
  });

  return {
    isLoading,
    notifications,
    refetchNotifications,
  };
}
