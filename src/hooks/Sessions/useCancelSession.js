import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePendingSessionsAPI } from "../../services/apiSessions";

export function useCancelSession() {
  const queryClient = useQueryClient();
  const { mutate: cancelSession, isLoading: cancelSessionLoading } =
    useMutation({
      mutationFn: ({ sessionId }) => {
        return updatePendingSessionsAPI({ sessionId });
      },
      onSuccess: () => {
        toast.success("عملیات با موفقیت انجام شد");
        queryClient.invalidateQueries({ queryKey: ["currentSessions"] });
      },
      onError: (error) => {
        console.log("Error updating pending session:", error);
        toast.error(error.message);
      },
    });

  return { cancelSession, cancelSessionLoading };
}
