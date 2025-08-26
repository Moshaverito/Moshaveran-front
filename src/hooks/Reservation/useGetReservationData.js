import { useQuery } from "@tanstack/react-query";
import { fetchReservationData } from "../../services/apiReservation";
import toast from "react-hot-toast";

export function useGetReservationData() {
  /* ---------------- using react query to fetch notifications ---------------- */
  const { isLoading: isReservationDataLoading, data: reservationData } =
    useQuery({
      queryKey: ["reservationData"],
      queryFn: fetchReservationData,
      onError: () => {
        toast.error("خطا در بارگذاری. لطفاً دوباره تلاش کنید.");
      },
    });

  return {
    isReservationDataLoading,
    reservationData,
  };
}
