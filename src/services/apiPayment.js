export async function apiGetBillingInfo() {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await fetch(
      "https://api.moshaveritoo.ir/api/payment/Billing-Info/me/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "خطا در دریافت اطلاعات");
    }

    return data;
  } catch (error) {
    console.error("Error during fetching billing info:", error);
    throw error;
  }
}

export async function apiUpdateBillingInfo(billingData) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await fetch(
      "https://api.moshaveritoo.ir/api/payment/Billing-Info/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(billingData),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "خطا در دریافت اطلاعات");
    }

    return data;
  } catch (error) {
    console.error("Error during fetching billing info:", error);
    throw error;
  }
}
