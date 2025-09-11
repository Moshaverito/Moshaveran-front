/* --------------------------- logout Api Function -------------------------- */
export async function apiLogIn(formData) {
  try {
    const response = await fetch(
      "https://api.moshaveritoo.ir/api/accounts/login/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.phone,
          password: formData.password,
        }),
      }
    );
    console.log(response);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "خطا در ارسال کد");
    }
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export async function apiSendOTP(formData) {
  try {
    const response = await fetch(
      "https://api.moshaveritoo.ir/api/accounts/Mlogin/sendCode/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.phone,
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "خطا در ارسال کد");
    }

    return data;
  } catch (error) {
    console.error("Error during OTP send:", error);
    throw error;
  }
}
export async function apiVerifyOTP(formData) {
  try {
    const response = await fetch(
      "https://api.moshaveritoo.ir/api/accounts/Mlogin/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.phone,
          code: formData.otpCode,
          mode: "otp",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "خطا در ارسال کد");
    }
    return data;
  } catch (error) {
    console.error("Error during OTP send:", error);
    throw error;
  }
}

export async function apiSendNormalizedPhoneOTP(normalizedPhone) {
  try {
    const response = await fetch(
      "https://api.moshaveritoo.ir/api/accounts/register/sendCode/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: normalizedPhone,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "خطا در ارسال کد");
    }
    return data;
  } catch (error) {
    console.error("Error during OTP send:", error);
    throw error;
  }
}

export async function apiVerifyNormalizedPhoneOTP(data) {
  const { normalizedPhone, verificationCode } = data;

  try {
    const response = await fetch(
      "https://api.moshaveritoo.ir/api/accounts/register/verify/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: normalizedPhone,
          code: verificationCode,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "کد تایید نامعتبر است");
    }
    return data;
  } catch (error) {
    console.error("خطا در اتصال به سرور", error);
    throw error;
  }
}

export async function apiRegisterUser(data) {
  const { normalizedPhone, password } = data;
  try {
    const response = await fetch(
      "https://api.moshaveritoo.ir/api/accounts/register/register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: normalizedPhone,
          password: password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "خطا در ثبت‌نام");
    }
    return data;
  } catch (error) {
    console.error("خطا در اتصال به سرور", error);
    throw error;
  }
}
export async function apiLogOut() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    const res = await fetch(
      `https://api.moshaveritoo.ir/api/accounts/logout/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (err) {
    console.error("Failed to fetch notifications:", err);
  }
}

export async function apiValidateToken() {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      "https://api.moshaveritoo.ir/api/auth/Validate-Token/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.error("خطا در اتصال به سرور", error);
    throw error;
  }
}
