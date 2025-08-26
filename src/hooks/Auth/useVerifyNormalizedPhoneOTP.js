import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiVerifyNormalizedPhoneOTP } from "../../services/apiAuth";

/* ------------- using React Query to handle the Marking as read process. ------------ */
export function useVerifyNormalizedPhoneOTP() {
  const {
    mutate: verifyNormalizedPhoneOTP,
    isPending: isVerifyNormalizedPhoneOTPVerifying,
  } = useMutation({
    mutationFn: (data) => apiVerifyNormalizedPhoneOTP(data),
    onSuccess: () => {
      toast.success("کد تایید با موفقیت ثبت شد");
    },
    onError: (error) => {
      toast.error(error.message || "کد تایید نامعتبر است");
    },
  });

  return {
    verifyNormalizedPhoneOTP,
    isVerifyNormalizedPhoneOTPVerifying,
  };
}
