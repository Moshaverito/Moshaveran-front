import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiGetQuestions } from "../../services/apiQuestions";

export function useGetQuestions() {
  const { isLoading: isLoadingQuestions, data: getQuestion } = useQuery({
    queryKey: ["questions"],
    queryFn: apiGetQuestions,
    onError: () => {
      toast.error("خطا در بارگذاری سوال ها. لطفاً دوباره تلاش کنید.");
    },
  });

  const data = getQuestion;
  const questions = data?.questions;

  return {
    isLoadingQuestions,
    questions,
  };
}
