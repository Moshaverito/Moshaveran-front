import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiSendOTP } from "../services/apiAuth";

/* ------------- using React Query to handle the Marking as read process. ------------ */
export function useSendOTP() {
  const { mutate: sendOTP, isPending: isSendingOTP } = useMutation({
    mutationFn: (formData) => apiSendOTP(formData),
    onSuccess: () => {
      toast.success("کد ارسال شد");
    },
    onError: (error) => {
      toast.error(error.message || "خطا در ارسال کد");
    },
  });

  return {
    sendOTP,
    isSendingOTP,
  };
}
