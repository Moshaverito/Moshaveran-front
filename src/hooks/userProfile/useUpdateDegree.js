import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUpdateDegree } from "../../services/apiUserInfo";

export const useUpdateDegree = () => {
  const queryClient = useQueryClient();
  const { mutate: updateDegree, isPending: isUpdatingDegree } = useMutation({
    mutationFn: (newDegree) => apiUpdateDegree(newDegree),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
    onError: (error) => {
      console.error("Error updating degree:", error);
    },
  });

  return { updateDegree, isUpdatingDegree };
};
