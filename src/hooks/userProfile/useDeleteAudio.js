import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { apiDeleteAudio } from "../../services/apiUserInfo";

export function useDeleteAudio() {
  const { mutate: deleteAudio, isPending: isDeletingAudio } = useMutation({
    mutationFn: (audioId) => apiDeleteAudio(audioId),
    onSuccess: () => {
      toast.success("فایل صوتی با موفقیت آپلود شد");
    },
    onError: (error) => {
      toast.error("خطا در آپلود صوت:", error);
      console.log(error.message);
    },
  });

  return { deleteAudio, isDeletingAudio };
}
