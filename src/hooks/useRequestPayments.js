import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { requestPaymentAPI } from "../services/apiSessions";

/* ------------- using React Query to handle the Marking as read process. ------------ */
export function useRequestPayments() {
  const queryClient = useQueryClient();

  const { mutate: requestPayment, isPending } = useMutation({
    mutationFn: ({ amount }) => requestPaymentAPI({ amount }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("درخواست پرداخت با موفقیت ارسال شد");
    },
    onError: (error) => {
      toast.error("خطا در درخواست پرداخت", error.message);
    },
  });

  return {
    requestPayment,
    isLoading: isPending,
  };
}
