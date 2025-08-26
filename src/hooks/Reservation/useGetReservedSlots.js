import { useQuery } from "@tanstack/react-query";
import { fetchReservedSlots } from "../../services/apiReservation";
import toast from "react-hot-toast";

export function useGetReservedSlots() {
  /* ---------------- using react query to fetch notifications ---------------- */
  const { isLoading: isReservedSlotsLoading, data: reservedSlotsData } =
    useQuery({
      queryKey: ["reservedSlots"],
      queryFn: fetchReservedSlots,
      onError: () => {
        toast.error("خطا در بارگذاری. لطفاً دوباره تلاش کنید.");
      },
    });

  console.log(reservedSlotsData);

  return {
    isReservedSlotsLoading,
    reservedSlotsData,
  };
}
