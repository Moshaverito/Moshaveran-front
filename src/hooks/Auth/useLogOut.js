import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiLogOut } from "../../services/apiAuth";

export function useLogOut() {
  /* ------------- using React Query to handle the logout process. ------------ */
  const { mutate: logout } = useMutation({
    mutationFn: () => apiLogOut(),
    onSuccess: () => {
      toast.success("خروج با موفقیت انجام شد");
      localStorage.clear();
      window.location.reload();
    },
    onError: (error) => {
      toast.error("خطا در خروج از حساب کاربری");
      console.error("Logout error:", error);
    },
  });
  return { logout };
}
