import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { apiDeleteImage } from "../../services/apiUserInfo";

export function useDeleteImage() {
  const { mutate: deleteImage, isPending: isDeletingImage } = useMutation({
    mutationFn: (URL) => apiDeleteImage(URL),
    onSuccess: () => {
      toast.success("فایل تصویری با موفقیت حذف شد");
    },
    onError: (error) => {
      toast.error("خطا در حذف تصویر:", error);
      console.log(error.message);
    },
  });

  return { deleteImage, isDeletingImage };
}
