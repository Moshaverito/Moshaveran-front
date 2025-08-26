export async function fetchReservationData() {
  const token = localStorage.getItem("accessToken");
  try {
    if (!token) return;
    // Load existing available slots
    const slotsResponse = await fetch(
      "https://api.moshaveritoo.ir/api/sessions/availabilities/my_slots/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!slotsResponse.ok) {
      throw new Error("خطا در بارگذاری اطلاعات: " + slotsResponse.message);
    }

    const data = await slotsResponse.json();

    return data;
  } catch (err) {
    console.error("خطا در بارگذاری اطلاعات: " + err.message);
    throw err;
  }
}

export async function fetchReservedSlots() {
  const token = localStorage.getItem("accessToken");
  if (!token) return;
  try {
    // Load reserved slots
    const reservedResponse = await fetch(
      "https://api.moshaveritoo.ir/api/sessions/availabilities/reserved/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(reservedResponse);
    if (!reservedResponse.ok) {
      throw new Error("خطا در بارگذاری اطلاعات: " + reservedResponse.message);
    }

    const data = await reservedResponse.json();

    return data;
  } catch (err) {
    console.error("خطا در بارگذاری اطلاعات: " + err.message);
  }
}
