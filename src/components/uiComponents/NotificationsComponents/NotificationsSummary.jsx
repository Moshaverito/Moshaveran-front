/* eslint react/prop-types: 0 */

// this component displays a summary of unread notifications at the top of the notifications page
function NotificationsSummary({ unreadCount }) {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg mb-4 sm:mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
            اعلان‌های خوانده‌نشده
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            {unreadCount} اعلان جدید دارید
          </p>
        </div>
        <div className="text-2xl sm:text-3xl">
          {unreadCount === 0 ? "✅" : "📢"}
        </div>
      </div>
    </div>
  );
}

export default NotificationsSummary;
