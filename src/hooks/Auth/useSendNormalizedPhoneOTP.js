import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiSendNormalizedPhoneOTP } from "../../services/apiAuth";

/* ------------- using React Query to handle the Marking as read process. ------------ */
export function useSendNormalizedPhoneOTP() {
  const {
    mutate: sendNormalizedPhoneOTP,
    isPending: isSendNormalizedPhoneOTP,
  } = useMutation({
    mutationFn: (normalizedPhone) => apiSendNormalizedPhoneOTP(normalizedPhone),
    onSuccess: () => {
      toast.success("کد ارسال شد");
    },
    onError: (error) => {
      toast.error(error.message || "خطا در ارسال کد");
    },
  });

  return {
    sendNormalizedPhoneOTP,
    isSendNormalizedPhoneOTP,
  };
}
