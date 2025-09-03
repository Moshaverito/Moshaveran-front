import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiGetBillingInfo } from "../../services/apiPayment";

/* ------------- using React Query to handle the Marking as read process. ------------ */
export function useGetBillingInfo() {
  const { data: billingInfo, isLoading: isFetchingBillingInfo } = useQuery({
    queryKey: ["billingInfo"],
    queryFn: apiGetBillingInfo,
    onError: (error) => {
      toast.error(error.message || "خطا در ورود، لطفا مجددا تلاش کنید");
    },
  });

  return {
    billingInfo,
    isFetchingBillingInfo,
  };
}
