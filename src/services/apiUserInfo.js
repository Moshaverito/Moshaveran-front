export const fetchUserInfo = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    if (!token) {
      throw new Error("لطفاً ابتدا وارد شوید");
    }
    const response = await fetch(
      "https://api.moshaveritoo.ir/api/accounts/moshavers/user_info/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("خطا در دریافت اطلاعات کاربر");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiUploadImage = async (formData) => {
  const token = localStorage.getItem("accessToken");
  try {
    if (!token) {
      throw new Error("لطفاً ابتدا وارد شوید");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(
      "https://api.moshaveritoo.ir/api/accounts/Image/",
      {
        method: "POST",
        body: formData,
        headers,
      }
    );

    if (!response.ok) {
      throw new Error("خطا در آپلود تصویر");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("خطا در آپلود تصویر:", error);
  }
};

export const apiUploadVideo = async (formData) => {
  const token = localStorage.getItem("accessToken");
  try {
    if (!token) {
      throw new Error("لطفاً ابتدا وارد شوید");
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(
      "https://api.moshaveritoo.ir/api/accounts/videos/",
      {
        method: "POST",
        body: formData,
        headers,
      }
    );

    if (!response.ok) {
      throw new Error("خطا در آپلود ویدیو");
    }

    console.log(response);

    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.error("خطا در آپلود ویدیو:", error);
    return error;
  }
};

export const apiUploadAudio = async (formData) => {
  const token = localStorage.getItem("accessToken");
  try {
    if (!token) {
      throw new Error("لطفاً ابتدا وارد شوید");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(
      "https://api.moshaveritoo.ir/api/accounts/Audio/",
      {
        method: "POST",
        body: formData,
        headers,
      }
    );

    if (!response.ok) {
      throw new Error("خطا در آپلود صوت");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("خطا در آپلود صوت");
    throw error;
  }
};

export const apiUpdateUserInfo = async (payload) => {
  const token = localStorage.getItem("accessToken");

  try {
    if (!token) {
      throw new Error("لطفاً ابتدا وارد شوید");
    }
    const response = await fetch(
      "https://api.moshaveritoo.ir/api/accounts/moshavers/update-profile/",
      {
        method: "UPDATE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error("خطا در به‌روزرسانی اطلاعات کاربر");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
