import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiMarkAsRead } from "../services/apiNotifications";
import toast from "react-hot-toast";

/* ------------- using React Query to handle the Marking as read process. ------------ */
export function useMarkAsRead() {
  const queryClient = useQueryClient();

  const { mutate: markAsRead, isPending } = useMutation({
    mutationFn: ({ notifId }) => apiMarkAsRead({ notifId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error("خطا در علامت‌گذاری به عنوان خوانده شده ");
    },
  });

  return {
    markAsRead,
    isLoading: isPending,
  };
}
