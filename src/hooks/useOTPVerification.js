import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiVerifyOTP } from "../services/apiAuth";

/* ------------- using React Query to handle the Marking as read process. ------------ */
export function useOTPVerification() {
  const { mutate: otpVerification, isPending: isOtpVerifying } = useMutation({
    mutationFn: (formData) => apiVerifyOTP(formData),
    onSuccess: () => {
      toast.success("ورود موفقیت أمیز بود. خوش آمدید");
    },
    onError: (error) => {
      toast.error(error.message || "خطا در ورود، لطفا مجددا تلاش کنید");
    },
  });

  return {
    otpVerification,
    isOtpVerifying,
  };
}
