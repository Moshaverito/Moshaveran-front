import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { apiUpdateBillingInfo } from "../../services/apiPayment";

/* ------------- using React Query to handle the Marking as read process. ------------ */
export function useUpdateBillingInfo() {
  const { mutate: updateBillingInfo, isPending: isUpdatingBillingInfo } =
    useMutation({
      mutationFn: (billingData) => apiUpdateBillingInfo(billingData),
      onError: (error) => {
        toast.error(error.message || "خطا در افزودن اطلاعات بانکی ");
      },
    });

  return {
    updateBillingInfo,
    isUpdatingBillingInfo,
  };
}
