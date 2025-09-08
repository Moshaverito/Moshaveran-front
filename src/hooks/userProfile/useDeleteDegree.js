import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { apiDeleteDegree } from "../../services/apiUserInfo";

export function useDeleteDegree() {
  const queryClient = useQueryClient();
  const { mutate: deleteDegree, isPending: isDeletingDegree } = useMutation({
    mutationFn: (degreeId) => apiDeleteDegree(degreeId),
    onSuccess: () => {
      toast.success("مدرک با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
    onError: (error) => {
      toast.error("خطا در حذف مدرک:", error);
      console.log(error.message);
    },
  });

  return { deleteDegree, isDeletingDegree };
}
