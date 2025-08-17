/* eslint react/prop-types: 0 */

/* --------- Showing this component when there are no notifications --------- */
function EmptyNotifications({ refetchNotifications }) {
  return (
    <div className="text-center py-16">
      <div className="text-6xl sm:text-7xl mb-4">🔔</div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
        اعلان جدیدی ندارید
      </h3>
      <p className="text-gray-600 text-sm sm:text-base mb-6">
        همه اعلان‌های شما خوانده شده‌اند
      </p>
      <button
        onClick={refetchNotifications}
        className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
      >
        بررسی مجدد
      </button>
    </div>
  );
}

export default EmptyNotifications;
