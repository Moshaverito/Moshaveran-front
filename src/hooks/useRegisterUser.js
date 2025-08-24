import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiRegisterUser } from "../services/apiAuth";

/* ------------- using React Query to handle the Marking as read process. ------------ */
export function useRegisterUser() {
  const { mutate: registerUserData, isPending: isUserRegistering } =
    useMutation({
      mutationFn: (data) => apiRegisterUser(data),
      onSuccess: () => {
        toast.success("کد تایید با موفقیت ثبت شد");
      },
      onError: (error) => {
        toast.error(error.message || "کد تایید نامعتبر است");
      },
    });

  return {
    registerUserData,
    isUserRegistering,
  };
}
