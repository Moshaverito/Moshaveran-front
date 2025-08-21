import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePendingSessionsAPI } from "../services/apiSessions";

export function useUpdatePendingSessions() {
  const { mutate: updatePendingSessions, isLoading: pendingSessionsUpdating } =
    useMutation({
      mutationFn: ({ sessionId, action }) => {
        console.log(`Updating session ${sessionId} with action: ${action}`);
        return updatePendingSessionsAPI(sessionId, action);
      },
      onSuccess: () => {
        console.log("Pending session updated successfully");
        toast.success("عملیات با موفقیت انجام شد");
      },
      onError: (error) => {
        console.log("Error updating pending session:", error);
        toast.error(error.message);
      },
    });

  return { updatePendingSessions, pendingSessionsUpdating };
}
