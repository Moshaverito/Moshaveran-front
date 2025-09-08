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

    const data = await response.json();

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
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("خطا در به‌روزرسانی اطلاعات کاربر");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiUpdateDegree = async (newDegree) => {
  const token = localStorage.getItem("accessToken");

  try {
    if (!token) {
      throw new Error("لطفاً ابتدا وارد شوید");
    }
    const response = await fetch(
      `https://api.moshaveritoo.ir/api/accounts/degrees/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newDegree),
      }
    );

    if (!response.ok) {
      throw new Error("خطا در به‌روزرسانی مدرک");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiDeleteDegree = async (degreeId) => {
  const token = localStorage.getItem("accessToken");
  try {
    if (!token) {
      throw new Error("لطفاً ابتدا وارد شوید");
    }
    console.log(degreeId);
    const response = await fetch(
      `https://api.moshaveritoo.ir/api/accounts/degrees/${degreeId}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("خطا در حذف مدرک");
    }
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiDeleteAudio = async (audioId) => {
  const token = localStorage.getItem("accessToken");

  try {
    if (!token) {
      throw new Error("لطفاً ابتدا وارد شوید");
    }
    const response = await fetch(
      `https://api.moshaveritoo.ir/api/media/audios/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(audioId),
      }
    );

    if (!response.ok) {
      throw new Error("خطا در به‌روزرسانی مدرک");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
