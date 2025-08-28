import { useMutation } from "@tanstack/react-query";
import { apiUploadAudio } from "../../services/apiUserInfo";
import toast from "react-hot-toast";

export function useUploadAudio() {
  const { mutate: uploadAudio, isPending: isUploadingAudio } = useMutation({
    mutationFn: (formData) => apiUploadAudio(formData),
    onSuccess: () => {
      toast.success("فایل صوتی با موفقیت آپلود شد");
    },
    onError: (error) => {
      toast.error("خطا در آپلود صوت:", error);
      console.log(error.message);
    },
  });

  return { uploadAudio, isUploadingAudio };
}
