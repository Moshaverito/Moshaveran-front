import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { apiDeleteVideo } from "../../services/apiUserInfo";

export function useDeleteVideo() {
  const { mutate: deleteVideo, isPending: isDeletingVideo } = useMutation({
    mutationFn: (URL) => apiDeleteVideo(URL),
    onSuccess: () => {
      toast.success("فایل ویدیویی با موفقیت حذف شد");
    },
    onError: (error) => {
      toast.error("خطا در حذف ویدیو:", error);
      console.log(error.message);
    },
  });

  return { deleteVideo, isDeletingVideo };
}
