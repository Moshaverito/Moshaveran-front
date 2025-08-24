import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiLogIn } from "../services/apiAuth";

/* ------------- using React Query to handle the Marking as read process. ------------ */
export function useRegularLogin() {
  const { mutate: regularLogin, isPending: isLoggingIn } = useMutation({
    mutationFn: (formData) => apiLogIn(formData),
    onSuccess: () => {
      toast.success("ورود موفقیت أمیز بود. خوش آمدید");
    },
    onError: (error) => {
      toast.error(error.message || "خطا در ورود، لطفا مجددا تلاش کنید");
    },
  });

  return {
    regularLogin,
    isLoggingIn,
  };
}
