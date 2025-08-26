import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { fetchMonthlyIncome } from "../../services/apiSessions";

export function useGetMonthlyIncome() {
  /* ---------------- using react query to fetch notifications ---------------- */
  const {
    isLoading: isLoadingMonthlyInCome,
    data: monthlyInComeData,
    refetch: refetchMonthlyInCome,
  } = useQuery({
    queryKey: ["monthlyInCome"],
    queryFn: fetchMonthlyIncome,
    onError: () => {
      toast.error("خطا در بارگذاری اعلان‌ها. لطفاً دوباره تلاش کنید.");
    },
  });

  console.log(monthlyInComeData);
  return {
    isLoadingMonthlyInCome,
    monthlyInComeData,
    refetchMonthlyInCome,
  };
}
