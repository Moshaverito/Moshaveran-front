import { useMutation } from "@tanstack/react-query";
import { apiAnswerQuestions } from "../../services/apiQuestions";
import toast from "react-hot-toast";

export function useAnswerQuestions() {
  const { mutate: answerQuestions, isPending: isAnswering } = useMutation({
    mutationFn: (submissionData) => apiAnswerQuestions(submissionData),
    onSuccess: () => toast.success("پرسشنامه با موفقیت ارسال شد"),
    onError: (error) => toast.error(error.massage),
  });

  return { answerQuestions, isAnswering };
}
