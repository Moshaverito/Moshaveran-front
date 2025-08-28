import { useMutation } from "@tanstack/react-query";
import { apiUploadImage } from "../../services/apiUserInfo";
import toast from "react-hot-toast";

export function useUploadImage() {
  const {
    mutate: uploadImage,
    isPending: isUploadingImage,
    data: uploadedImageUrl,
  } = useMutation({
    mutationFn: (formData) => apiUploadImage(formData),
    onSuccess: () => {
      toast.success("عکس با موفقیت بارگذاری شد");
    },
    onError: () => {
      toast.error("خطا در بارگذاری تصویر");
    },
  });
  return { uploadImage, isUploadingImage, uploadedImageUrl };
}
