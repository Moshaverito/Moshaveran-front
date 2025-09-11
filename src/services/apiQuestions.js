export const apiGetQuestions = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    if (!token) return;
    const response = await fetch(
      "https://api.moshaveritoo.ir/api/questionnaire/QuestionMaking/therapist_questions/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      return new Error("خطا در بارگذاری سوال ها");
    }

    const data = response.json();

    return data;
  } catch (error) {
    console.error("Error during loading questions:", error);
    throw error;
  }
};

export const apiAnswerQuestions = async (submissionData) => {
  const token = localStorage.getItem("accessToken");
  try {
    if (!token) {
      throw new Error("لطفا اول وارد اکانت خود بشوید");
    }

    const response = await fetch(
      "https://api.moshaveritoo.ir/api/questionnaire/QuestionMaking/submit_therapist_answers/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submissionData),
      }
    );

    const data = response.json();
    if (!response.ok) {
      throw new Error(data.message || "خطا در ارسال پرسشنامه");
    }

    return data;
  } catch (error) {
    console.error("Error during answering questions:", error);
    throw error;
  }
};
