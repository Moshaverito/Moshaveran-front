const API_URL = "https://api.moshaveritoo.ir/api/accounts/notify";

/* --------------------- get notifications from the API --------------------- */
export async function ApiGetNotifications() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    const res = await fetch(`${API_URL}/notifList`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (err) {
    console.error("Failed to fetch notifications:", err);
  }
}

/* ---------------------- mark the notification as read API --------------------- */
export async function apiMarkAsRead({ notifId }) {
  console.log(notifId);
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    const res = await fetch(`${API_URL}/seenMsg/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notif_id: notifId }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (err) {
    console.error("Failed to mark as read:", err);
  }
}
