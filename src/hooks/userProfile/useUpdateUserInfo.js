import { useMutation } from "@tanstack/react-query";
import { apiUpdateUserInfo } from "../../services/apiUserInfo";
import toast from "react-hot-toast";

export function useUpdateUserInfo() {
  const { mutate: updateUserInfo, isPending: isUpdatingUserInfo } = useMutation(
    {
      mutationFn: (payload) => apiUpdateUserInfo(payload),
      onSuccess: () => {
        toast.success("پروفایل با موفقیت ذخیره شد");
      },
      onError: (error) => {
        toast.error(error.message || "خطا در ذخیره پروفایل");
        console.log(error.message);
      },
    }
  );

  return { updateUserInfo, isUpdatingUserInfo };
}
