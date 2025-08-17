/* --------------------------- logout Api Function -------------------------- */
export async function apiLogOut() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

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
