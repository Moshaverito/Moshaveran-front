import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePendingSessionsAPI } from "../../services/apiSessions";

export function useUpdatePendingSessions() {
  const queryClient = useQueryClient();
  const { mutate: updatePendingSessions, isPending: pendingSessionsUpdating } =
    useMutation({
      mutationFn: ({ sessionId, action }) => {
        return updatePendingSessionsAPI(sessionId, action);
      },
      onSuccess: () => {
        toast.success("عملیات با موفقیت انجام شد");
        queryClient.invalidateQueries({ queryKey: ["pendingSessions"] });
      },
      onError: (error) => {
        console.log("Error updating pending session:", error);
        toast.error(error.message);
      },
    });

  return { updatePendingSessions, pendingSessionsUpdating };
}
