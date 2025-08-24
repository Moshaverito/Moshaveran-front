export async function fetchCurrentSessions() {
  const TOKEN = localStorage.getItem("accessToken") || null;
  if (!TOKEN) {
    return new Error("توکن دسترسی یافت نشد");
  }

  try {
    const headers = { Authorization: `Bearer ${TOKEN}` };
    const response = await fetch(
      "https://api.moshaveritoo.ir/api/sessions/sessions/moshaver_sessions/",
      { headers }
    );

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        return new Error("توکن دسترسی منقضی شده است. لطفاً مجدداً وارد شوید");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching current sessions:", error);
    return new Error("خطا در دریافت جلسات فعلی - عدم اتصال به سرور");
  }
}

export const fetchSessionHistory = async () => {
  const TOKEN = localStorage.getItem("accessToken") || null;
  if (!TOKEN) {
    return new Error("توکن دسترسی یافت نشد");
  }

  try {
    const headers = { Authorization: `Bearer ${TOKEN}` };
    const response = await fetch(
      "https://api.moshaveritoo.ir/api/sessions/sessions/history_moshaver/",
      { headers }
    );

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        return new Error("توکن دسترسی منقضی شده است. لطفاً مجدداً وارد شوید");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching current sessions:", error);
    return new Error("خطا در دریافت جلسات فعلی - عدم اتصال به سرور");
  }
};

export const fetchMonthlyIncome = async () => {
  const TOKEN = localStorage.getItem("accessToken") || null;
  if (!TOKEN) {
    return new Error("توکن دسترسی یافت نشد");
  }

  try {
    const headers = { Authorization: `Bearer ${TOKEN}` };
    const response = await fetch(
      "https://api.moshaveritoo.ir/api/payment/income/monthly-income/",
      { headers }
    );

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        return new Error("توکن دسترسی منقضی شده است. لطفاً مجدداً وارد شوید");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
    // setMonthlyIncome(data.income ?? data.amount ?? 0);
  } catch (error) {
    console.error("Error fetching monthly income:", error);
    return new Error("خطا در دریافت جلسات فعلی - عدم اتصال به سرور");
  }
};

export const fetchPendingSessions = async () => {
  const TOKEN = localStorage.getItem("accessToken") || null;
  if (!TOKEN) {
    return new Error("توکن دسترسی یافت نشد");
  }

  try {
    const headers = { Authorization: `Bearer ${TOKEN}` };
    const response = await fetch(
      "https://api.moshaveritoo.ir/api/sessions/sessions/pending_sessions/",
      { headers }
    );

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        return new Error("توکن دسترسی منقضی شده است. لطفاً مجدداً وارد شوید");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching monthly income:", error);
    return new Error("خطا در دریافت جلسات فعلی - عدم اتصال به سرور");
  }
};

export async function updatePendingSessionsAPI(sessionId, action) {
  const TOKEN = localStorage.getItem("accessToken") || null;
  if (!TOKEN) {
    return new Error("توکن دسترسی یافت نشد");
  }

  try {
    const headers = {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "https://api.moshaveritoo.ir/api/sessions/sessions/update_session_status/",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          session_id: sessionId,
          action: action,
        }),
      }
    );
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        throw new Error("توکن دسترسی منقضی شده است. لطفاً مجدداً وارد شوید");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating pending sessions:", error.message);
    throw new Error("خطا در به‌روزرسانی جلسه");
  }
}

export const confirmCancelSession = async ({ sessionId }) => {
  const TOKEN = localStorage.getItem("accessToken") || null;

  try {
    const headers = {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "https://api.moshaveritoo.ir/api/sessions/sessions/cancel_by_moshaver/",
      {
        method: "POST",
        headers,
        body: JSON.stringify({ session_id: sessionId }),
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        throw new Error("توکن دسترسی منقضی شده است. لطفاً مجدداً وارد شوید");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error canceling session:", error);
    throw new Error("خطا در لغو جلسه");
  }
};

export const fetchAvailablePayment = async () => {
  const TOKEN = localStorage.getItem("accessToken") || null;
  if (!TOKEN) return;

  try {
    const headers = { Authorization: `Bearer ${TOKEN}` };
    const response = await fetch(
      "https://api.moshaveritoo.ir/api/payment/income/available-income/",
      { headers }
    );

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        throw new Error("توکن دسترسی منقضی شده است. لطفاً مجدداً وارد شوید");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.available_income ?? data.payment ?? 0;
  } catch (error) {
    console.error("Error fetching available payment:", error);
    throw new Error("خطا در دریافت موجودی قابل برداشت - عدم اتصال به سرور");
  }
};

export const requestPaymentAPI = async (amount) => {
  const TOKEN = localStorage.getItem("accessToken");
  if (!TOKEN) return;
  try {
    const headers = {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "https://api.moshaveritoo.ir/api/payment/income/request-payment/",
      {
        method: "POST",
        headers,
        body: JSON.stringify({ amount: amount }),
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        throw new Error("توکن دسترسی منقضی شده است. لطفاً مجدداً وارد شوید");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error requesting payment:", error);
    throw new Error("خطا در درخواست پرداخت");
  }
};
