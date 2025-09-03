import { useMutation } from "@tanstack/react-query";
import { apiUpdateDegree } from "../../services/apiUserInfo";

export const useUpdateDegree = () => {
  const { mutate: updateDegree, isPending: isUpdatingDegree } = useMutation({
    mutationFn: (newDegree) => apiUpdateDegree(newDegree),
    onError: (error) => {
      console.error("Error updating degree:", error);
    },
  });

  return { updateDegree, isUpdatingDegree };
};
