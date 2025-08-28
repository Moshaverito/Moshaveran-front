import { useMutation } from "@tanstack/react-query";
import { apiUploadVideo } from "../../services/apiUserInfo";
import toast from "react-hot-toast";

export function useUploadVideo() {
  const { mutate: uploadVideo, isPending: isUploadingVideo } = useMutation({
    mutationFn: (formData) => apiUploadVideo(formData),
    onSuccess: () => {
      toast.success("ویدیو با موفقیت آپلود شد");
    },
    onError: () => {
      toast.error("خطا در آپلود ویدیو");
    },
  });

  return { uploadVideo, isUploadingVideo };
}
